import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import Card from '../../components/ui/Card'

const Metric = ({ label, value }) => (
  <Card className="p-5">
    <div className="text-sm text-neutral-600">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </Card>
)

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="grid sm:grid-cols-4 gap-4">
        <Metric label="Total Tailors" value="128" />
        <Metric label="Users" value="4,210" />
        <Metric label="Orders Today" value="246" />
        <Metric label="Commission Today" value="₹12,480" />
      </div>
      <Card className="p-5 mt-4">
        <div className="text-lg font-semibold">Commission Overview</div>
        <div className="text-neutral-600 text-sm mt-2">Simple overview card. Integrate charts later.</div>
      </Card>
    </AdminLayout>
  )
}

export default Dashboard


