import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Card from '../../components/ui/Card'

const rows = [
  { id: 'U-001', name: 'Aarav', phone: '98765 43210', orders: 5 },
  { id: 'U-002', name: 'Riya', phone: '98765 12345', orders: 12 },
]

const Users = () => {
  return (
    <AdminLayout>
      <Card className="p-5">
        <div className="text-lg font-semibold mb-3">Users</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-600">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Orders</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.id}</td>
                  <td className="py-2">{r.name}</td>
                  <td className="py-2">{r.phone}</td>
                  <td className="py-2">{r.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  )
}

export default Users


