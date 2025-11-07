// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import JourneyCTA from "../components/JourneyCTA";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  const highlights = [
    {
      title: "500+ Curated Trips",
      desc: "Handpicked experiences across mountains, beaches, and heritage cities.",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Trusted Travel Experts",
      desc: "Over 15 years crafting personalized itineraries across India.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Seamless Planning",
      desc: "From inspiration to booking — we handle every detail with care.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const whyTravel = [
    { icon: "🌍", title: "Authentic Experiences", desc: "Designed with local experts and community partners." },
    { icon: "🕉️", title: "Spiritual & Cultural Depth", desc: "Explore beyond landmarks — connect with India’s living heritage." },
    { icon: "✨", title: "Tailored Journeys", desc: "Each itinerary shaped around your pace, interests, and comfort." },
    { icon: "🏞️", title: "Eco-Conscious Travel", desc: "Sustainable experiences that support nature & culture." },
  ];

  return (
    <main className="min-h-screen bg-[rgb(255,251,244)] text-gray-900 scroll-smooth">
      <Helmet>
        <title>Echo Getaways | Discover the Soul of India</title>
        <meta
          name="description"
          content="Curated experiences, cultural journeys, and authentic travel circuits across India. Plan your perfect trip with Echo Getaways."
        />
      </Helmet>

      {/* HERO SECTION */}
      <motion.section
        className="relative bg-cover bg-center bg-fixed text-white overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-extrabold leading-tight"
          >
            Discover the Soul of India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed"
          >
            Authentic journeys, curated experiences, and unforgettable memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href="/destinations"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full font-semibold text-white hover:opacity-90 transition"
            >
              Explore Destinations
            </a>
            <a
              href="/experiences"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-white/20 border border-white/30 text-white rounded-full font-medium hover:bg-white/30 transition"
            >
              Explore Experiences
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80 animate-bounce">
          ↓ Scroll to Explore
        </div>
      </motion.section>

      {/* Fade separator */}
      <div className="h-16 bg-gradient-to-b from-transparent to-amber-50" />

      {/* HIGHLIGHTS */}
      <motion.section
        id="highlights"
        className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            className="rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-500 bg-white/80 backdrop-blur-sm border border-amber-100"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <img src={item.img} alt={item.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-700 mb-2 font-serif">{item.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Fade separator */}
      <div className="h-16 bg-gradient-to-b from-amber-50 to-amber-100" />

      {/* FEATURED EXPERIENCES */}
      <motion.section
        id="experiences"
        className="bg-gradient-to-b from-amber-50 to-amber-100 py-20 px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-amber-800 mb-4"
            data-aos="fade-up"
          >
            Featured Experiences
          </h2>
          <p
            className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            From cultural immersions to wellness retreats — explore journeys that truly resonate.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { title: "Cultural Immersions", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" },
              { title: "Adventure Trails", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80" },
              { title: "Luxury Escapes", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
            ].map((exp, i) => (
              <motion.div
                key={i}
                className="w-[260px] sm:w-[280px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <img src={exp.img} alt={exp.title} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-amber-700 font-serif">{exp.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="/experiences"
            className="inline-block mt-10 px-6 py-2.5 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition"
          >
            View All Experiences
          </a>
        </div>
      </motion.section>

      {/* Fade separator */}
      <div className="h-16 bg-gradient-to-b from-amber-100 to-transparent" />

      {/* WHY TRAVEL WITH US */}
      <motion.section
        id="why-us"
        className="max-w-7xl mx-auto py-20 px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800 mb-10"
          data-aos="fade-up"
        >
          Why Travel With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {whyTravel.map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white/80 backdrop-blur rounded-xl shadow-md hover:-translate-y-1 transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold text-amber-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA + Scroll to Top */}
      <JourneyCTA />
      <ScrollToTopButton />
    </main>
  );
}
