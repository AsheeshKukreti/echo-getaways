import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Echo Getaways</h3>
          <p className="text-sm leading-relaxed">
            Crafting authentic travel experiences across India — where every journey echoes in your heart.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} Echo Getaways · All rights reserved.
      </div>
    </footer>
  )
}
