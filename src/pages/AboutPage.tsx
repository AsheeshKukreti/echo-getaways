import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import JourneyCTA from "../components/JourneyCTA";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const values = [
    { icon: "🌏", title: "Authenticity", desc: "Crafting immersive journeys that reflect India's soul and heritage." },
    { icon: "💫", title: "Personalization", desc: "Every journey is curated to match your pace, interests, and story." },
    { icon: "🌿", title: "Sustainability", desc: "We support local communities and travel responsibly." },
    { icon: "🤝", title: "Trust & Care", desc: "15+ years of excellence and countless unforgettable journeys." },
  ];

  return (
    <main className="min-h-screen bg-[rgb(255,251,244)] text-gray-900">
      {/* HERO SECTION */}
      <section
        className="relative text-white bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.65)), url('https://t4.ftcdn.net/jpg/02/91/62/97/240_F_291629754_xySTeVRi3BfdBRT1tgr0gpVbpXRYaaKO.jpg')",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold leading-tight"
          >
            About <span className="text-amber-400">Echo Getaways</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-base sm:text-lg md:text-xl text-amber-100 max-w-2xl mx-auto"
          >
            We’re not just travel planners — we’re storytellers of India’s soul, crafting journeys
            that resonate long after you return home.
          </motion.p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          data-aos="fade-right"
          src="https://as2.ftcdn.net/jpg/05/66/28/77/1000_F_566287755_v6U1pJrqQ6CBeuxLb7gopAHFzCuStLLH.jpg"
          alt="About Echo Getaways"
          className="rounded-2xl shadow-lg object-cover w-full h-[340px] sm:h-[420px] hover:scale-105 transition-transform duration-700"
        />
        <motion.div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-emerald-700 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 mb-4 text-base sm:text-lg leading-relaxed">
            <strong className="text-amber-600">Echo Getaways</strong> was founded to redefine
            how travelers experience India — journeys that echo with connection, color, and culture.
          </p>
          <p className="text-gray-700 mb-4 text-base sm:text-lg leading-relaxed">
            With over 15 years of expertise, we design immersive escapes across India — from royal
            forts of Rajasthan to Kerala’s tranquil backwaters and Himalayan retreats.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 text-base sm:text-[15px]">
            <li>✅ Personalized itineraries by local experts</li>
            <li>✅ Boutique accommodations with character</li>
            <li>✅ 24×7 travel support & safety-first focus</li>
            <li>✅ Authentic cultural immersion & offbeat trails</li>
          </ul>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <motion.section
        className="mt-16 bg-gradient-to-r from-orange-50 via-amber-50 to-teal-50 rounded-3xl p-10 text-center shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-emerald-700 mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Our mission is to craft meaningful and sustainable travel experiences that reveal India
          beyond guidebooks — connecting travelers with its stories and spirit.
          <br />
          Our vision is to make{" "}
          <span className="font-semibold text-amber-600">Echo Getaways</span> India’s most trusted
          inbound travel brand, known for authenticity, creativity, and exceptional care.
        </p>
      </motion.section>

      {/* OUR VALUES */}
      <motion.section
        id="values"
        className="max-w-7xl mx-auto py-20 px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800 mb-10">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white/80 backdrop-blur rounded-xl shadow-md hover:-translate-y-1 transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h4 className="text-lg font-semibold text-amber-700 mb-2">{v.title}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TEAM SECTION (COMMENTED OUT for future activation) */}
      {/*
      <section className="mt-20" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 font-serif mb-12">
          Meet the <span className="text-amber-600">Echo Getaways</span> Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[...teamData].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 ease-in-out hover:-translate-y-1"
              data-aos="zoom-in"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-amber-200 mb-4 shadow-md"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{member.role}</p>
              <p className="text-gray-600 text-base sm:text-[15px] leading-relaxed">{member.text}</p>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* CTA + Scroll To Top */}
      <JourneyCTA />
      <ScrollToTopButton />
    </main>
  );
}
