import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import { FiMapPin, FiStar, FiPhone, FiMessageCircle } from 'react-icons/fi'

const ServiceRow = ({ name, price }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0 border-neutral-200">
    <div className="text-sm">{name}</div>
    <div className="font-semibold">₹{price}</div>
  </div>
)

const ReviewItem = ({ name, rating, text }) => (
  <div className="p-4 border border-neutral-200 rounded-xl">
    <div className="flex items-center justify-between">
      <div className="font-medium">{name}</div>
      <div className="text-sm text-neutral-600">{rating} ★</div>
    </div>
    <p className="text-neutral-600 text-sm mt-1">{text}</p>
  </div>
)

const TailorProfile = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [presence, setPresence] = useState('Available') // Available | Busy
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 1, from: 'tailor', text: 'Hello! How can I help you today?' }])
  const [input, setInput] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [endOpen, setEndOpen] = useState(false)
  const [proofImage, setProofImage] = useState(null)
  const chatRef = useRef(null)
  // Placeholder data; read from route state if present
  const tailor = location.state?.tailor || {
    name: 'StitchUp Tailors',
    rating: 4.7,
    reviews: 128,
    years: 8,
    location: 'Andheri East, Mumbai',
    bannerUrl: '',
    avatarUrl: '',
    services: [
      { name: 'Shirt Alteration', price: 149 },
      { name: 'Pant Hemming', price: 129 },
      { name: 'Blouse Stitching', price: 499 },
      { name: 'Kurta Stitching', price: 699 },
    ],
    reviewsList: [
      { name: 'Aarav', rating: 5, text: 'Perfect fit and quick pickup!' },
      { name: 'Riya', rating: 5, text: 'Loved the communication and delivery.' },
      { name: 'Kabir', rating: 4, text: 'Great quality at a fair price.' },
    ],
  }

  useEffect(() => {
    const t = setInterval(() => {
      // mock presence flips occasionally
      if (Math.random() < 0.12) setPresence(p => (p === 'Available' ? 'Busy' : 'Available'))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!accepted) return
    const t = setInterval(() => setElapsedSec(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [accepted])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, chatOpen])

  const timerText = useMemo(() => {
    const m = Math.floor(elapsedSec / 60)
    const s = elapsedSec % 60
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  }, [elapsedSec])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(msgs => [...msgs, { id: msgs.length + 1, from: 'user', text: input.trim() }])
    setInput('')
    // mock tailor typing & reply
    setTimeout(() => {
      setMessages(msgs => [...msgs, { id: msgs.length + 1, from: 'tailor', text: 'Got it! I can do that.' }])
    }, 1200)
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Banner */}
        <div className="relative h-44 md:h-60 w-full bg-neutral-100 border-b border-neutral-200">
          {tailor.bannerUrl ? (
            <img src={tailor.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0">
            <div className="h-24 w-24 rounded-2xl border-4 border-white overflow-hidden bg-neutral-200">
              {tailor.avatarUrl ? (
                <img src={tailor.avatarUrl} alt={tailor.name} className="w-full h-full object-cover" />
              ) : null}
            </div>
          </div>
        </div>

        {/* Header details */}
        <div className="mx-auto max-w-6xl px-4 pt-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">{tailor.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-neutral-600 mt-1">
                <span className="inline-flex items-center gap-1"><FiStar className="text-[color:var(--color-primary)]" /> {tailor.rating} ({tailor.reviews})</span>
                <span>{tailor.years}+ yrs exp</span>
                <span className="inline-flex items-center gap-1"><FiMapPin /> {tailor.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-outline inline-flex items-center gap-2" onClick={() => navigator.clipboard && navigator.clipboard.writeText('+91 98765 43210')}><FiPhone /> Share Phone</button>
              <button className="btn-outline inline-flex items-center gap-2" onClick={() => setChatOpen(true)}><FiMessageCircle /> Chat</button>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-[1fr_420px] gap-4 mt-6">
            <div className="grid gap-4">
              <div className="p-3 rounded-xl border border-neutral-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className={["h-2.5 w-2.5 rounded-full", presence === 'Available' ? 'bg-green-500' : 'bg-yellow-500'].join(' ')} />
                  <span>Tailor is <span className="font-medium">{presence}</span>{presence === 'Busy' ? ' (chatting with someone)' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!accepted ? (
                    <button className="btn-primary" onClick={() => { setAccepted(true); setChatOpen(true); }}>Accept Work</button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-sm">
                      <span className="px-2 py-0.5 rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">In Progress {timerText}</span>
                      <button className="btn-outline" onClick={() => setEndOpen(true)}>End Task</button>
                    </div>
                  )}
                </div>
              </div>

              <Card className="p-5">
                <div className="text-lg font-semibold mb-3">Services & Pricing</div>
                <div className="grid sm:grid-cols-2 gap-x-8">
                  {tailor.services.map((s, i) => <ServiceRow key={i} name={s.name} price={s.price} />)}
                </div>
              </Card>

              <Card className="p-5">
                <div className="text-lg font-semibold mb-3">Reviews</div>
                <div className="grid gap-3">
                  {tailor.reviewsList.map((r, i) => (
                    <ReviewItem key={i} name={r.name} rating={r.rating} text={r.text} />
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-4">
              <Card className="p-5">
                <div className="text-lg font-semibold">About</div>
                <p className="text-neutral-600 text-sm mt-2">Premium tailoring services with doorstep pickup and delivery. Skilled in alterations and custom stitching.</p>
              </Card>
              <Card className="p-5">
                <div className="text-lg font-semibold">Location</div>
                <div className="mt-3 h-40 rounded-xl border border-neutral-200 bg-neutral-50 grid place-items-center text-neutral-500">Map preview</div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky booking bar */}
      <div className="sticky bottom-0 inset-x-0 bg-white/80 backdrop-blur border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-sm"><span className="font-semibold">From ₹{tailor.services[0].price}</span> • Trusted by {tailor.reviews}+ customers</div>
          <PrimaryButton onClick={()=> setChatOpen(true)}>Open Chat</PrimaryButton>
        </div>
      </div>

      <Footer />

      {chatOpen ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setChatOpen(false)} />
          <div className="absolute inset-0 grid place-items-center px-4">
            <div className="card p-4 w-full max-w-lg bg-white">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold inline-flex items-center gap-2">
                  Chat with {tailor.name}
                  {accepted ? (
                    <span className="px-2 py-0.5 rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-xs">Timer {timerText}</span>
                  ) : null}
                </div>
                <button className="btn-outline" onClick={() => setChatOpen(false)}>Close</button>
              </div>
              <div ref={chatRef} className="mt-3 h-64 overflow-auto rounded-lg border border-neutral-200 p-3 bg-neutral-50">
                {messages.map(m => (
                  <div key={m.id} className={["max-w-[80%] mb-2 px-3 py-2 rounded-lg text-sm", m.from==='user' ? 'ml-auto bg-[color:var(--color-primary)] text-white' : 'bg-white border border-neutral-200'].join(' ')}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message" className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 outline-none" />
                <button className="btn-primary" onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {endOpen ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEndOpen(false)} />
          <div className="absolute inset-0 grid place-items-center px-4">
            <div className="card p-5 w-full max-w-sm bg-white">
              <div className="text-lg font-semibold">End Task</div>
              <div className="text-neutral-600 text-sm mt-1">Upload a photo of the completed work and confirm.</div>
              <div className="mt-3">
                <input type="file" accept="image/*" onChange={(e)=> setProofImage(e.target.files?.[0] || null)} />
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button className="btn-outline" onClick={() => setEndOpen(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => { setEndOpen(false); navigate('/order/123', { state: { status: 'awaiting_confirmation', proof: !!proofImage } }) }}>Submit & Continue</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TailorProfile


