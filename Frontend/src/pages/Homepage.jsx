import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import { motion } from 'framer-motion'

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const FeatureSection = ({ title, items, image, reverse = false }) => (
  <section className="py-20 px-6">
    <div className={`max-w-6xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
      <motion.div
        className="flex-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={featureVariants}
      >
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">{title}</h2>
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-neutral-600">
              <span className="text-xl leading-none mt-1">•</span>
              <span className="text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="flex-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={featureVariants}
      >
        <img src={image} alt={title} className="w-full h-auto rounded-3xl shadow-xl object-cover" />
      </motion.div>
    </div>
  </section>
)

const Homepage = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-white overflow-hidden">
      <Navbar hideUntilScroll />
      <HeroSection />

      <FeatureSection
        title="Professional Tailors"
        image="/sewing.png"
        items={[
          "Verified and skilled tailors curated for quality work.",
          "Years of experience in styling, stitching, and alterations.",
          "Trusted craftsmanship for a perfect fit, every time."
        ]}
      />

      <FeatureSection
        title="Convenience at every point"
        image="/garment.png"
        reverse
        items={[
          "Book, track, and receive your garments at your doorstep.",
          "Fast pickup, timely delivery, and real-time updates.",
          "Tailoring made effortless, comfort meets smart service."
        ]}
      />

      <FeatureSection
        title="Fast & Convenient Service"
        image="/delivery.png"
        items={[
          "Doorstep pickup and delivery for ultimate ease.",
          "Quick turnarounds with live order tracking.",
          "Instant booking, tailoring made effortless."
        ]}
      />

      <Footer />
    </div>
  )
}

export default Homepage