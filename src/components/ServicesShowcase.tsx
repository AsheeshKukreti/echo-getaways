// src/components/ServicesShowcase.tsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Airplay,
  Building,
  Truck,
  Train,
  MapPin,
  Camera,
  Shield,
} from "lucide-react";

/**
 * ServicesShowcase.tsx
 * Icon grid (left) + auto-rotating hero (right) + detail modal on click.
 * - No arrows on the hero
 * - Auto-rotates until user interacts
 * - Clicking a service opens a pop-out; closing resumes auto-rotation
 */

const SERVICES = [
  {
    key: "flights",
    icon: <Airplay size={20} className="text-amber-600" />,
    title: "Air Tickets",
    short: "We make air travel effortless with smart routing and curated fares.",
    img: "https://images.unsplash.com/photo-1516354983877-1f92c5f1b4b0?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Best fares across major airlines",
      "Economy, Premium, Business & First Class",
      "Instant and secure e-ticketing",
      "Help with baggage, seats & special requests",
    ],
    tagline: "Fly smarter with Echo Getaways — we handle the logistics, you enjoy the journey.",
    cta: "Plan My Flight",
  },
  {
    key: "hotels",
    icon: <Building size={20} className="text-amber-600" />,
    title: "Hotel Bookings",
    short:
      "We match your style and budget with stays that feel just right — boutique, heritage or luxury.",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Boutique, heritage & luxury properties",
      "Options near key attractions & business hubs",
      "Flexible cancellation & no-surprise pricing",
      "Special occasion setups (honeymoons, birthdays, anniversaries)",
    ],
    tagline:
      "From quaint homestays to grand palaces, we help you wake up in the right place every day.",
    cta: "Plan My Stay",
  },
  {
    key: "transfers",
    icon: <Truck size={20} className="text-amber-600" />,
    title: "Ground Transport",
    short:
      "From airport transfers to full-day sightseeing, travel in comfort with trusted chauffeurs.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Sedans, SUVs & premium cars",
      "Tempo travellers, Urbania & coaches",
      "Airport pickups & drops with live coordination",
      "Intercity & local day usage with curated routes",
    ],
    tagline:
      "Clean vehicles, reliable drivers and routes designed around your comfort and timing.",
    cta: "Plan My Drive",
  },
  {
    key: "train",
    icon: <Train size={20} className="text-amber-600" />,
    title: "Train Tickets",
    short: "Scenic, budget-friendly journeys across key routes in India.",
    img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Bookings across major Indian rail networks",
      "AC, Sleeper & Chair Car options",
      "PNR monitoring & waitlist tracking guidance",
      "Multi-city / long-distance route planning",
    ],
    tagline:
      "We handle the details so you can simply enjoy the rhythm of the rails and changing landscapes.",
    cta: "Plan My Rail Journey",
  },
  {
    key: "itinerary",
    icon: <MapPin size={20} className="text-amber-600" />,
    title: "Custom Itineraries",
    short:
      "End-to-end inbound & outbound travel design crafted around your pace, interests and comfort.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Personalised routing, day-wise plans & suggestions",
      "Balanced travel time vs experiences",
      "Options for families, couples, solo travellers & groups",
      "On-trip support for tweaks and last-minute ideas",
    ],
    tagline:
      "Every journey is sketched from scratch so it feels like it was always meant for you.",
    cta: "Design My Trip",
  },
  {
    key: "sightseeing",
    icon: <Camera size={20} className="text-amber-600" />,
    title: "Sightseeing & Excursions",
    short:
      "Guided day tours, local walks and special experiences that bring each destination alive.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "City highlights & neighbourhood walks",
      "Spiritual, cultural, food & heritage trails",
      "Sunrise / sunset and off-beat experiences",
      "Private and small-group options",
    ],
    tagline:
      "See more than just the postcard spots — meet people, stories and flavours along the way.",
    cta: "Plan My Experience",
  },
  {
    key: "visa",
    icon: <MapPin size={20} className="text-amber-600" />,
    title: "Visa Assistance",
    short:
      "Practical guidance for tourist visas to key global destinations so paperwork feels lighter.",
    img: "https://images.unsplash.com/photo-1516442719524-a603408c90cb?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Document checklist & form-filling support",
      "Appointment scheduling guidance where required",
      "Status tracking & follow-up guidance",
      "Best-practice tips to avoid common mistakes",
    ],
    tagline:
      "We help you navigate the fine print so you can focus on planning the fun parts of your trip.",
    cta: "Discuss My Visa",
  },
  {
    key: "insurance",
    icon: <Shield size={20} className="text-amber-600" />,
    title: "Travel Insurance",
    short:
      "Protect your journey against medical emergencies, delays and other unexpected events.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Comprehensive medical & emergency coverage options",
      "Trip delay, cancellation & baggage cover choices",
      "Single-trip, annual and family plans",
      "Guidance on policy selection & claim process",
    ],
    tagline:
      "Travel with a safety net — so even if plans change, support is always close at hand.",
    cta: "Secure My Trip",
  },
];

