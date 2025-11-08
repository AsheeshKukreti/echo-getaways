// src/pages/ExperiencesPage.tsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import JourneyCTA from "../components/JourneyCTA";
import ScrollToTopButton from "../components/ScrollToTopButton";

/**
 * ExperiencesPage.tsx
 * - Expandable experience cards (inline "See More" -> shows text + highlights)
 * - Keeps sample itineraries with modal (day-by-day)
 * - Lightweight: expanded content is text-only (fast to load)
 * - AOS + Framer Motion used for polish
 * - All buttons consistent & responsive
 */

/* ---------- Types ---------- */
type Itinerary = {
  id: string;
  title: string;
  daysSummary: string;
  cover: string;
  details: string[];
  highlights?: string[];
  bestTime?: string;
};

type Experience = {
  key: string;
  title: string;
  desc: string;
  img: string;
  long?: string;
  highlights?: string[];
};

/* ---------- Data ---------- */
const EXPERIENCES: Experience[] = [
  {
    key: "cultural",
    title: "Cultural Immersions",
    desc: "Local markets, cooking classes, village walks and living traditions.",
    img: "https://t3.ftcdn.net/jpg/15/77/16/44/240_F_1577164431_6dwtaSUYAeY3fwBvTdnXdhiV6gcE2zxt.jpg",
    long:
      "Dive into local life: guided market walks, hands-on cooking sessions, village homestays, and craft demonstrations that put you in the centre of living culture.",
    highlights: ["Market strolls", "Cooking classes", "Village homestays"],
  },
  {
    key: "wellness",
    title: "Wellness Retreats",
    desc: "Yoga, meditation and Ayurveda programs for body & mind.",
    img: "https://t3.ftcdn.net/jpg/05/81/57/14/240_F_581571425_nQVjqkkm2lbYYARlLmECfrHohRa4pAP4.jpg",
    long:
      "Signature wellness programs blending yoga, meditation, and authentic Ayurvedic therapies — tailored retreats for rest, reset and rejuvenation.",
    highlights: ["Daily yoga", "Ayurvedic consultations", "Detox & spa treatments"],
  },
  {
    key: "adventure",
    title: "Adventure Tours",
    desc: "Trekking, rafting, safaris and desert camping for thrill-seekers.",
    img: "https://t4.ftcdn.net/jpg/04/79/19/09/240_F_479190950_ehyNejlVKUUivATwpT4ZifgWIpUE9FAT.jpg",
    long:
      "From Himalayan treks to white-water rafting and desert camping under the stars — adventures designed for all levels, safely guided by experts.",
    highlights: ["Trekking", "Rafting", "Desert camping"],
  },
  {
    key: "luxury",
    title: "Luxury Escapes",
    desc: "Boutique stays, palace hotels and bespoke royal experiences.",
    img: "https://t3.ftcdn.net/jpg/17/23/83/86/240_F_1723838677_fWkm39ruvYuf1DXVR1hiwgVZZ8qqJyid.jpg",
    long:
      "Curated luxury stays in heritage palaces, boutique hotels and private villas with personalised experiences and concierge services.",
    highlights: ["Palace stays", "Private transfers", "Bespoke dining"],
  },
  {
    key: "spiritual",
    title: "Spiritual Journeys",
    desc: "Varanasi, Rishikesh, Bodhgaya — soulful rituals and pilgrimages.",
    img: "https://t3.ftcdn.net/jpg/12/87/93/16/240_F_1287931641_QXaGaFrHMssexx15FiYLZhp9WgNAidQg.jpg",
    long:
      "Guided spiritual circuits focusing on rituals, pilgrimages and contemplative stays in India's sacred places.",
    highlights: ["Ganga Aarti", "Ashram stays", "Pilgrimage trails"],
  },
  {
    key: "culinary",
    title: "Culinary Trails",
    desc: "From street food to fine dining — flavourful regional trails.",
    img: "https://t4.ftcdn.net/jpg/14/79/20/07/240_F_1479200766_TNNIXaSe8aX5xVS3kY6KxLO8pQrOa1pS.jpg",
    long:
      "Tastings, market tours, chef-led meals and regional food trails celebrating India's incredible diversity of flavours.",
    highlights: ["Street food tours", "Chef table experiences", "Regional tastings"],
  },
];

