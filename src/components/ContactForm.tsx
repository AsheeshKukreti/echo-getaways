// src/components/ContactForm.tsx
import React, { useState } from "react";
import { sendInquiry } from "../services/contactService";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

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
      setPhone("");
      setMessage("");
      setCountry("");
      setDates("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto px-4 sm:px-0"
    >
      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Name */}
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name *"
          className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800 placeholder-gray-400"
        />

        {/* Email */}
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800 placeholder-gray-400"
        />

        {/* Country (Dropdown) */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800 placeholder-gray-400 appearance-none pr-8 bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-right-3 bg-[length:12px_12px]"
        >
          <option value="">Select Country *</option>
          <option value="India">India</option>
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Other">Other</option>
        </select>

        {/* Phone */}
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800 placeholder-gray-400"
        />

        {/* Dates */}
        <input
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          placeholder="Preferred Travel Dates (optional)"
          className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800 placeholder-gray-400 sm:col-span-2"
        />

        {/* Message */}
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your trip *"
          rows={5}
          className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800 placeholder-gray-400 sm:col-span-2"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 mb-24 text-center">
        <button
          disabled={loading}
          className={`w-full sm:w-auto px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-600 to-emerald-600 text-white hover:opacity-90 hover:shadow-lg"
          }`}
        >
          {loading ? "Sending..." : "Send Inquiry"}
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-4 text-sm font-medium text-center transition-all duration-300 ${
            status.includes("Thank")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );
}
