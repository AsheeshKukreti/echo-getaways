import React from "react";

/**
 * JourneyCTA Component
 * Reusable call-to-action section for Echo Getaways
 * Usage: <JourneyCTA />
 */
export default function JourneyCTA() {
  return (
    <section
      className="relative mt-24 rounded-3xl overflow-hidden shadow-xl"
      data-aos="zoom-in"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://t3.ftcdn.net/jpg/12/12/20/20/240_F_1212202079_4ZtjTn5PBsElFP9X6C8n7fVN99AsRds0.jpg"
          
          
          alt="Indian ghats at sunset - Echo Getaways"
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/80 via-orange-600/70 to-emerald-700/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white py-20 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold mb-4 drop-shadow-lg">
          Plan Your <span className="text-amber-200">Bespoke Journey</span> with{" "}
          <span className="text-teal-200">Echo Getaways</span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-amber-50 mb-8">
          Every traveler has a story. Let us design yours — from royal palaces
          and desert dunes to sacred ghats and serene backwaters. Discover
          India’s essence, one experience at a time.
        </p>

        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-white/90 text-amber-700 font-semibold rounded-md shadow-md 
          hover:bg-white hover:shadow-lg hover:scale-[0.98] transition-transform duration-300"
        >
          Start Planning Now
        </a>

        {/* Decorative Divider */}
        <div className="mt-10 flex justify-center">
          <span className="w-16 h-[2px] bg-amber-200 inline-block rounded-full"></span>
        </div>
      </div>
    </section>
  );
}
