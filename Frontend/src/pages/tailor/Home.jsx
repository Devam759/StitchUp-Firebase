import React from 'react'
import TailorLayout from '../../layouts/TailorLayout'
import Card from '../../components/ui/Card'

const Stat = ({ label, value, sub }) => (
  <Card className="p-5">
    <div className="text-sm text-neutral-600">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
    {sub ? <div className="text-xs text-neutral-500 mt-1">{sub}</div> : null}
  </Card>
)

const Home = () => {
  return (
    <TailorLayout>
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Orders today" value="12" sub="+3 vs yesterday" />
        <Stat label="Earnings" value="₹3,240" sub="Today" />
        <Stat label="Rating" value="4.7" sub="128 reviews" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <Card className="p-5">
          <div className="text-lg font-semibold mb-3">Recent orders</div>
          <div className="text-neutral-600 text-sm">No new orders</div>
        </Card>
      </div>
    </TailorLayout>
  )
}

export default Home


