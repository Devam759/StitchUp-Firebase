import React, { useState } from 'react'
import TailorLayout from '../../layouts/TailorLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PrimaryButton from '../../components/ui/PrimaryButton'

const Profile = () => {
  const [skills, setSkills] = useState({ Stitching: true, Alteration: true, Urgent: false })
  const [pricing, setPricing] = useState({ Shirt: 299, Pant: 249, Blouse: 499 })
  const [hours, setHours] = useState({ open: '10:00', close: '19:00' })

  return (
    <TailorLayout>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="text-lg font-semibold mb-3">Skills</div>
          <div className="flex flex-wrap items-center gap-2">
            {Object.keys(skills).map(k => (
              <button key={k} onClick={()=> setSkills(s => ({...s, [k]: !s[k]}))} className={["px-3 py-1.5 rounded-full border text-sm",
                skills[k] ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10' : 'border-neutral-200'].join(' ')}>{k}</button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-lg font-semibold mb-3">Working Hours</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Open</label>
              <input type="time" value={hours.open} onChange={(e)=> setHours(h=>({...h, open: e.target.value}))} className="w-full mt-1 rounded-xl border border-neutral-200 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Close</label>
              <input type="time" value={hours.close} onChange={(e)=> setHours(h=>({...h, close: e.target.value}))} className="w-full mt-1 rounded-xl border border-neutral-200 px-3 py-2" />
            </div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="text-lg font-semibold mb-3">Pricing</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {Object.keys(pricing).map(k => (
              <div key={k} className="grid gap-1">
                <label className="text-sm font-medium">{k}</label>
                <input type="number" value={pricing[k]} onChange={(e)=> setPricing(p => ({...p, [k]: Number(e.target.value)}))} className="rounded-xl border border-neutral-200 px-3 py-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="text-lg font-semibold mb-3">KYC</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Aadhaar Number" placeholder="xxxx-xxxx-xxxx" />
            <Input label="PAN Number" placeholder="ABCDE1234F" />
            <div className="grid gap-1">
              <label className="text-sm font-medium">Upload Documents (placeholder)</label>
              <div className="h-28 rounded-xl border border-dashed grid place-items-center text-neutral-500">Drop files</div>
            </div>
          </div>
          <PrimaryButton className="mt-4">Save Profile</PrimaryButton>
        </Card>
      </div>
    </TailorLayout>
  )
}

export default Profile