export default function ServicesShowcase(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [activeDetail, setActiveDetail] = useState<(typeof SERVICES)[number] | null>(null);
  const autoplayRef = useRef<number | null>(null);

  // Auto-rotation control
  useEffect(() => {
    if (autoplayPaused) {
      stopAutoplay();
      return;
    }
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayPaused]);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % SERVICES.length);
    }, 5000) as unknown as number;
  }

  function stopAutoplay() {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  // Move carousel index
  function goTo(i: number, pause: boolean) {
    const safeIndex = (i + SERVICES.length) % SERVICES.length;
    setIndex(safeIndex);
    if (pause) setAutoplayPaused(true);
  }

  // Detail pop-out
  function openDetail(i: number) {
    const svc = SERVICES[i];
    setIndex(i);
    setActiveDetail(svc);
    setAutoplayPaused(true);
  }

  function closeDetail() {
    setActiveDetail(null);
    setAutoplayPaused(false); // resume auto-rotation
  }

  const current = SERVICES[index];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT: Icon Grid */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800 mb-4">
            End-to-End Travel Services
          </h3>
          <p className="text-gray-700 mb-6 max-w-xl">
            From tickets and stays to visas and insurance, Echo Getaways manages
            the moving parts so you can stay present in the journey.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <article
                key={s.key}
                onMouseEnter={() => goTo(i, false)} // just sync hero, keep autoplay
                onClick={() => openDetail(i)} // open detail pop-out
                onKeyDown={(e) => e.key === "Enter" && openDetail(i)}
                className={`group cursor-pointer rounded-2xl p-4 bg-white/70 backdrop-blur-md border shadow-sm transition-all duration-300 ${
                  i === index
                    ? "border-amber-400 shadow-lg -translate-y-1"
                    : "border-amber-50 hover:shadow-md hover:-translate-y-[2px]"
                }`}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ring-1 transition ${
                      i === index
                        ? "bg-amber-100 ring-amber-300"
                        : "bg-amber-50 ring-amber-100"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {s.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {s.short}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-emerald-600 text-white font-medium shadow hover:opacity-95 transition"
            >
              Plan My Complete Trip
            </a>
          </div>
        </div>

        {/* RIGHT: Auto-rotating hero (NO arrows) */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/40 to-white/10 border border-white/20 shadow-lg"
            onMouseEnter={() => setAutoplayPaused(true)}
            onMouseLeave={() => {
              if (!activeDetail) setAutoplayPaused(false);
            }}
          >
            <div className="h-56 sm:h-72 md:h-80 lg:h-96 w-full relative">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: i === index ? 1 : 0,
                    x: i === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 w-full h-full ${
                    i === index ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  aria-hidden={i === index ? "false" : "true"}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/10" />

                  <div className="absolute left-6 right-6 bottom-6 text-white">
                    {/* label pill */}
                    <span className="inline-flex items-center px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-white/90 text-amber-700 shadow-sm">
                      {s.title}
                    </span>
                    <p className="text-sm sm:text-base max-w-lg mt-1 drop-shadow">
                      {s.short}
                    </p>
                    <ul className="mt-3 text-xs sm:text-sm space-y-1.5 max-w-lg">
                      {s.bullets.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-1.5">
                          <span className="mt-[6px] block w-1 h-1 rounded-full bg-amber-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openDetail(SERVICES.findIndex((x) => x.key === s.key))
                        }
                        className="inline-block px-4 py-2 rounded-full bg-amber-500/90 hover:bg-amber-600 transition font-medium text-sm"
                      >
                        {s.cta}
                      </button>
                      <a
                        href="/contact"
                        className="inline-block px-4 py-2 rounded-full bg-white/15 border border-white/40 text-xs sm:text-sm font-medium hover:bg-white/25 transition"
                      >
                        Talk to a Travel Expert
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dots only (no arrows) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, true)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === index
                      ? "bg-amber-500 scale-125"
                      : "bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL POP-OUT MODAL */}
      <AnimatePresence>
        {activeDetail && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-xl w-full bg-[rgb(255,251,244)] rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative h-40 w-full">
                <img
                  src={activeDetail.img}
                  alt={activeDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
                <div className="absolute left-5 right-5 bottom-4 text-white">
                  <span className="inline-flex items-center px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-white/90 text-amber-700 shadow-sm">
                    {activeDetail.title}
                  </span>
                  <p className="text-sm">{activeDetail.tagline}</p>
                </div>
              </div>

              <div className="p-5 space-y-3 text-sm text-gray-800">
                <p>{activeDetail.short}</p>
                <ul className="list-none space-y-1.5">
                  {activeDetail.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 flex flex-wrap gap-3 justify-between items-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-emerald-600 text-white text-sm font-semibold shadow hover:opacity-95 transition"
                  >
                    {activeDetail.cta}
                  </a>
                  <button
                    type="button"
                    onClick={closeDetail}
                    className="text-xs font-medium text-gray-500 hover:text-amber-700 underline"
                  >
                    Close & resume carousel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
