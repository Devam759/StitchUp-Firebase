import React, { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Card from '../../components/ui/Card'

const initial = [
  { id: 'T-1001', name: 'StitchUp Tailors', docs: 'KYC Pending', status: 'pending' },
  { id: 'T-1002', name: 'Needle & Thread', docs: 'Verified', status: 'pending' },
]

const Tailors = () => {
  const [rows, setRows] = useState(initial)
  const approve = (id) => setRows(rs => rs.map(r => r.id===id ? { ...r, status: 'approved' } : r))
  const reject = (id) => setRows(rs => rs.filter(r => r.id!==id))

  return (
    <AdminLayout>
      <Card className="p-5">
        <div className="text-lg font-semibold mb-3">Tailor Approvals</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-600">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Docs</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td className="py-2">{r.name}</td>
                  <td className="py-2">{r.docs}</td>
                  <td className="py-2">
                    <span className={["px-2 py-0.5 rounded-full border", r.status==='approved' ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-amber-300 text-amber-700 bg-amber-50'].join(' ')}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <button className="btn-primary" onClick={()=>approve(r.id)}>Approve</button>
                      <button className="btn-outline" onClick={()=>reject(r.id)}>Reject</button>
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

export default Tailors


