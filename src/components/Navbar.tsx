// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import logoImage from "../assets/images/logo2.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 🧭 Scroll to top on every route change
  useEffect(() => {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    scrollTop();
    setTimeout(scrollTop, 300);
    setMenuOpen(false);
  }, [location]);

  // 📜 Detect scroll for header shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/experiences", label: "Experiences" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // ✨ Header entry animation
  const headerVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  // ✨ Mobile drawer item animation
  const drawerItemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.07, duration: 0.3 },
    }),
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg py-2 md:py-2"
          : "bg-gradient-to-r from-amber-800/95 to-amber-600/90 py-4 md:py-5"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 transition-all duration-500 ${
          scrolled ? "scale-[0.97]" : "scale-100"
        }`}
      >
        {/* === Logo + Brand === */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
          }}
          className="flex items-center gap-2 group transition-all duration-500"
        >
          <img
            src={logoImage}
            alt="Echo Getaways Logo"
            className={`object-contain transition-all duration-500 ${
              scrolled ? "h-7 w-7 sm:h-8 sm:w-8" : "h-10 w-10 sm:h-12 sm:w-12"
            } group-hover:scale-110 group-hover:drop-shadow-md`}
          />
          <span
            className={`font-serif font-bold tracking-wide transition-all duration-500 ${
              scrolled
                ? "text-amber-800 text-lg sm:text-xl"
                : "text-white text-xl sm:text-2xl md:text-[1.6rem]"
            } group-hover:text-emerald-300`}
          >
            Echo Getaways
          </span>
        </Link>

        {/* === Desktop Menu === */}
        <ul className="hidden md:flex gap-6 text-[0.95rem] font-medium tracking-wide transition-all">
          {navItems.map((item) => (
            <li key={item.to} className="relative group">
              <NavLink
                to={item.to}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
                }}
                className={({ isActive }) =>
                  `transition-all duration-300 ${
                    scrolled
                      ? "text-gray-800 hover:text-amber-700"
                      : "text-white hover:text-amber-200"
                  } ${isActive ? "font-semibold" : ""}`
                }
              >
                {item.label}
              </NavLink>
              <span
                className={`absolute left-0 bottom-[-3px] h-[2px] w-0 bg-gradient-to-r from-amber-400 to-emerald-500 group-hover:w-full transition-all duration-500 ${
                  location.pathname === item.to ? "w-full" : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>

        {/* === Right Contact + WhatsApp (Desktop) === */}
        <div className="hidden md:flex items-center gap-3 transition-all duration-500">
          <a
            href="tel:+919876543210"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              scrolled
                ? "text-amber-800 border border-amber-600 hover:bg-amber-600 hover:text-white"
                : "text-white border border-white/60 hover:bg-white/20"
            }`}
          >
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </a>

          <a
            href="https://wa.me/919876543210?text=Hi%20Echo%20Getaways!%20I%27m%20interested%20in%20planning%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              scrolled
                ? "text-green-700 border border-green-600 hover:bg-green-600 hover:text-white"
                : "text-white border border-white/60 hover:bg-white/20"
            }`}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* === Mobile Menu Button === */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-amber-800" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* === Mobile Drawer === */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{
          duration: 0.5,
          ease: [0.68, -0.55, 0.27, 1.55],
        }}
        className="fixed top-0 right-0 h-screen w-3/4 z-[60] bg-gradient-to-b from-amber-800 via-amber-700 to-amber-500 rounded-l-3xl border-l border-amber-300/30 shadow-[0_0_20px_rgba(0,0,0,0.3)] md:hidden"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-amber-300/40">
          <Link
            to="/"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
            }}
            className="flex items-center gap-2 text-white"
          >
            <img src={logoImage} alt="Echo Logo" className="h-7 w-7" />
            <span className="text-lg font-serif font-semibold">Echo Getaways</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={22} />
          </button>
        </div>

        <ul className="flex flex-col space-y-5 px-8 py-8 text-base text-white">
          {navItems.map((item, i) => (
            <motion.li
              key={item.to}
              custom={i}
              initial="hidden"
              animate={menuOpen ? "visible" : "hidden"}
              variants={drawerItemVariants}
            >
              <NavLink
                to={item.to}
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
                }}
                className={({ isActive }) =>
                  `block py-1 transition-all duration-200 ${
                    isActive ? "text-amber-200 font-semibold" : "hover:text-amber-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}

          {/* Mobile Contact + WhatsApp */}
          <motion.li
            className="pt-4 border-t border-amber-300/40 space-y-3"
            initial="hidden"
            animate={menuOpen ? "visible" : "hidden"}
            custom={navItems.length}
            variants={drawerItemVariants}
          >
            <a href="tel:+919876543210" className="flex items-center gap-2 text-white hover:text-amber-200">
              <Phone size={18} /> +91 98765 43210
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%20Echo%20Getaways!%20I%27m%20interested%20in%20planning%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-green-300"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </motion.li>
        </ul>
      </motion.div>

      {/* === Overlay (Fixed Blur Issue + Tap to Close) === */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/60 md:backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </motion.header>
  );
}
