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
} from "lucide-react";

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

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Shared submit logic
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
  }

  // ✅ MOBILE FORM DESIGN
  const MobileForm = () => (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-gradient-to-b from-amber-50 to-emerald-50 p-4 rounded-3xl shadow-inner"
    >
      {[ 
        { icon: <User />, placeholder: "Full Name *", val: name, setVal: setName, type: "text" },
        { icon: <Mail />, placeholder: "Email *", val: email, setVal: setEmail, type: "email" },
        { icon: <Globe />, placeholder: "Country *", val: country, setVal: setCountry, type: "text" },
        { icon: <Phone />, placeholder: "Phone (optional)", val: phone, setVal: setPhone, type: "text" },
        { icon: <Calendar />, placeholder: "Preferred Travel Dates (optional)", val: dates, setVal: setDates, type: "text" },
      ].map((field, i) => (
        <div
          key={i}
          className="flex items-center bg-white rounded-2xl shadow-md px-3 py-3 border border-gray-200 focus-within:border-amber-400 transition"
        >
          <span className="text-amber-600 mr-3">{field.icon}</span>
          <input
            required={field.placeholder.includes("*")}
            type={field.type}
            value={field.val}
            onChange={(e) => field.setVal(e.target.value)}
            placeholder={field.placeholder}
            className="w-full text-gray-800 text-base bg-transparent focus:outline-none"
          />
        </div>
      ))}

      {/* Message */}
      <div className="flex items-start bg-white rounded-2xl shadow-md px-3 py-3 border border-gray-200 focus-within:border-amber-400 transition">
        <MessageSquare className="text-amber-600 mt-1 mr-3" />
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your travel ideas..."
          className="w-full text-gray-800 text-base bg-transparent focus:outline-none resize-none"
        />
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className={`w-full py-3 mt-2 rounded-full text-white font-semibold text-lg shadow-md transition-all duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-amber-700 to-emerald-600 hover:opacity-90"
        }`}
      >
        {loading ? "Sending..." : "Start My Journey"}
      </button>

      {/* Status */}
      {status && (
        <div
          className={`mt-3 p-3 rounded-xl text-sm font-medium text-center shadow-sm ${
            status.includes("Thank")
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );

  // ✅ DESKTOP FORM (Your original layout preserved)
  const DesktopForm = () => (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto px-4 sm:px-0 space-y-5 sm:space-y-6"
    >
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
            className="peer w-full border-none bg-transparent placeholder-transparent focus:outline-none focus:ring-0 text-gray-800"
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-700"
          >
            Full Name *
          </label>
        </div>
      </div>

      {/* Email */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-3 flex items-center">
        <Mail className="text-amber-700 w-5 h-5 mr-3" />
        <div className="relative w-full group">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full border-none bg-transparent placeholder-transparent focus:outline-none focus:ring-0 text-gray-800"
          />
          <label
            htmlFor="email"
            className="absolute left-0 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-700"
          >
            Email *
          </label>
        </div>
      </div>

      {/* Country */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-3 flex items-center">
        <Globe className="text-amber-700 w-5 h-5 mr-3" />
        <div className="relative w-full group">
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="peer w-full border-none bg-transparent focus:outline-none focus:ring-0 text-gray-800 appearance-none"
          >
            <option value="">Select Country *</option>
            <option value="India">India</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Phone */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-3 flex items-center">
        <Phone className="text-amber-700 w-5 h-5 mr-3" />
        <div className="relative w-full group">
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder=" "
            className="peer w-full border-none bg-transparent placeholder-transparent focus:outline-none focus:ring-0 text-gray-800"
          />
          <label
            htmlFor="phone"
            className="absolute left-0 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-700"
          >
            Phone (optional)
          </label>
        </div>
      </div>

      {/* Dates */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-3 flex items-center">
        <Calendar className="text-amber-700 w-5 h-5 mr-3" />
        <div className="relative w-full group">
          <input
            id="dates"
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            placeholder=" "
            className="peer w-full border-none bg-transparent placeholder-transparent focus:outline-none focus:ring-0 text-gray-800"
          />
          <label
            htmlFor="dates"
            className="absolute left-0 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-700"
          >
            Preferred Travel Dates (optional)
          </label>
        </div>
      </div>

      {/* Message */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-3 flex items-start">
        <MessageSquare className="text-amber-700 w-5 h-5 mt-1 mr-3" />
        <div className="relative w-full group">
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder=" "
            className="peer w-full border-none bg-transparent placeholder-transparent focus:outline-none focus:ring-0 text-gray-800 resize-none"
          />
          <label
            htmlFor="message"
            className="absolute left-0 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-700"
          >
            Tell us about your trip *
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-3">
        <button
          disabled={loading}
          className={`w-full sm:w-auto px-10 py-3 rounded-full font-semibold tracking-wide shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-700 to-emerald-600 text-white hover:opacity-90 hover:shadow-lg"
          }`}
        >
          {loading ? "Sending..." : "Start My Journey"}
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm font-medium text-center shadow transition-all duration-300 ${
            status.includes("Thank")
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );

  return isMobile ? <MobileForm /> : <DesktopForm />;
}
