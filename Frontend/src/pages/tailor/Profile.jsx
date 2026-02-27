import React, { useState, useEffect } from 'react'
import TailorLayout from '../../layouts/TailorLayout'
import Card from '../../components/ui/Card'
import PrimaryButton from '../../components/ui/PrimaryButton'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import Toast from '../../components/Toast'
import { FiPlus, FiTrash2, FiChevronDown, FiScissors } from 'react-icons/fi'

const SERVICE_TEMPLATES = {
  'Shirt': ['Full Stitching', 'Collar Adjustment', 'Sleeve Shortening', 'Slimming / Fitting', 'Button Replacement'],
  'Pant / Trousers': ['Full Stitching', 'Hemming', 'Waist Expansion / Reduction', 'Zip Replacement', 'Tapering'],
  'Blouse': ['Simple Stitching', 'Designer Stitching', 'Adding Padding', 'Hook & Eye Fix', 'Neckline Alteration'],
  'Kurta': ['Full Stitching', 'Side Slit Repair', 'Length Shortening', 'Neck Design'],
  'Suit / Blazer': ['Full Stitching', 'Lining Replacement', 'Shoulder Adjustment', 'Sleeve Length Fix'],
  'Saree': ['Fall & Pico', 'Blouse Piece Cutting', 'Custom Draping Stitches']
}

