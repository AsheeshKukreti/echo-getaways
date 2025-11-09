// src/components/ContactForm.tsx
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Globe,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { sendInquiry } from "../services/contactService";

// Memoized wrapper to reduce re-renders
const Field = memo(function Field({
  icon,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm px-3 py-2.5 focus-within:ring-2 focus-within:ring-amber-300 transition-all duration-150 ${className}`}
    >
      <div className="text-amber-600 mr-3 flex-shrink-0">{icon}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
});

export default function ContactForm(): JSX.Element {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    dates: "",
    tripType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Controlled input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit - uses your sendInquiry service
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await sendInquiry(form);
      setStatus(
        res.success
          ? "✨ Thank you! Your enquiry has been received — our travel curator will reach out soon."
          : "❌ Oops! Something went wrong. Please try again later."
      );

      if (res.success) {
        setForm({
          name: "",
          email: "",
          country: "",
          phone: "",
          dates: "",
          tripType: "",
          message: "",
        });
        // scroll to top so user sees toast (page-level)
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("sendInquiry error:", err);
      setStatus("❌ Error sending your message. Please retry or email hello@echogetaways.in");
    } finally {
      setLoading(false);
      // auto-hide toast after a short time
      setTimeout(() => setStatus(null), 4500);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto w-full px-4 py-6 sm:p-8 bg-gradient-to-b from-amber-50/80 to-emerald-50/80 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl"
    >
      <h3 className="text-3xl font-serif font-semibold text-emerald-800 mb-6 text-center">
        Plan Your Next Journey
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field icon={<User size={18} />}>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            aria-label="Full Name"
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm"
          />
        </Field>

        <Field icon={<Mail size={18} />}>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Email *"
            aria-label="Email"
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm"
          />
        </Field>

        {/* Country: improved select styling */}
        {/* 🌍 Country Dropdown */}
        <Field icon={<Globe size={18} />}>
          <motion.div
            initial={{ scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            whileFocus={{
              scale: 1.02,
              boxShadow: "0px 0px 12px rgba(251, 191, 36, 0.4)", // amber glow
            }}
            transition={{ duration: 0.25 }}
            className="relative w-full rounded-xl"
          >
            <select
              name="country"
              required
              value={form.country}
              onChange={handleChange}
              aria-label="Country"
              className="w-full appearance-none bg-white/60 backdrop-blur-sm border border-amber-200/60 rounded-xl px-3 py-2 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 pr-8"
            >
              <option value="">Select Country *</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-amber-600">
              <ChevronDown size={16} />
            </span>
          </motion.div>
        </Field>


        <Field icon={<Phone size={18} />}>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            aria-label="Phone"
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm"
          />
        </Field>

        <Field icon={<Calendar size={18} />}>
          <input
            name="dates"
            type="text"
            value={form.dates}
            onChange={handleChange}
            placeholder="Preferred Travel Dates (optional)"
            aria-label="Preferred Travel Dates"
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm"
          />
        </Field>

        {/* Trip Type select with same visual style */}
        {/* 🗺️ Trip Type Dropdown */}
        <Field icon={<MapPin size={18} />}>
          <motion.div
            initial={{ scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            whileFocus={{
              scale: 1.02,
              boxShadow: "0px 0px 12px rgba(16, 185, 129, 0.35)", // emerald glow
            }}
            transition={{ duration: 0.25 }}
            className="relative w-full rounded-xl"
          >
            <select
              name="tripType"
              value={form.tripType}
              onChange={handleChange}
              aria-label="Trip Type"
              className="w-full appearance-none bg-white/60 backdrop-blur-sm border border-emerald-200/60 rounded-xl px-3 py-2 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 pr-8"
            >
              <option value="">Select Trip Type (optional)</option>
              <option value="Cultural">Cultural Immersion</option>
              <option value="Adventure">Adventure Escape</option>
              <option value="Luxury">Luxury Experience</option>
              <option value="Wellness">Wellness Retreat</option>
              <option value="Spiritual">Spiritual Journey</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600">
              <ChevronDown size={16} />
            </span>
          </motion.div>
        </Field>

        <div className="md:col-span-2">
          <Field icon={<MessageSquare size={18} />}>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your dream trip..."
              aria-label="Message"
              className="w-full bg-transparent border-none outline-none text-gray-800 text-sm resize-none"
            />
          </Field>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2.5 rounded-full text-white font-semibold shadow-md transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-700 to-emerald-600 hover:opacity-95"
          }`}
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </div>

      {/* Floating toast/status */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35 }}
            className={`fixed bottom-[6vh] left-1/2 -translate-x-1/2 px-5 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 ${
              status.toLowerCase().includes("thank")
                ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.toLowerCase().includes("thank") ? <CheckCircle size={18} /> : <XCircle size={18} />}
            <span className="text-sm font-medium">{status}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
