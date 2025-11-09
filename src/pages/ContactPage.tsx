// src/pages/ContactPage.tsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import JourneyCTA from "../components/JourneyCTA";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <main className="min-h-screen bg-[rgb(255,251,244)] text-gray-900">
      {/* HERO */}
      <section
        className="relative text-white bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-serif font-extrabold mb-4"
          >
            Contact <span className="text-amber-400">Echo Getaways</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-amber-100 max-w-2xl mx-auto"
          >
            We’d love to hear from you! Whether it’s a travel idea, feedback, or a question — reach
            out and let’s begin your next journey together.
          </motion.p>
        </div>
      </section>

      {/* QUICK CONTACT INFO */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: "📧",
            title: "Email Us",
            detail: "hello@echogetaways.in",
            link: "mailto:hello@echogetaways.in",
          },
          {
            icon: "💬",
            title: "Phone / WhatsApp",
            detail: "+91 98765 43210",
            link: "https://wa.me/919876543210",
          },
          {
            icon: "📍",
            title: "Office Address",
            detail: "South Delhi, India",
            link: "https://maps.google.com",
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold text-amber-700">{item.title}</h3>
            <p className="text-gray-700 mt-1">{item.detail}</p>
          </a>
        ))}
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="max-w-5xl mx-auto px-6 py-12" data-aos="fade-up">
        <ContactForm />
        {/* direct contact option (visible on all sizes) */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700 mb-3">Prefer a quick chat? Reach us directly:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-700 text-white font-medium shadow-md hover:bg-amber-800 transition"
            >
              📞 +91 98765 43210
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%20Echo%20Getaways!%20I%27m%20interested%20in%20planning%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-700 text-white font-medium shadow-md hover:bg-emerald-800 transition"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA + ScrollToTop */}
      <JourneyCTA />
      <ScrollToTopButton />
    </main>
  );
}
