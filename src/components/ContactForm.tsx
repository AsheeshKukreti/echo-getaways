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

export default function ContactForm(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Submit handler (keeps your existing sendInquiry contract)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await sendInquiry({ name, email, phone, message, country, dates });
      setStatus(res.message ?? "Enquiry submitted.");
      if (res.success) {
        setName("");
        setEmail("");
        setCountry("");
        setPhone("");
        setDates("");
        setMessage("");
      }
    } catch (err) {
      console.error("sendInquiry error", err);
      setStatus("Something went wrong — please try again.");
    } finally {
      setLoading(false);
      // auto-hide after a short while
      setTimeout(() => setStatus(null), 4000);
    }
  }

  // Small helper: floating-label input group
  const FieldGroup = ({
    id,
    icon,
    children,
    required = false,
    className = "",
  }: {
    id?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    required?: boolean;
    className?: string;
  }) => (
    <div
      className={`flex items-center bg-white/90 border border-gray-200 rounded-2xl shadow-sm px-3 py-2.5 focus-within:ring-2 focus-within:ring-amber-300 transition ${className}`}
    >
      <div className="text-amber-600 mr-3 flex-shrink-0">{icon}</div>
      <div className="flex-1 relative">{children}</div>
    </div>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto w-full p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-emerald-50 rounded-3xl shadow-lg"
      >
        <h3 className="text-2xl font-serif font-semibold text-emerald-700 mb-4 text-center">
          Send Us a Message
        </h3>

        {/* grid: single column on small, two columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Name */}
          <FieldGroup icon={<User size={18} />}>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              aria-label="Full Name"
              className="peer w-full bg-transparent border-none outline-none placeholder-transparent text-gray-800 text-sm"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-2.5 text-xs text-gray-600 bg-amber-50 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
            >
              Full Name *
            </label>
          </FieldGroup>

          {/* Email */}
          <FieldGroup icon={<Mail size={18} />}>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email"
              className="peer w-full bg-transparent border-none outline-none placeholder-transparent text-gray-800 text-sm"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-2.5 text-xs text-gray-600 bg-amber-50 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
            >
              Email *
            </label>
          </FieldGroup>

          {/* Country */}
          <FieldGroup icon={<Globe size={18} />}>
            <select
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Country"
              className="w-full bg-transparent border-none outline-none text-gray-800 text-sm appearance-none"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
            <label
              htmlFor="country"
              className="absolute left-0 -top-2.5 text-xs text-gray-600 bg-amber-50 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
            >
              Country *
            </label>
          </FieldGroup>

          {/* Phone */}
          <FieldGroup icon={<Phone size={18} />}>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              aria-label="Phone"
              className="w-full bg-transparent border-none outline-none placeholder-transparent text-gray-800 text-sm"
            />
            <label
              htmlFor="phone"
              className="absolute left-0 -top-2.5 text-xs text-gray-600 bg-amber-50 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
            >
              Phone (optional)
            </label>
          </FieldGroup>

          {/* Preferred Dates - span full width on desktop grid but we keep it here as two-col entry */}
          <div className="md:col-span-2">
            <FieldGroup icon={<Calendar size={18} />}>
              <input
                id="dates"
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="Preferred Travel Dates (optional)"
                aria-label="Preferred Travel Dates"
                className="w-full bg-transparent border-none outline-none placeholder-transparent text-gray-800 text-sm"
              />
              <label
                htmlFor="dates"
                className="absolute left-0 -top-2.5 text-xs text-gray-600 bg-amber-50 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
              >
                Preferred Travel Dates (optional)
              </label>
            </FieldGroup>
          </div>

          {/* Message - full width */}
          <div className="md:col-span-2">
            <FieldGroup icon={<MessageSquare size={18} />}>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                aria-label="Message"
                className="w-full bg-transparent border-none outline-none placeholder-transparent text-gray-800 text-sm resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-0 -top-2.5 text-xs text-gray-600 bg-amber-50 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all"
              >
                Tell us about your trip *
              </label>
            </FieldGroup>
          </div>
        </div>

        {/* actions */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:w-auto">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-700 to-emerald-600 hover:opacity-95"
              }`}
            >
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>
          </div>

          <div className="text-sm text-gray-600 text-center md:text-right">
            <div>Or contact us directly:</div>
            <a href="tel:+919876543210" className="text-amber-700 font-medium hover:underline">
              +91 98765 43210
            </a>
          </div>
        </div>
      </form>

      {/* Toast / Status (floating) */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35 }}
            className={`fixed left-1/2 -translate-x-1/2 bottom-8 px-5 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 ${
              status.toLowerCase().includes("thank")
                ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.toLowerCase().includes("thank") ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            <span className="text-sm font-medium">{status}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
