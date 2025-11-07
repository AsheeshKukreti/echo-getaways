// src/pages/DestinationsPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import JourneyCTA from "../components/JourneyCTA";
import ScrollToTopButton from "../components/ScrollToTopButton";
import mapImage from "../assets/images/map.avif";

/**
 * DestinationsPage.tsx
 * Echo Getaways — Full Cinematic Destinations Page
 *
 * NOTE: Preserves all original functionality (map, region toggles, Golden Triangle special case,
 * modals, ESC handling, keyboard interactions). Visuals updated so button sizes and spacing match
 * the ExperiencesPage (consistent, smaller buttons).
 */

/* --------------------------
   Types
---------------------------*/
type Circuit = {
  id: string;
  title: string;
  cover: string;
  short: string;
  bestTime?: string;
  highlights?: string[];
  categories?: string[];
};

type Region = {
  key: "north" | "south" | "east" | "west";
  title: string;
  intro: string;
  bg?: string;
  circuits: Circuit[];
};

/* --------------------------
   Data: Regions & Circuits
   (unchanged from your provided data)
---------------------------*/
const REGIONS: Region[] = [
  {
    key: "north",
    title: "North India — Land of Majesty & Faith",
    intro:
      "From the Golden Triangle's palaces to Himalayan foothills — temples, history, and spiritual paths.",
    bg:
      "https://t3.ftcdn.net/jpg/02/84/32/64/240_F_284326433_Ggp5NfXyYYA8TTxWcgwgmn9hgJUTS1WZ.jpg",
    circuits: [
      {
        id: "golden-triangle",
        title: "Golden Triangle (Delhi – Agra – Jaipur)",
        cover:
          "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80",
        short:
          "A classic circuit of India’s iconic monuments — the Taj Mahal, Mughal grandeur, and pink-city palaces.",
        bestTime: "Oct - Mar",
        highlights: ["Taj Mahal at sunrise", "Amber Fort sunset", "Street food in Old Delhi"],
        categories: ["Cultural"],
      },
      {
        id: "rishikesh-himalayas",
        title: "Rishikesh & the Himalayas",
        cover:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
        short: "Gateway to mountain treks, yoga, and river rituals along the Ganges.",
        bestTime: "Mar - Jun, Sep - Nov",
        highlights: ["Morning yoga on the banks", "White-water rafting", "Himalayan treks"],
        categories: ["Mountains", "Spiritual"],
      },
      {
        id: "amritsar-punjab",
        title: "Amritsar & the Punjab Heritage Trail",
        cover:
          "https://images.unsplash.com/photo-1542377286-6b1f1d73e6ec?auto=format&fit=crop&w=1600&q=80",
        short: "Spiritual heart with the Golden Temple and vibrant Punjabi hospitality.",
        bestTime: "Oct - Mar",
        highlights: ["Golden Temple at night", "Wagah Border ceremony", "Punjabi cuisine"],
        categories: ["Cultural", "Spiritual"],
      },
    ],
  },
  {
    key: "south",
    title: "South India — Lush Backwaters & Timeless Temples",
    intro:
      "Coconut-lined coasts, serene backwaters, and centuries-old temples — a calm, sensory escape.",
    bg:
      "https://t3.ftcdn.net/jpg/02/84/32/64/240_F_284326433_Ggp5NfXyYYA8TTxWcgwgmn9hgJUTS1WZ.jpg",
    circuits: [
      {
        id: "kerala-backwaters",
        title: "Kerala Backwaters & Ayurveda",
        cover:
          "https://images.unsplash.com/photo-1505765051869-5b8a0fef29b1?auto=format&fit=crop&w=1600&q=80",
        short: "Houseboat cruises, spice gardens, and rejuvenating Ayurvedic retreats.",
        bestTime: "Nov - Feb",
        highlights: ["Houseboat night", "Ayurvedic treatments", "Cochin cultural walk"],
        categories: ["Beaches", "Wellness"],
      },
      {
        id: "tamil-temples",
        title: "Tamil Nadu Temples & Heritage",
        cover:
          "https://images.unsplash.com/photo-1516685018646-5496c14b0b7d?auto=format&fit=crop&w=1600&q=80",
        short: "Dravidian temple architecture, classical arts, and temple festivals.",
        bestTime: "Oct - Mar",
        highlights: ["Meenakshi Temple", "Brihadeeswarar Temple", "Classical dance"],
        categories: ["Cultural", "Spiritual"],
      },
      {
        id: "coorg-wayanad",
        title: "Coorg, Wayanad & Western Ghats",
        cover:
          "https://images.unsplash.com/photo-1549887534-7d04e0abf1f2?auto=format&fit=crop&w=1600&q=80",
        short: "Coffee estates, green hills, and misty treks in South India’s highlands.",
        bestTime: "Oct - Mar",
        highlights: ["Coffee plantation tours", "Waterfall hikes", "Birdwatching"],
        categories: ["Mountains"],
      },
    ],
  },
  {
    key: "east",
    title: "East India — Culture, Tea & Tribal Traditions",
    intro:
      "Kolkata's colonial charm, Odisha’s temples, and Darjeeling’s tea gardens — an evocative cultural tapestry.",
    bg:
      "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=1800&q=80",
    circuits: [
      {
        id: "kolkata-city",
        title: "Kolkata — The City of Joy",
        cover:
          "https://images.unsplash.com/photo-1505765051869-5b8a0fef29b1?auto=format&fit=crop&w=1600&q=80",
        short: "Colonial architecture, literary culture, and vibrant arts scenes.",
        bestTime: "Oct - Mar",
        highlights: ["Victoria Memorial", "Durga Puja (seasonal)", "Iconic sweets"],
        categories: ["Cultural"],
      },
      {
        id: "odisha-temples",
        title: "Odisha — Temples & Tribal Culture",
        cover:
          "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=1400&q=80",
        short: "Ancient temples, coastal traditions, and living tribal arts.",
        bestTime: "Oct - Feb",
        highlights: ["Konark Sun Temple", "Puri rituals", "Handloom villages"],
        categories: ["Cultural", "Spiritual"],
      },
      {
        id: "darjeeling-northeast",
        title: "Darjeeling & North-East India",
        cover:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1600&q=80",
        short: "Tea gardens, Himalayan vistas, and rich indigenous cultures.",
        bestTime: "Mar - May, Sep - Nov",
        highlights: ["Toy train ride", "Tea estate walks", "Kanchenjunga views"],
        categories: ["Mountains", "Cultural"],
      },
    ],
  },
  {
    key: "west",
    title: "West India — Coasts, Cities & Royal Heritage",
    intro:
      "Mumbai’s energy, Goa’s beaches, and Rajasthan’s forts — dynamic contrasts and colorful heritage.",
    bg:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    circuits: [
      {
        id: "mumbai-goa",
        title: "Mumbai & Goa",
        cover:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        short: "Dynamic city life, coastal beaches, and seaside relaxation.",
        bestTime: "Nov - Feb",
        highlights: ["Gateway of India", "Goa evenings", "Seafood trails"],
        categories: ["Beaches", "Cultural"],
      },
      {
        id: "rajasthan-royal",
        title: "Rajasthan — Royal Forts & Deserts",
        cover:
          "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
        short: "Palaces, desert safaris, and vivid bazaars echoing royal legacies.",
        bestTime: "Oct - Mar",
        highlights: ["Amber Fort", "Pushkar fair (seasonal)", "Desert camps"],
        categories: ["Cultural"],
      },
      {
        id: "gujarat-wildlife",
        title: "Gujarat — Culture & Wildlife",
        cover:
          "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
        short: "Historic temples, colorful crafts, and wildlife sanctuaries.",
        bestTime: "Oct - Feb",
        highlights: ["Gir National Park", "Rann of Kutch (seasonal)", "Handicraft villages"],
        categories: ["Cultural", "Wildlife"],
      },
    ],
  },
];

