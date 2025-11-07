import React from 'react'

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')`,
      }}
    >
      {/* Gradient overlay */}
      <div className="bg-gradient-to-r from-primary/80 to-accent/60 p-12">
        <div className="max-w-6xl mx-auto text-white py-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight drop-shadow-lg">
            Discover the Soul of India with Echo Getaways
          </h1>
          <p className="mt-4 text-lg max-w-2xl text-gray-100">
            Authentic journeys, curated experiences, and unforgettable memories across India.
          </p>
          <div className="mt-6">
            <a
              href="#destinations"
              className="inline-block px-8 py-3 rounded-md bg-white text-primary font-semibold shadow-lg hover:scale-[0.98] hover:bg-gray-100 transition-transform duration-300"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>

      {/* Optional subtle overlay effect */}
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  )
}
