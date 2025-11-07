// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location]);

  // Sticky header behavior
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg py-2"
          : "bg-gradient-to-r from-amber-800/95 to-amber-600/90 py-4"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        {/* Logo + Brand */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group transition-all duration-500"
        >
          <img
            src="/images/logo.png"
            alt="Echo Getaways Logo"
            className={`object-contain transition-all duration-500 ${
              scrolled ? "h-7 w-7" : "h-10 w-10"
            } group-hover:scale-105 group-hover:drop-shadow-md`}
          />
          <span
            className={`font-serif font-bold tracking-wide transition-all duration-500 ${
              scrolled
                ? "text-amber-800 text-xl"
                : "text-white text-2xl md:text-[1.6rem]"
            } group-hover:text-emerald-300`}
          >
            Echo Getaways
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-[0.95rem] font-medium tracking-wide transition-all">
          {navItems.map((item) => (
            <li key={item.to} className="relative group">
              <NavLink
                to={item.to}
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
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

        {/* Right-side Contact + WhatsApp */}
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

          {/* WhatsApp Button */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden transition-colors ${
            scrolled ? "text-amber-800" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 bg-gradient-to-b from-amber-700 to-amber-500 shadow-2xl transform transition-transform duration-500 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-amber-300/40">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-white"
          >
            <img src="/images/logo.png" alt="Echo Logo" className="h-7 w-7" />
            <span className="text-lg font-serif font-semibold">
              Echo Getaways
            </span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={22} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-8 py-8 text-lg text-white">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={({ isActive }) =>
                  `block py-1 transition-all duration-200 ${
                    isActive
                      ? "text-amber-200 font-semibold"
                      : "hover:text-amber-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Mobile Contact + WhatsApp */}
          <li className="pt-4 border-t border-amber-300/40 space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-white hover:text-amber-200"
            >
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
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