/* --------------------------
   Animation Variants
---------------------------*/
const regionVariants = {
  collapsed: { opacity: 0, height: 0, transition: { duration: 0.45 } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55 } }),
};

/* --------------------------
   Reusable RegionPanel component
   (keeps keyboard handlers & accessibility)
---------------------------*/
function RegionPanel({
  region,
  visible,
  onOpenCircuit,
}: {
  region: Region;
  visible: boolean;
  onOpenCircuit: (c: Circuit) => void;
}) {
  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl my-10"
      variants={regionVariants}
      initial="collapsed"
      animate={visible ? "open" : "collapsed"}
      data-aos="fade-up"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${region.bg})` }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-amber-800 mb-3">{region.title}</h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-xl">{region.intro}</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                onClick={() => document.getElementById(`${region.key}-circuits`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="px-3 py-1.5 text-sm rounded-md bg-amber-600 text-white font-medium shadow"
              >
                Explore {region.title.split(" — ")[0]}
              </button>
              <a href="/contact" className="px-3 py-1.5 text-sm rounded-md border border-amber-200 text-amber-700 bg-white/80 font-medium">
                Talk to an Expert
              </a>
            </div>
          </div>

          <div className="hidden md:block bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-inner border border-amber-100">
            <h4 className="text-sm font-semibold text-amber-700 mb-2">Essence</h4>
            <ul className="text-gray-800 space-y-2">
              {region.circuits.slice(0, 3).map((c) => (
                <li key={c.id} className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span className="font-medium">{c.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id={`${region.key}-circuits`}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"

        >

          {region.circuits.map((c, i) => (
            <motion.article
              key={c.id}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-md border border-amber-100 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition duration-300"

              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => onOpenCircuit(c)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onOpenCircuit(c)}
            >
              <div className="h-48 w-full overflow-hidden relative group">
                <img src={c.cover} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transform transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold drop-shadow">{c.title}</h4>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-700 text-base leading-relaxed">{c.short}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{c.bestTime ? `Best: ${c.bestTime}` : ""}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCircuit(c);
                    }}
                    className="px-3 py-1.5 text-sm rounded-md bg-amber-600 text-white font-medium"
                  >
                    Discover
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* --------------------------
   Main DestinationsPage
---------------------------*/
export default function DestinationsPage(): JSX.Element {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  // "all" | "north" | "south" | "east" | "west"
  const [activeRegion, setActiveRegion] = useState<"all" | Region["key"]>("all");

  // modal states
  const [openCircuit, setOpenCircuit] = useState<Circuit | null>(null);
  const [openItinerary, setOpenItinerary] = useState<Circuit | null>(null);

  // top ref for scroll
  const topRef = useRef<HTMLDivElement | null>(null);

  const visibleRegions = useMemo(() => {
    return activeRegion === "all" ? REGIONS : REGIONS.filter((r) => r.key === activeRegion);
  }, [activeRegion]);

  // Handlers
  const handleRegionToggle = (key: "all" | Region["key"]) => {
    setActiveRegion(key);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  const openCircuitModal = (c: Circuit) => {
    // For golden-triangle, open itinerary modal instead (special behavior)
    if (c.id === "golden-triangle") {
      setOpenItinerary(c);
    } else {
      setOpenCircuit(c);
    }
    document.body.style.overflow = "hidden";
  };

  const closeCircuitModal = () => {
    setOpenCircuit(null);
    document.body.style.overflow = "";
  };

  const closeItineraryModal = () => {
    setOpenItinerary(null);
    document.body.style.overflow = "";
  };

  // handle ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openCircuit) closeCircuitModal();
        if (openItinerary) closeItineraryModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openCircuit, openItinerary]);

  // Interactive SVG map click handler (toggles region filter)
  const handleMapClick = (key: Region["key"]) => {
    setActiveRegion((prev) => (prev === key ? "all" : key));
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  return (
    <main className="min-h-screen bg-[rgb(255,251,244)] text-gray-900">
      {/* Top hero + controls */}
      {/* Top hero + controls */}
      {/* Top hero + dynamic region background */}
      {/* Top hero + controls (REPLACE ENTIRE existing hero div with this block) */}
      {/* Hero Section — Explore India */}
      {/* Hero Section — Dynamic Cinematic Header */}
      <div
        ref={topRef}
        className="relative pt-28 md:pt-32 pb-16 text-white overflow-hidden transition-all duration-700 ease-in-out"
      >
        {/* Dynamic Background Image */}
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${
              REGIONS.find((r) => r.key === activeRegion)?.bg ||
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
            }')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-800/70 to-amber-700/80 mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            key={`title-${activeRegion}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold drop-shadow-lg leading-tight"
          >
            Explore India — Curated Travel Circuits
          </motion.h1>

          <motion.p
            key={`intro-${activeRegion}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-amber-100 max-w-2xl mx-auto drop-shadow leading-relaxed"
          >
            {REGIONS.find((r) => r.key === activeRegion)?.intro ||
              "Choose a region or click the map to begin your cinematic journey."}
          </motion.p>


          {/* Controls + Map Inline */}
          <div className="mt-8 flex flex-col sm:flex-wrap md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 px-3 sm:px-6">

            {/* Region Buttons */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4 text-center">

              <button
                onClick={() => handleRegionToggle("all")}
                className={`px-3 sm:px-4 py-1.5 min-w-[90px] sm:min-w-[110px] text-xs sm:text-sm rounded-full font-medium transition-all duration-300 ${
                  activeRegion === "all"
                    ? "bg-white text-amber-700 shadow-md ring-2 ring-amber-300 hover:shadow-lg"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:shadow-md"
                }`}
              >
                Explore All
              </button>


              {REGIONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleRegionToggle(r.key)}
                  className={`px-3 sm:px-4 py-1.5 min-w-[90px] sm:min-w-[110px] text-xs sm:text-sm rounded-full font-medium transition-all duration-300 ${
                    activeRegion === r.key
                      ? "bg-white text-amber-700 shadow-md ring-2 ring-amber-300 hover:shadow-lg"
                      : "bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:shadow-md"
                  }`}
                >
                  Explore {r.title.split(" — ")[0]}
                </button>
              ))}

            </div>

            {/* Interactive Map */}
            <motion.div
              className="relative mt-6 md:mt-0 flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative bg-white/10 backdrop-blur rounded-xl p-2 sm:p-3 shadow-[0_0_20px_rgba(245,158,11,0.2)] border border-white/10">
                {/* India Map */}
                <img
                  src={mapImage}
                  alt="Map of India"
                  className="w-[100px] sm:w-[130px] md:w-[150px] h-auto opacity-95 rounded-lg mask-fade"
                />

                {/* --- NORTH --- */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2">
                  {activeRegion === "north" && <span className="pulse-ring w-6 h-6 bg-amber-400/50" />}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMapClick("north")}
                    className={`relative z-10 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all ${
                      activeRegion === "north"
                        ? "bg-amber-500 text-white ring-2 ring-amber-300 opacity-100"
                        : "bg-amber-600 text-white opacity-70 hover:opacity-100"
                    }`}
                  >
                    N
                  </motion.button>
                </div>

                {/* --- SOUTH --- */}
                <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2">
                  {activeRegion === "south" && <span className="pulse-ring w-6 h-6 bg-emerald-400/50" />}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMapClick("south")}
                    className={`relative z-10 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all ${
                      activeRegion === "south"
                        ? "bg-emerald-500 text-white ring-2 ring-emerald-300 opacity-100"
                        : "bg-emerald-600 text-white opacity-70 hover:opacity-100"
                    }`}
                  >
                    S
                  </motion.button>
                </div>

                {/* --- WEST --- */}
                <div className="absolute top-[48%] left-[15%] -translate-y-1/2">
                  {activeRegion === "west" && <span className="pulse-ring w-6 h-6 bg-rose-400/50" />}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMapClick("west")}
                    className={`relative z-10 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all ${
                      activeRegion === "west"
                        ? "bg-rose-500 text-white ring-2 ring-rose-300 opacity-100"
                        : "bg-rose-600 text-white opacity-70 hover:opacity-100"
                    }`}
                  >
                    W
                  </motion.button>
                </div>

                {/* --- EAST --- */}
                <div className="absolute top-[48%] right-[15%] -translate-y-1/2">
                  {activeRegion === "east" && <span className="pulse-ring w-6 h-6 bg-indigo-400/50" />}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMapClick("east")}
                    className={`relative z-10 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all ${
                      activeRegion === "east"
                        ? "bg-indigo-500 text-white ring-2 ring-indigo-300 opacity-100"
                        : "bg-indigo-600 text-white opacity-70 hover:opacity-100"
                    }`}
                  >
                    E
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>      
        </div>
      </div>

      {/* Regions container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {REGIONS.map((region) => (
          <RegionPanel
            key={region.key}
            region={region}
            visible={activeRegion === "all" || activeRegion === region.key}
            onOpenCircuit={(c) => openCircuitModal(c)}
          />
        ))}
      </div>

      {/* Circuit modal */}
      <AnimatePresence>
        {openCircuit && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"

            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCircuitModal}>
            <motion.div className="bg-white rounded-2xl overflow-hidden w-full max-w-[95%] sm:max-w-3xl shadow-2xl"

              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end p-3">
                <button onClick={closeCircuitModal} aria-label="Close" className="text-gray-600 hover:text-gray-900 text-xl">✕</button>
              </div>
              <div className="h-64 overflow-hidden">
                <img src={openCircuit.cover} alt={openCircuit.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl font-serif text-amber-700 font-semibold mb-2">{openCircuit.title}</h2>
                <p className="text-gray-700 mb-4">{openCircuit.short}</p>
                {openCircuit.highlights?.length && (
                  <>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Highlights</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {openCircuit.highlights.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </>
                )}
                <div className="flex gap-3">
                  <a href="/contact" className="px-3 py-1.5 text-sm rounded-md bg-amber-600 text-white font-medium">Plan My Trip</a>
                  <button className="px-3 py-1.5 text-sm rounded-md border" onClick={closeCircuitModal}>Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden Triangle itinerary modal (special) */}
      <AnimatePresence>
        {openItinerary && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"

            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeItineraryModal}>
            <motion.div className="bg-white rounded-2xl overflow-hidden w-full max-w-[95%] sm:max-w-4xl shadow-2xl"

              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start p-4 border-b">
                <h3 className="text-2xl font-serif text-amber-700 font-semibold">Golden Triangle — Sample Itinerary</h3>
                <button onClick={closeItineraryModal} aria-label="Close itinerary" className="text-gray-600 hover:text-gray-900 text-xl">✕</button>
              </div>
              <div className="p-6 grid gap-4 md:grid-cols-2">
                <div>
                  <img src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80" alt="Golden Triangle" className="w-full h-56 object-cover rounded-md mb-4" />
                </div>
                <div>
                  <p className="text-gray-700 mb-3">A classic 6–7 day sample journey connecting Delhi, Agra, and Jaipur — heritage sites, local experiences, and royal stays.</p>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                    <li>Day 1: Arrive Delhi — Old & New Delhi highlights.</li>
                    <li>Day 2: Delhi markets & heritage strolls.</li>
                    <li>Day 3: Drive to Agra — Taj Mahal at sunrise.</li>
                    <li>Day 4: Agra Fort & transfer to Jaipur via Fatehpur Sikri.</li>
                    <li>Day 5: Jaipur — Amber Fort & City Palace.</li>
                    <li>Day 6: Cultural evening & onward travel.</li>
                  </ol>
                  <p className="text-sm text-gray-600 mb-4">Best Time: October – March</p>
                  <div className="flex gap-3">
                    <a href="/contact" className="inline-block px-3 py-1.5 text-sm bg-amber-600 text-white rounded-md font-medium">Plan My Golden Triangle</a>
                    <button onClick={closeItineraryModal} className="px-3 py-1.5 text-sm rounded-md border">Close</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA + Scroll-to-top */}
      <JourneyCTA />
      <ScrollToTopButton />
    </main>
  );
}
