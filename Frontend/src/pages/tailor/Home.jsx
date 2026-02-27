import React, { useState, useEffect } from 'react'
import TailorLayout from '../../layouts/TailorLayout'
import Card from '../../components/ui/Card'
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

const Stat = ({ label, value, sub }) => (
  <Card className="p-5">
    <div className="text-sm text-neutral-600">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
    {sub ? <div className="text-xs text-neutral-500 mt-1">{sub}</div> : null}
  </Card>
)

const Home = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ ordersToday: 0, earningsToday: 0, rating: 0, reviews: 0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    if (!user?.id) return

    const today = new Date().toISOString().split('T')[0]
    const q = query(collection(db, 'orders'), where('tailorId', '==', user.id))

    const unsub = onSnapshot(q, (snapshot) => {
      let ordersToday = 0
      let earningsToday = 0
      const allOrders = []

      snapshot.docs.forEach(d => {
        const o = d.data()
        allOrders.push({ id: d.id, ...o })

        if (o.createdAt && o.createdAt.startsWith(today)) {
          ordersToday++
          if (o.status !== 'Rejected' && o.status !== 'Request') {
            earningsToday += Number(o.priceFrom) || Number(o.price) || 0
          }
        }
      })

      setRecentOrders(allOrders.sort((a, b) => b.createdAt?.localeCompare(a.createdAt)).slice(0, 5))

      // Fetch rating from user profile
      const userRef = doc(db, 'users', user.id)
      getDoc(userRef).then(snap => {
        if (snap.exists()) {
          const ud = snap.data()
          setStats(prev => ({
            ...prev,
            ordersToday,
            earningsToday,
            rating: ud.rating || 4.5,
            reviews: ud.reviewsCount || 0
          }))
        }
      })
    })

    return () => unsub()
  }, [user])

  return (
    <TailorLayout>
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Orders today" value={stats.ordersToday} sub="Assigned items" />
        <Stat label="Earnings Today" value={`₹${stats.earningsToday}`} sub="Based on active work" />
        <Stat label="Rating" value={stats.rating} sub={`${stats.reviews} reviews`} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <Card className="p-5">
          <div className="text-lg font-semibold mb-3">Recent orders</div>
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map(o => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-neutral-100">
                  <div>
                    <div className="font-medium">{o.service || 'Tailoring'} - {o.cloth || 'Garment'}</div>
                    <div className="text-xs text-neutral-500">{o.id} • {o.status}</div>
                  </div>
                  <div className="text-sm font-semibold">₹{o.priceFrom || o.price || '--'}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-neutral-600 text-sm">No recent orders</div>
          )}
        </Card>
      </div>
    </TailorLayout>
  )
}

export default Home