const Profile = () => {
  const { user } = useAuth()
  const [skills, setSkills] = useState({ Stitching: true, Alteration: true, Urgent: false })
  const [pricing, setPricing] = useState({})
  const [hours, setHours] = useState({ open: '10:00', close: '19:00' })
  const [kyc, setKyc] = useState({ aadhaar: '', pan: '' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(false)
  const [bannerUrl, setBannerUrl] = useState('')
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const fileInputRef = useRef(null)

  const [selectedCategory, setSelectedCategory] = useState('Shirt')

  useEffect(() => {
    if (!user?.uid) return
    const loadProfile = async () => {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        const d = snap.data()
        if (d.skills) setSkills(d.skills)
        if (d.pricing) setPricing(d.pricing)
        if (d.hours) setHours(d.hours)
        if (d.kyc) setKyc(d.kyc)
        if (d.bannerUrl) setBannerUrl(d.bannerUrl)
      }
    }
    loadProfile()
  }, [user])

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !user?.uid) return

    setUploadingBanner(true)
    try {
      const storageRef = ref(storage, `banners/${user.uid}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setBannerUrl(url)
      // Instant update in DB
      await updateDoc(doc(db, 'users', user.uid), { bannerUrl: url })
      setToast({ type: 'success', message: 'Banner updated!' })
      setTimeout(() => setToast(false), 3000)
    } catch (err) {
      console.error('Error uploading banner:', err)
      alert('Failed to upload banner')
    }
    setUploadingBanner(false)
  }

  const handleSave = async () => {
    if (!user?.uid) return
    setSaving(true)

    const numericPrices = Object.values(pricing).map(p => Number(p)).filter(p => p > 0)
    const minPrice = numericPrices.length > 0 ? Math.min(...numericPrices) : 0

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        skills,
        pricing,
        priceFrom: minPrice,
        hours,
        kyc,
        updatedAt: new Date().toISOString()
      })
      setToast(true)
      setTimeout(() => setToast(false), 3000)
    } catch (e) {
      console.error('Error saving profile:', e)
      alert('Failed to save profile')
    }
    setSaving(false)
  }

  const updatePrice = (item, value) => {
    if (value === '' || value === null) {
      const next = { ...pricing }
      delete next[item]
      setPricing(next)
    } else {
      setPricing(prev => ({ ...prev, [item]: Number(value) }))
    }
  }

  return (
    <TailorLayout>
      <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
        {/* Left column - Settings */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Profile Banner</div>
            <div className="space-y-4">
              <div className="relative h-32 rounded-2xl bg-neutral-100 border border-dashed border-neutral-300 overflow-hidden flex flex-col items-center justify-center text-neutral-400">
                {bannerUrl ? (
                  <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold uppercase">No Banner Image</span>
                )}
                {uploadingBanner && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[#305cde] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleBannerUpload}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingBanner}
                className="w-full py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 disabled:opacity-50"
              >
                {uploadingBanner ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Skills</div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(skills).map(k => (
                <button
                  key={k}
                  onClick={() => setSkills(s => ({ ...s, [k]: !s[k] }))}
                  className={["px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
                    skills[k] ? 'border-[#305cde] text-[#305cde] bg-[#305cde]/10' : 'border-neutral-200 text-neutral-400'].join(' ')}
                >
                  {k}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5 bg-[#305cde] text-white">
            <div className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">Ready to update?</div>
            <p className="text-xs opacity-90 mb-4">Your changes will be visible to all customers immediately.</p>
            <PrimaryButton onClick={handleSave} disabled={saving} className="w-full bg-white text-[#305cde] hover:bg-blue-50">
              {saving ? 'Updating...' : 'Save Profile'}
            </PrimaryButton>
          </Card>
        </div>

        {/* Right column - Pricing Matrix */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-neutral-900">Service Rate Card</h2>
                <p className="text-sm text-neutral-500">Pick a category and set your own prices for each task.</p>
              </div>

              <div className="relative min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 pr-10 font-bold text-[#305cde] outline-none focus:ring-2 focus:ring-[#305cde]/20"
                >
                  {Object.keys(SERVICE_TEMPLATES).map(cat => (
                    <option key={cat} value={cat}>{cat} Services</option>
                  ))}
                  <option value="Other">Other / Miscellaneous</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#305cde]" />
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
                <div className="flex items-center gap-2 mb-6 text-[#305cde]">
                  <FiScissors className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-sm">{selectedCategory} Tasks</span>
                </div>

                <div className="grid gap-4">
                  {(SERVICE_TEMPLATES[selectedCategory] || []).map(taskName => {
                    const fullKey = `${selectedCategory} - ${taskName}`
                    return (
                      <div key={taskName} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="mb-2 sm:mb-0">
                          <div className="text-sm font-bold text-neutral-800">{taskName}</div>
                          <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">Standard Service</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-400 font-bold text-sm">₹</span>
                          <input
                            type="number"
                            placeholder="Price"
                            value={pricing[fullKey] || ''}
                            onChange={(e) => updatePrice(fullKey, e.target.value)}
                            className="w-24 bg-neutral-50 border border-neutral-100 rounded-xl px-3 py-2 text-sm font-black text-[#305cde] outline-none focus:border-[#305cde] transition-colors"
                          />
                          {pricing[fullKey] && (
                            <button onClick={() => updatePrice(fullKey, null)} className="p-2 text-neutral-300 hover:text-red-500 transition-colors">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {selectedCategory === 'Other' && (
                    <div className="p-8 text-center bg-white border border-dashed border-neutral-200 rounded-2xl">
                      <p className="text-sm text-neutral-400 italic">Custom services can be negotiated directly with customers in chat.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs text-amber-700 font-medium">Items with no price entered will not be shown to customers.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Identity & KYC</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase">Aadhaar (Privacy Protected)</label>
                <input value={kyc.aadhaar} onChange={(e) => setKyc(k => ({ ...k, aadhaar: e.target.value }))} placeholder="xxxx-xxxx-xxxx" className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 outline-none focus:border-[#305cde]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase">PAN Card Number</label>
                <input value={kyc.pan} onChange={(e) => setKyc(k => ({ ...k, pan: e.target.value }))} placeholder="ABCDE1234F" className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 outline-none focus:border-[#305cde]" />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Toast open={toast} type="success" message="Rate Card updated!" />
    </TailorLayout>
  )
}

export default Profile
