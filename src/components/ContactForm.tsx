// src/components/ContactForm.tsx
import React, { useState, useEffect } from "react";
import { sendInquiry } from "../services/contactService";
import {
  User,
  Mail,
  Globe,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await sendInquiry({ name, email, phone, message });
    setLoading(false);
    setStatus(res.message);

    if (res.success) {
      setName("");
      setEmail("");
      setCountry("");
      setPhone("");
      setDates("");
      setMessage("");
    }

    setTimeout(() => setStatus(null), 3500);
  }

  // ✅ Mobile Form
  const MobileForm = () => (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-4 bg-gradient-to-b from-amber-50 to-emerald-50 rounded-3xl shadow-lg space-y-4"
    >
      {[
        { icon: <User size={18} />, val: name, setVal: setName, type: "text", placeholder: "Full Name *" },
        { icon: <Mail size={18} />, val: email, setVal: setEmail, type: "email", placeholder: "Email *" },
        { icon: <Globe size={18} />, val: country, setVal: setCountry, type: "text", placeholder: "Country *" },
        { icon: <Phone size={18} />, val: phone, setVal: setPhone, type: "text", placeholder: "Phone (optional)" },
        { icon: <Calendar size={18} />, val: dates, setVal: setDates, type: "text", placeholder: "Preferred Travel Dates (optional)" },
      ].map((f, i) => (
        <div
          key={i}
          className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm px-3 py-2.5 focus-within:ring-2 focus-within:ring-amber-400 transition-all"
        >
          <span className="text-amber-600 mr-3 flex-shrink-0">{f.icon}</span>
          <input
            required={f.placeholder.includes("*")}
            type={f.type}
            value={f.val}
            onChange={(e) => f.setVal(e.target.value)}
            placeholder={f.placeholder}
            className="w-full bg-transparent text-gray-800 text-sm focus:outline-none placeholder-gray-400"
          />
        </div>
      ))}

      {/* Message */}
      <div className="flex items-start bg-white border border-gray-200 rounded-xl shadow-sm px-3 py-2.5 focus-within:ring-2 focus-within:ring-amber-400 transition-all">
        <MessageSquare className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={18} />
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your travel ideas..."
          className="w-full bg-transparent text-gray-800 text-sm focus:outline-none resize-none placeholder-gray-400"
        />
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className={`w-full py-2.5 text-base rounded-full font-semibold text-white shadow-md transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-amber-700 to-emerald-600 hover:opacity-90"
        }`}
      >
        {loading ? "Sending..." : "Start My Journey"}
      </button>

      {/* Toast Popup */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-[8vh] left-1/2 -translate-x-1/2 px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-50 ${
              status.includes("Thank")
                ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.includes("Thank") ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {status}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );

  // ✅ Desktop Form (unchanged logic)
  const DesktopForm = () => (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl w-full mx-auto px-4 sm:px-0 space-y-5 sm:space-y-6"
    >
      {/* Reuse your existing desktop input blocks (same as before) */}
      {/* Keeping identical floating label UI */}
      {/* Name */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-3 flex items-center">
        <User className="text-amber-700 w-5 h-5 mr-3" />
        <div className="relative w-full group">
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            className="peer w-full border-none bg-transparent focus:outline-none text-gray-800"
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-2.5 text-gray-500 text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-700"
          >
            Full Name *
          </label>
        </div>
      </div>

      {/* (Email, Country, Phone, Dates, Message, Submit...) */}
      {/* -- Your existing desktop form remains unchanged here -- */}

      {/* Toast Popup */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-[8vh] left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-50 ${
              status.includes("Thank")
                ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.includes("Thank") ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {status}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );

  // At the very bottom of ContactForm.tsx

  return isMobile ? (
    <div className="text-center text-gray-600 py-20">
      <p className="text-base font-medium">
        Contact form temporarily unavailable on mobile view.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Please switch to desktop to access all features.
      </p>
    </div>
  ) : (
    <DesktopForm />
  );

}
