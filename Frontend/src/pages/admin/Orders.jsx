import React, { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Card from '../../components/ui/Card'

const initial = [
  { id: 'ST-2049', user: 'Aarav', tailor: 'StitchUp', total: 225, status: 'Accepted' },
  { id: 'ST-2050', user: 'Riya', tailor: 'Needle & Thread', total: 699, status: 'Ready' },
]

const Orders = () => {
  const [rows, setRows] = useState(initial)
  const setStatus = (id, status) => setRows(rs => rs.map(r => r.id===id ? { ...r, status } : r))

  return (
    <AdminLayout>
      <Card className="p-5">
        <div className="text-lg font-semibold mb-3">Orders</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-600">
                <th className="py-2">Order ID</th>
                <th className="py-2">User</th>
                <th className="py-2">Tailor</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td className="py-2">{r.user}</td>
                  <td className="py-2">{r.tailor}</td>
                  <td className="py-2">₹{r.total}</td>
                  <td className="py-2">
                    <span className={["px-2 py-0.5 rounded-full border",
                      r.status==='Delivered' ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-neutral-300'].join(' ')}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <button className="btn-outline" onClick={()=>setStatus(r.id, 'Out for Delivery')}>Out for Delivery</button>
                      <button className="btn-primary" onClick={()=>setStatus(r.id, 'Delivered')}>Mark Delivered</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  )
}

export default Orders


