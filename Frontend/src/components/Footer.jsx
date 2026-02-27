import React from 'react'
import { Link } from 'react-router-dom'
import { FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">About StitchUp</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link to="/" className="hover:text-black transition-colors">About</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Career</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Learn more</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link to="/" className="hover:text-black transition-colors">Privacy</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors">Terms</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors text-nowrap">For Partners (Coming Soon)</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Follow us</h4>
            <div className="flex gap-4 text-neutral-500">
              <a href="#" className="hover:text-black transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="hover:text-black transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="hover:text-black transition-colors"><FiLinkedin size={20} /></a>
            </div>
          </div>

          {/* Column 4 - Logo */}
          <div className="flex md:justify-end items-start md:col-span-1">
            <img src="/logo2.png" alt="StitchUp" className="h-12 w-auto object-contain" />
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100">
          <p className="text-[10px] text-neutral-400 leading-relaxed mb-4">
            By continuing past this page, you agree to our <Link to="/" className="underline">Terms of service</Link>, <Link to="/" className="underline">Cookie policy</Link>, <Link to="/" className="underline">Privacy policy</Link> and <Link to="/" className="underline">Content policies</Link>. All trademarks are properties of their respective owners. 2016-2026 © Blink Commerce Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
