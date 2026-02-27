import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'

const QuickFixOptions = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const category = params.get('category') || 'other'

  const categoryNames = {
    shirt: 'Shirt',
    pant: 'Pant',
    jacket: 'Jacket',
    kurta: 'Kurta',
    dress: 'Dress',
    saree: 'Saree',
    other: 'Other'
  }

  const options = {
    shirt: [
      { id: 'button-fix', name: 'Button Fix', description: 'Replace or fix buttons' },
      { id: 'collar-repair', name: 'Collar Repair', description: 'Fix collar issues' },
      { id: 'sleeve-alteration', name: 'Sleeve Alteration', description: 'Adjust sleeve length' },
      { id: 'hemming', name: 'Hemming', description: 'Adjust bottom hem' },
      { id: 'pocket-repair', name: 'Pocket Repair', description: 'Fix or add pockets' },
    ],
    pant: [
      { id: 'button-fix', name: 'Button Fix', description: 'Replace or fix buttons' },
      { id: 'zipper-repair', name: 'Zipper Repair', description: 'Fix zipper issues' },
      { id: 'hemming', name: 'Hemming', description: 'Adjust pant length' },
      { id: 'waist-alteration', name: 'Waist Alteration', description: 'Adjust waist size' },
      { id: 'pocket-repair', name: 'Pocket Repair', description: 'Fix or add pockets' },
    ],
    jacket: [
      { id: 'button-fix', name: 'Button Fix', description: 'Replace or fix buttons' },
      { id: 'zipper-repair', name: 'Zipper Repair', description: 'Fix zipper issues' },
      { id: 'lining-repair', name: 'Lining Repair', description: 'Fix inner lining' },
      { id: 'sleeve-alteration', name: 'Sleeve Alteration', description: 'Adjust sleeve length' },
      { id: 'hemming', name: 'Hemming', description: 'Adjust bottom hem' },
    ],
    kurta: [
      { id: 'button-fix', name: 'Button Fix', description: 'Replace or fix buttons' },
      { id: 'alteration', name: 'Alteration', description: 'General alterations' },
      { id: 'hemming', name: 'Hemming', description: 'Adjust length' },
      { id: 'sleeve-alteration', name: 'Sleeve Alteration', description: 'Adjust sleeve length' },
    ],
    dress: [
      { id: 'zipper-repair', name: 'Zipper Repair', description: 'Fix zipper issues' },
      { id: 'hemming', name: 'Hemming', description: 'Adjust dress length' },
      { id: 'alteration', name: 'Alteration', description: 'General fit alterations' },
      { id: 'straps-repair', name: 'Straps Repair', description: 'Fix dress straps' },
    ],
    saree: [
      { id: 'hemming', name: 'Hemming', description: 'Adjust saree hem' },
      { id: 'blouse-alteration', name: 'Blouse Alteration', description: 'Adjust blouse fit' },
      { id: 'pleats-fixing', name: 'Pleats Fixing', description: 'Fix pleats' },
    ],
    other: [
      { id: 'button-fix', name: 'Button Fix', description: 'Replace or fix buttons' },
      { id: 'zipper-repair', name: 'Zipper Repair', description: 'Fix zipper issues' },
      { id: 'hemming', name: 'Hemming', description: 'Adjust length' },
      { id: 'alteration', name: 'Alteration', description: 'General alterations' },
      { id: 'stitching', name: 'Stitching', description: 'General stitching work' },
    ],
  }

  const handleOptionSelect = (optionId) => {
    try {
      localStorage.setItem('selectedCategory', category)
      localStorage.setItem('selectedOption', optionId)
      localStorage.setItem('workType', 'light')
    } catch {}
    navigate(`/find?type=light&category=${category}&option=${optionId}`)
  }

  const currentOptions = options[category] || options.other

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Select Service for {categoryNames[category]}</h1>
            <div className="text-neutral-600 mb-6">Choose the type of service you need</div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {currentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className="rounded-xl border border-neutral-200 p-5 text-left hover:border-[color:var(--color-primary)] transition-all hover:shadow-md"
                >
                  <div className="text-lg font-semibold mb-1">{option.name}</div>
                  <div className="text-sm text-neutral-600">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default QuickFixOptions