const ITINERARIES: Itinerary[] = [
  {
    id: "golden-triangle",
    title: "Golden Triangle Tour (6 Nights / 7 Days)",
    daysSummary: "Delhi – Agra – Jaipur",
    cover:
      "https://t4.ftcdn.net/jpg/00/57/34/49/240_F_57344934_px7aizqPZKKtedtgnXcDpid0YwHvrfjW.jpg",
    details: [
      "Day 1: Arrive Delhi — Explore Old & New Delhi, Jama Masjid, India Gate, Qutub Minar.",
      "Day 2: Continue Delhi sightseeing or visit Akshardham Temple. Overnight in Delhi.",
      "Day 3: Drive to Agra — Visit Agra Fort and the Taj Mahal at sunset.",
      "Day 4: Depart for Jaipur via Fatehpur Sikri. En route, stop at the Abhaneri stepwell.",
      "Day 5: Explore Jaipur — Amber Fort, City Palace, Jantar Mantar, and Hawa Mahal.",
      "Day 6: Enjoy a cultural evening with traditional Rajasthani dance and cuisine.",
      "Day 7: Depart from Jaipur or drive back to Delhi.",
    ],
    highlights: ["Heritage walks", "Local cuisine", "Cultural shows"],
    bestTime: "Oct - Mar",
  },
  {
    id: "rajasthan-royal",
    title: "Rajasthan Royal Experience (9 Nights / 10 Days)",
    daysSummary: "Jaipur – Jodhpur – Udaipur – Pushkar",
    cover:
      "https://t4.ftcdn.net/jpg/03/78/60/45/240_F_378604576_i7vceaZnIduxYOmP8NBldfFqk5LZMWKu.jpg",
    details: [
      "Day 1: Arrive in Jaipur – City Palace, Hawa Mahal, and colorful bazaars.",
      "Day 2: Visit Amber Fort and Nahargarh Fort with a sunset view.",
      "Day 3: Drive to Jodhpur – Explore Mehrangarh Fort and the blue old town lanes.",
      "Day 4: Visit Bishnoi Village and experience local crafts.",
      "Day 5: Drive to Udaipur via Ranakpur Jain Temples.",
      "Day 6: Udaipur – City Palace, Lake Pichola boat ride, and Saheliyon Ki Bari.",
      "Day 7: Optional day trip to Kumbhalgarh Fort or Eklingji Temple.",
      "Day 8: Drive to Pushkar – visit the Brahma Temple and the holy lake.",
      "Day 9: Explore local fairs and markets.",
      "Day 10: Return to Jaipur or onward journey.",
    ],
    highlights: ["Palace stays", "Desert camps", "Folk performances"],
    bestTime: "Oct - Mar",
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters & Spice Route (7 Nights / 8 Days)",
    daysSummary: "Cochin – Munnar – Thekkady – Alleppey – Kovalam",
    cover:
      "https://t4.ftcdn.net/jpg/14/94/13/83/240_F_1494138324_tr5oUJTa3KcRs2FysolWUvvH1WOSMQMn.jpg",
    details: [
      "Day 1: Arrive in Cochin – Visit Fort Kochi, Chinese fishing nets, and Kathakali show.",
      "Day 2: Drive to Munnar – Tea plantations, waterfalls, and spice gardens.",
      "Day 3: Munnar sightseeing – Eravikulam National Park and Mattupetty Dam.",
      "Day 4: Proceed to Thekkady – Periyar Wildlife Sanctuary and spice plantations.",
      "Day 5: Transfer to Alleppey – Overnight stay on a traditional houseboat through the backwaters.",
      "Day 6: Drive to Kovalam – Relax on the beach or enjoy Ayurveda massages.",
      "Day 7: Day trip to Trivandrum temples and local shopping.",
      "Day 8: Departure from Trivandrum.",
    ],
    highlights: ["Houseboat cruise", "Tea gardens", "Ayurvedic retreat"],
    bestTime: "Nov - Feb",
  },
  {
    id: "varanasi-khajuraho",
    title: "Varanasi & Khajuraho Heritage Trail (5 Nights / 6 Days)",
    daysSummary: "Varanasi – Sarnath – Khajuraho",
    cover:
      "https://t4.ftcdn.net/jpg/07/88/04/35/240_F_788043528_Y7Dyhhk7hjloP6ViB1gzXi8AhdM2tAlP.jpg",
    details: [
      "Day 1: Arrive in Varanasi – Evening Ganga Aarti at Dashashwamedh Ghat.",
      "Day 2: Morning boat ride on the Ganges and visit Sarnath Buddhist site.",
      "Day 3: Explore local silk weaving and temples; overnight train or flight to Khajuraho.",
      "Day 4: Visit UNESCO-listed Khajuraho temples known for their intricate carvings.",
      "Day 5: Optional day trip to Panna National Park for a wildlife safari.",
      "Day 6: Departure from Khajuraho or return to Delhi.",
    ],
    highlights: ["Ganga Aarti", "Khajuraho temples", "Cultural rituals"],
    bestTime: "Oct - Mar",
  },
];

