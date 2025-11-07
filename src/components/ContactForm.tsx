import React, { useState } from 'react'
import { sendInquiry } from '../services/contactService'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [dates, setDates] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await sendInquiry({ name, email, phone, message })
    setLoading(false)
    setStatus(res.message)
    if (res.success) {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setCountry('')
      setDates('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="p-3 rounded border" />
        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="p-3 rounded border" />
        <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="p-3 rounded border" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="p-3 rounded border" />
        <input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="Preferred Travel Dates (optional)" className="p-3 rounded border md:col-span-2" />
        <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your trip" className="p-3 rounded border md:col-span-2" />
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-accent text-dark rounded" disabled={loading}>{loading ? 'Sending...' : 'Send Inquiry'}</button>
      </div>
      {status && <div className="mt-3 text-sm">{status}</div>}
    </form>
  )
}
