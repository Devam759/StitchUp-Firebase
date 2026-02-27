import React, { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import PrimaryButton from '../components/ui/PrimaryButton'

const Chip = ({ label, selected, onClick }) => (
  <button type="button" onClick={onClick} className={["px-3 py-1.5 rounded-full border text-sm transition-all",
    selected ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 shadow-sm' : 'border-neutral-200 hover:border-[color:var(--color-primary)]'].join(' ')}>
    {label}
  </button>
)

const Booking = () => {
  const [form, setForm] = useState({ address: '', cloth: 'Shirt', service: 'Stitch', notes: '' })
  const [slots, setSlots] = useState(['10:00-11:00', '11:00-12:00', '14:00-15:00', '17:00-18:00'])
  const [slot, setSlot] = useState('')
  const [errors, setErrors] = useState({})

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const estimate = useMemo(() => {
    const base = form.service === 'Stitch' ? 299 : 149
    const clothAdj = form.cloth === 'Dress' ? 200 : form.cloth === 'Blouse' ? 150 : 0
    return base + clothAdj
  }, [form.service, form.cloth])

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.address) next.address = 'Pickup address is required'
    if (!slot) next.slot = 'Select a time slot'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // placeholder submit
      alert('Continue to payment (placeholder)')
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
        <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_380px] gap-4">
          <div className="grid gap-4">
            <Card className="p-5">
              <div className="text-lg font-semibold mb-3">Booking Details</div>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Pickup Address</div>
                  <div className={["flex items-center gap-2 rounded-xl border px-3 py-2 bg-white transition-all focus-within:shadow-soft",
                    errors.address ? 'border-red-400' : 'border-neutral-200'].join(' ')}>
                    <input name="address" value={form.address} onChange={onChange} placeholder="Search or enter address (autocomplete placeholder)" className="flex-1 outline-none bg-transparent" />
                  </div>
                  {errors.address ? <div className="text-red-600 text-xs mt-1">{errors.address}</div> : null}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Cloth Type</label>
                    <div className="mt-1">
                      <select name="cloth" value={form.cloth} onChange={onChange} className="w-full rounded-xl border border-neutral-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]">
                        {['Shirt','Pant','Dress','Blouse','Kurta'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Service Type</label>
                    <div className="mt-1 flex items-center gap-2">
                      {['Stitch','Alter'].map(s => (
                        <Chip key={s} label={s} selected={form.service===s} onClick={()=> setForm(f => ({...f, service: s}))} />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Time Slot</label>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {slots.map(s => (
                      <Chip key={s} label={s} selected={slot===s} onClick={()=> setSlot(s)} />
                    ))}
                  </div>
                  {errors.slot ? <div className="text-red-600 text-xs mt-1">{errors.slot}</div> : null}
                </div>

                <div>
                  <Input label="Extra Notes" name="notes" value={form.notes} onChange={onChange} placeholder="Any specific instructions" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4">
            <Card className="p-5 sticky top-4">
              <div className="text-lg font-semibold">Price Estimate</div>
              <div className="mt-2 text-sm text-neutral-600">Based on your selections</div>
              <div className="mt-3 flex items-center justify-between">
                <div>Subtotal</div>
                <div>₹{estimate}</div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div>Pickup</div>
                <div>₹49</div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div>Tax</div>
                <div>₹{Math.round(estimate*0.18)}</div>
              </div>
              <div className="mt-3 border-t border-neutral-200 pt-3 flex items-center justify-between font-semibold">
                <div>Total</div>
                <div>₹{estimate + 49 + Math.round(estimate*0.18)}</div>
              </div>
              <PrimaryButton type="submit" className="w-full mt-4">Continue</PrimaryButton>
            </Card>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Booking