/* ---------- Animations ---------- */
const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.42 },
  }),
};
const expandVariant = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1, transition: { duration: 0.32 } },
};

/* ---------- Component ---------- */
export default function ExperiencesPage(): JSX.Element {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [openItinerary, setOpenItinerary] = useState<Itinerary | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
    setTimeout(() => {
      const el = document.getElementById(`exp-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  return (
    <main className="min-h-screen bg-[rgb(255,251,244)] text-gray-900">
      {/* Hero */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold leading-tight"
            data-aos="fade-up"
          >
            Crafted Experiences — Travel That Resonates
          </h1>
          <p
            className="mt-3 text-sm sm:text-base md:text-lg text-amber-100 max-w-2xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            Make your journey unforgettable. Cultural immersions, wellness retreats, adventure tours,
            and curated itineraries designed to echo in your heart.
          </p>


          {/* Scrollable Filter Bar */}
          <div
            className="mt-8 flex overflow-x-auto no-scrollbar gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 justify-start sm:justify-center"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            <button
              onClick={() => setFilter(null)}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 min-w-[90px] sm:min-w-[110px] text-xs sm:text-sm rounded-full font-medium transition-all duration-300 ${
                filter === null
                  ? "bg-amber-100 text-amber-800 shadow-md ring-2 ring-amber-300"
                  : "bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:shadow-md"
              }`}
            >
              All
            </button>

            {EXPERIENCES.map((e) => (
              <button
                key={e.key}
                onClick={() => setFilter((f) => (f === e.key ? null : e.key))}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 min-w-[110px] sm:min-w-[130px] text-xs sm:text-sm rounded-full font-medium transition-all duration-300 ${
                  filter === e.key
                    ? "bg-amber-100 text-amber-800 shadow-md ring-2 ring-amber-300"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:shadow-md"
                }`}
              >
                {e.title}
              </button>
            ))}
          </div>


        </div>
      </section>

      {/* Experiences Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2
          className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800 mb-6"
          data-aos="fade-right"
        >
          Signature Experiences
        </h2>
        <p
          className="text-gray-700 mb-8 max-w-3xl text-sm sm:text-base"
          data-aos="fade-right"
          data-aos-delay="60"
        >
          We craft experiences that match your curiosity — cultural, spiritual, adventurous or
          indulgent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">

          {EXPERIENCES.filter((e) => !filter || filter === e.key).map((exp, i) => {
            const isOpen = expandedKey === exp.key;
            return (
              <motion.article
                id={`exp-${exp.key}`}
                key={exp.key}
                className="rounded-2xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-md border border-amber-100 transform hover:-translate-y-1 transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariant}
                custom={i}
              >
                <div className="h-44 w-full overflow-hidden relative group">
                  <img
                    src={exp.img}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold drop-shadow">{exp.title}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-gray-700 mb-3 text-xs sm:text-sm md:text-base leading-relaxed">{exp.desc}</p>

                  <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3">
                    <div className="flex gap-2">
                      <a
                        href="/contact"
                        className="px-3 py-1.5 text-sm rounded-md bg-amber-600 text-white font-medium"
                      >
                        Enquire
                      </a>
                      <button
                        onClick={() => toggleExpand(exp.key)}
                        className="px-3 py-1.5 text-sm rounded-md border text-gray-700"
                      >
                        {isOpen ? "Close" : "See More"}
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        const possible = ITINERARIES.find(
                          (it) => it.id === exp.key || it.id.includes(exp.key.split("-")[0])
                        );
                        if (possible) setOpenItinerary(possible);
                        else {
                          const sample = ITINERARIES.find((it) => it.id === "golden-triangle");
                          if (sample) setOpenItinerary(sample);
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 text-sm rounded-md bg-amber-600 text-white font-medium"
                    >
                      Sample Itinerary
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`exp-panel-${exp.key}`}
                        className="mt-4 overflow-hidden text-gray-700"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={expandVariant}
                      >
                        <div className="pt-3 border-t border-gray-200">
                          <p className="mb-3 text-sm sm:text-base">{exp.long}</p>
                          {exp.highlights?.length ? (
                            <>
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                Highlights
                              </h4>
                              <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                                {exp.highlights.map((h, idx) => (
                                  <li key={idx}>{h}</li>
                                ))}
                              </ul>
                            </>
                          ) : null}
                          <div className="flex flex-wrap gap-2">
                            <a
                              href="/contact"
                              className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-md font-medium"
                            >
                              Plan This Experience
                            </a>
                            <button
                              onClick={() => setExpandedKey(null)}
                              className="px-3 py-1.5 text-sm rounded-md border"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Sample Itineraries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800">
            Sample Travel Itineraries
          </h2>
          <p className="text-sm text-gray-600">Open any card to view full day-by-day details.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">

          {ITINERARIES.map((it, idx) => (
            <motion.article
              key={it.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-white/75 backdrop-blur-md border border-amber-100 transform hover:-translate-y-1 transition cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariant}
              custom={idx}
              onClick={() => setOpenItinerary(it)}
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={it.cover}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-1">
                  {it.title}
                </h3>
                <p className="text-gray-700 text-sm mb-2">{it.daysSummary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {it.bestTime ? `Best: ${it.bestTime}` : ""}
                  </span>
                  <button className="px-3 py-1.5 text-xs sm:text-sm bg-amber-600 text-white rounded-md font-medium">
                    View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {openItinerary && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenItinerary(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden w-full max-w-[95%] sm:max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start p-4 border-b">
                <h3 className="text-lg sm:text-2xl font-serif text-amber-700 font-semibold">
                  {openItinerary.title}
                </h3>
                <button
                  onClick={() => setOpenItinerary(null)}
                  aria-label="Close itinerary"
                  className="text-gray-600 hover:text-gray-900 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 sm:p-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <img
                    src={openItinerary.cover}
                    alt={openItinerary.title}
                    className="w-full h-48 sm:h-56 object-cover rounded-md mb-4"
                  />
                  {openItinerary.highlights && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Highlights</h4>
                      <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                        {openItinerary.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    Best Time: {openItinerary.bestTime}
                  </p>
                </div>

                <div>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm">
                    {openItinerary.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ol>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href="/contact"
                      className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-md font-medium"
                    >
                      Plan This Trip
                    </a>
                    <button
                      onClick={() => setOpenItinerary(null)}
                      className="px-3 py-1.5 text-sm rounded-md border"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA + Scroll */}
      <JourneyCTA />
      <ScrollToTopButton />
    </main>
  );
}
