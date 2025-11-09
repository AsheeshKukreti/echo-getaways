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
} from "lucide-react";
import { sendInquiry } from "../services/contactService";

// 🧩 Memoized Input Wrapper to prevent unnecessary re-renders
const Field = memo(function Field({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm px-3 py-2.5 focus-within:ring-2 focus-within:ring-amber-300 transition-all duration-200">
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

  // Form submit logic
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
      if (res.success)
        setForm({
          name: "",
          email: "",
          country: "",
          phone: "",
          dates: "",
          tripType: "",
          message: "",
        });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending your message. Please retry.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-3xl mx-auto w-full px-4 py-8 sm:p-10 bg-gradient-to-b from-amber-100/70 to-emerald-100/70 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl"
    >
      <h3 className="text-3xl font-serif font-semibold text-emerald-800 mb-8 text-center">
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
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm placeholder-gray-500 focus:ring-0"
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
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm placeholder-gray-500 focus:ring-0"
          />
        </Field>

        <Field icon={<Globe size={18} />}>
          <select
            name="country"
            required
            value={form.country}
            onChange={handleChange}
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm appearance-none focus:ring-0"
          >
            <option value="">Select Country *</option>
            <option value="India">India</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field icon={<Phone size={18} />}>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm placeholder-gray-500 focus:ring-0"
          />
        </Field>

        <Field icon={<Calendar size={18} />}>
          <input
            name="dates"
            type="text"
            value={form.dates}
            onChange={handleChange}
            placeholder="Preferred Travel Dates (optional)"
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm placeholder-gray-500 focus:ring-0"
          />
        </Field>

        <Field icon={<MapPin size={18} />}>
          <select
            name="tripType"
            value={form.tripType}
            onChange={handleChange}
            className="w-full bg-transparent border-none outline-none text-gray-800 text-sm appearance-none focus:ring-0"
          >
            <option value="">Select Trip Type (optional)</option>
            <option value="Cultural">Cultural Immersion</option>
            <option value="Adventure">Adventure Escape</option>
            <option value="Luxury">Luxury Experience</option>
            <option value="Wellness">Wellness Retreat</option>
            <option value="Spiritual">Spiritual Journey</option>
          </select>
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
              className="w-full bg-transparent border-none outline-none text-gray-800 text-sm resize-none placeholder-gray-500 focus:ring-0"
            />
          </Field>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`px-10 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-700 to-emerald-600 hover:opacity-90 hover:shadow-lg hover:scale-[1.02]"
          }`}
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-[7vh] left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-50 ${
              status.startsWith("✨")
                ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.startsWith("✨") ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {status}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
