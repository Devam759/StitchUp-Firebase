import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import { FiMapPin, FiStar, FiClock, FiMessageCircle, FiChevronRight } from 'react-icons/fi'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ServiceRow = ({ name, price }) => {
  // Split the category and task name if they exist in the key "Category - Task"
  const displayParts = name.split(' - ')
  const category = displayParts.length > 1 ? displayParts[0] : ''
  const task = displayParts.length > 1 ? displayParts[1] : name

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0 border-neutral-100 group transition-all">
      <div>
        {category && <div className="text-[10px] font-black uppercase tracking-widest text-[#305cde] mb-0.5">{category}</div>}
        <div className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
          {task}
        </div>
      </div>
      <div className="font-black text-neutral-900 bg-neutral-50 px-3 py-1 rounded-lg border border-neutral-100">₹{price}</div>
    </div>
  )
}

const TailorProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tailor, setTailor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTailor = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', id))
        if (snap.exists()) {
          const d = snap.data()
          setTailor({
            id: snap.id,
            name: d.fullName || d.name || 'Tailor',
            rating: d.rating || 4.5,
            reviews: d.reviewsCount || 0,
            years: d.yearsExp || 5,
            location: d.address || 'Local Area',
            about: d.about || 'Premium tailoring services with doorstep pickup and delivery. Skilled in alterations and custom stitching.',
            pricing: d.pricing || {},
            hours: d.hours || { open: '10:00', close: '19:00' },
            bannerUrl: d.bannerUrl || '',
            isOnline: d.isAvailable ?? true
          })
        }
      } catch (err) {
        console.error('Error fetching tailor profile:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTailor()
  }, [id])

  if (loading) return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 grid place-items-center"><div className="animate-pulse text-[#305cde] font-bold">Loading Rate Card...</div></div>
    </div>
  )

  if (!tailor) return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 grid place-items-center"><div className="text-neutral-500">Tailor not found</div></div>
    </div>
  )

  const handleEnquire = () => {
    navigate(`/enquiries?tailorId=${tailor.id}&tailorName=${encodeURIComponent(tailor.name)}&isOnline=${tailor.isOnline}`)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-neutral-50/30">
      <Navbar />
      <main className="flex-1">
        {/* Banner Area */}
        <div className="relative h-48 md:h-72 w-full bg-[#305cde] overflow-hidden">
          {tailor.bannerUrl ? (
            <img src={tailor.bannerUrl} alt={tailor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 px-4 w-full max-w-6xl mx-auto">
            <div className="h-28 w-28 md:h-36 md:w-36 rounded-3xl border-4 border-white overflow-hidden bg-white shadow-2xl flex items-center justify-center">
              <span className="text-5xl font-black text-[#305cde]">{tailor.name.charAt(0)}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 pt-16">
          {/* Hero Info */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${tailor.isOnline ? 'bg-green-500 animate-pulse' : 'bg-neutral-300'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  {tailor.isOnline ? 'Online Now' : 'Currently Offline'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">{tailor.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-neutral-600 mt-4">
                <div className="flex items-center gap-1.5 font-bold text-neutral-800 bg-white px-3 py-1.5 rounded-xl border border-neutral-100 shadow-sm">
                  <FiStar className="text-amber-500 fill-amber-500" /> {tailor.rating}
                  <span className="text-neutral-400 font-medium ml-1">({tailor.reviews})</span>
                </div>
                <span className="text-sm font-bold text-neutral-400">•</span>
                <span className="font-bold text-neutral-700">{tailor.years}+ yrs experience</span>
                <span className="text-sm font-bold text-neutral-400">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium"><FiMapPin className="text-[#305cde]" /> {tailor.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PrimaryButton className="px-10 py-4 rounded-2xl shadow-2xl shadow-blue-500/30 font-black uppercase tracking-widest text-xs" onClick={handleEnquire}>
                <FiMessageCircle className="w-5 h-5 mr-2" />
                Start Chat
              </PrimaryButton>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-10 mt-12">
            {/* Rate Card Column */}
            <div className="space-y-8">
              <Card className="p-0 overflow-hidden border-none shadow-xl shadow-neutral-200/50">
                <div className="p-8 bg-neutral-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#305cde] rounded-full -mr-20 -mt-20 blur-3xl opacity-30" />
                  <h2 className="text-2xl font-black relative z-10">Rate Card / Catalog</h2>
                  <p className="text-neutral-400 text-sm mt-1 relative z-10">Standard pricing for common services. Final quote may vary.</p>
                </div>
                <div className="p-8 bg-white font-serif">
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
                    {Object.keys(tailor.pricing).length > 0 ? Object.keys(tailor.pricing).map((name) => (
                      <ServiceRow key={name} name={name} price={tailor.pricing[name]} />
                    )) : (
                      <div className="col-span-2 text-center py-16 px-6 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
                        <div className="text-neutral-400 font-bold italic opacity-60">"Every masterpiece has its own price. Message me for a custom quote based on your fabric and design!"</div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-none shadow-xl shadow-neutral-200/50">
                <h2 className="text-2xl font-black text-neutral-900 mb-6">Verified Reviews</h2>
                <div className="flex items-center gap-6 p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
                  <div className="text-5xl font-black text-[#305cde]">{tailor.rating}</div>
                  <div>
                    <div className="flex gap-1 text-amber-500 mb-1">
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current opacity-30" />
                    </div>
                    <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Based on {tailor.reviews} happy customers</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8 h-fit">
              <Card className="p-8 border-none shadow-xl shadow-neutral-200/50 bg-[#305cde]/5 border-l-4 border-l-[#305cde]">
                <h3 className="text-sm font-black text-[#305cde] uppercase tracking-widest mb-4">Master's Bio</h3>
                <p className="text-neutral-700 text-sm leading-relaxed font-medium">{tailor.about}</p>

                <div className="mt-8 pt-8 border-t border-blue-100 space-y-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <div className="p-2 bg-white rounded-lg"><FiClock className="w-4 h-4 text-[#305cde]" /></div>
                      <span className="font-bold">Working Hours</span>
                    </div>
                    <span className="font-black text-neutral-900">{tailor.hours.open} - {tailor.hours.close}</span>
                  </div>
                </div>
              </Card>

              <div className="bg-neutral-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#305cde] rounded-full -mr-10 -mb-10 blur-3xl opacity-30 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-xl font-black relative z-10 mb-3">Custom Requirement?</h3>
                <p className="text-neutral-400 text-sm relative z-10 mb-8 leading-relaxed">Have a specific design or urgent fix? Send a message to discuss and get an instant quote.</p>
                <button
                  onClick={handleEnquire}
                  className="w-full bg-[#305cde] hover:bg-blue-600 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-500/20 relative z-10 flex items-center justify-center gap-2"
                >
                  Enquire Directly
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-24" />
      </main>
      <Footer />
    </div>
  )
}

export default TailorProfile
