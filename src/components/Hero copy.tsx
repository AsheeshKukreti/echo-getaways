import React from 'react'
import heroLocal from '../assets/images/hero-beach.jpg'

export default function Hero() {
  return (
    // Option A: Local image (default)
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${heroLocal})` }}
    >

      {/* Option B: Unsplash live image → uncomment below, and comment the local version above */}
      {/* 
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')` }}
      > 
      */}

      <div className="bg-gradient-to-r from-primary/80 to-secondary/60 p-12">
        <div className="max-w-6xl mx-auto text-white py-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            Discover the Soul of India with Echo Getaways
          </h1>
          <p className="mt-4 text-lg max-w-2xl">
            Authentic journeys, curated experiences, and unforgettable memories across India.
          </p>
          <div className="mt-6">
            <a
              href="#destinations"
              className="inline-block px-6 py-3 rounded-md bg-accent text-dark font-semibold shadow-lg hover:scale-[0.99] transition-transform"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
