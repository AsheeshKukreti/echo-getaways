// src/components/ServicesShowcase.tsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Building2,
  Bus,
  TrainFront,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * ServicesShowcase.tsx
 * - Combines an Icon Grid (quick snapshot of services) + a lightweight Carousel
 * - Matches amber -> emerald translucent theme used across the site
 * - No new external deps (uses framer-motion which you already have)
 *
 * Usage: import and place <ServicesShowcase /> on HomePage (recommended between USP and Testimonials)
 */

const SERVICES = [
  {
    key: "flights",
    icon: <Plane size={20} className="text-amber-600" />,
    title: "Flight Bookings",
    desc: "Seamless domestic & international ticketing",
    img: "https://images.unsplash.com/photo-1516354983877-1f92c5f1b4b0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "hotels",
    icon: <Building2 size={20} className="text-amber-600" />,
    title: "Hotel Stays",
    desc: "Curated boutique & luxury accommodations",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "transfers",
    icon: <Bus size={20} className="text-amber-600" />,
    title: "Private Transfers",
    desc: "Comfortable airport pickups & private cars",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "train",
    icon: <TrainFront size={20} className="text-amber-600" />,
    title: "Rail Journeys",
    desc: "Scenic rail routes & express reservations",
    img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "itinerary",
    icon: <MapPin size={20} className="text-amber-600" />,
    title: "Itinerary Planning",
    desc: "Tailor-made routes crafted by experts",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "sightseeing",
    icon: <Camera size={20} className="text-amber-600" />,
    title: "Sightseeing & Excursions",
    desc: "Guided day tours & memorable experiences",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function ServicesShowcase(): JSX.Element {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % SERVICES.length);
    }, 5000) as unknown as number;
  }

  function stopAutoplay() {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function goTo(i: number) {
    setIndex((i + SERVICES.length) % SERVICES.length);
    startAutoplay();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Icon Grid */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800 mb-4">
            Our Travel Expertise
          </h3>
          <p className="text-gray-700 mb-6 max-w-xl">
            From flights and hotels to curated itineraries and unique excursions —
            Echo Getaways offers end-to-end travel services crafted with warmth
            and care.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <article
                key={s.key}
                onMouseEnter={() => {
                  const i = SERVICES.findIndex((x) => x.key === s.key);
                  setIndex(i);
                }}
                onFocus={() => {
                  const i = SERVICES.findIndex((x) => x.key === s.key);
                  setIndex(i);
                }}
                className="group cursor-pointer rounded-2xl p-4 bg-white/70 backdrop-blur-md border border-amber-50 shadow-sm hover:shadow-lg transition-all duration-300"
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-amber-50 ring-1 ring-amber-100">
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {s.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{s.desc}</p>
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
              Plan My Trip
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/40 to-white/10 border border-white/20 shadow-lg"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

                  <div className="absolute left-6 right-6 bottom-6 text-white">
                    <h4 className="text-xl sm:text-2xl font-semibold drop-shadow">
                      {s.title}
                    </h4>
                    <p className="text-sm sm:text-base max-w-lg mt-1 drop-shadow">
                      {s.desc}
                    </p>
                    <div className="mt-4">
                      <a
                        href="/contact"
                        className="inline-block px-4 py-2 rounded-full bg-amber-500/90 hover:bg-amber-600 transition font-medium text-sm"
                      >
                        Plan This
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Carousel controls */}
            <button
              aria-label="Previous"
              onClick={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              aria-label="Next"
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === index ? "bg-amber-600 scale-125" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
