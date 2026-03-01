import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const CustomerOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const userId = u.id || u.phone
      if (!userId) {
        setLoading(false)
        return
      }

      const q = query(collection(db, 'orders'), where('customerId', '==', userId))
      const unsub = onSnapshot(q, (snapshot) => {
        let list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // sort by most recent 
        list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setOrders(list)
        setLoading(false)
      })

      return () => unsub()
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-6">My Orders</h1>
            {loading ? (
              <div className="text-neutral-600 animate-pulse">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-neutral-600">No orders yet</div>
            ) : (
              <div className="grid gap-4">
                {orders.map((o) => (
                  <div key={o.id} className="card p-5 border border-neutral-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-lg">Order #{o.id.substring(o.id.indexOf('_') + 1, o.id.indexOf('_') + 9) || o.id.substring(0, 8).toUpperCase()}</div>
                        <div className="text-sm text-neutral-600">Tailor: <span className="font-semibold text-blue-600 border-b border-blue-200 border-dashed">{o.tailorName || o.tailorId}</span></div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${o.status === 'Ready' || o.status === 'ready' ? 'bg-green-100 text-green-800' :
                        o.status === 'Satisfied' || o.status === 'satisfied' ? 'bg-blue-100 text-blue-800' :
                          o.status === 'Not Satisfied' || o.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                        }`}>
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="col-span-2">
                        <div className="text-neutral-500">Service</div>
                        <div className="font-medium text-neutral-900">{o.service}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Price</div>
                        <div className="font-medium text-green-600 font-bold">₹{o.price || 'Pending'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Date</div>
                        <div className="font-medium">{new Date(o.createdAt).toLocaleDateString()}</div>
                      </div>
                      {o.cloth && (
                        <div>
                          <div className="text-neutral-500">Cloth Info</div>
                          <div className="font-medium">{o.cloth}</div>
                        </div>
                      )}
                      {o.slot && (
                        <div>
                          <div className="text-neutral-500">Pickup Slot</div>
                          <div className="font-medium">{o.slot}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4">
                      {['Ready', 'ready', 'Satisfied', 'satisfied', 'Not Satisfied', 'rejected'].includes(o.status) ? (
                        <Link to={`/customer/track/${o.id}`} className="btn-primary text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Track Status
                        </Link>
                      ) : (
                        <div className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block mr-2 animate-pulse" />
                          Processing by Tailor...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CustomerOrders
