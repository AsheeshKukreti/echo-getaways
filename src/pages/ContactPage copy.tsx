import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import JourneyCTA from "../components/JourneyCTA";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    dates: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for reaching out! Our travel expert will get in touch soon.");
    setFormData({ name: "", email: "", country: "", phone: "", dates: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[rgb(255,251,244)] text-gray-900">
      {/* HERO SECTION */}
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
            We’d love to hear from you! Whether it’s a travel idea, feedback, or a question — reach out and let’s begin your next journey.
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
          <motion.a
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
          </motion.a>
        ))}
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact-form"
        className="max-w-4xl mx-auto px-6 py-16 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-amber-100"
        data-aos="fade-up"
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center text-emerald-700 mb-8">
          Send Us a Message
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="Your full name"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Travel Dates *</label>
            <input
              type="text"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="e.g., December 2025 or Flexible"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Message *</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="Tell us about your travel ideas..."
            />
          </div>

          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-all"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </section>

      {/* MAP SECTION (commented for optional use) */}
      {/*
      <section className="mt-16 max-w-6xl mx-auto px-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-amber-700 mb-4 text-center">Find Us Here</h3>
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!..."
            width="100%"
            height="350"
            allowFullScreen
            loading="lazy"
            className="border-0 w-full rounded-3xl"
          ></iframe>
        </div>
      </section>
      */}

      {/* CTA + ScrollToTop */}
      <JourneyCTA />
      <ScrollToTopButton />
    </main>
  );
}
