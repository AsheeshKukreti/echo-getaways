// src/components/Footer.tsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";


export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-amber-950 via-amber-900 to-gray-900 text-gray-300 mt-20 overflow-hidden">
      {/* === Main Footer === */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        {/* About Section */}
        <div data-aos="fade-up">
          <h3 className="text-white text-lg font-semibold mb-4">
            Echo Getaways
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Crafting authentic travel experiences across India — where every
            journey echoes in your heart.
          </p>
          <div className="mt-4 space-y-1 text-sm text-gray-400">
            <p>
              <span className="font-semibold text-amber-400">📍</span> South
              Delhi, India
            </p>
            <p>
              <span className="font-semibold text-amber-400">✉️</span>{" "}
              hello@echogetaways.in
            </p>
            <p>
              <span className="font-semibold text-amber-400">📞</span> +91 98765
              43210
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/destinations", label: "Destinations" },
              { to: "/experiences", label: "Experiences" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="hover:text-amber-400 transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
          <p className="text-sm text-gray-400 mb-3">
            Follow our journeys and travel stories.
          </p>
          <div className="flex space-x-4 text-xl">
            <a
              href="#"
              className="hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-pink-400 transition-all duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-sky-400 transition-all duration-300 hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%20Echo%20Getaways!"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-all duration-300 hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe for curated travel stories, tips, and offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex bg-gray-800 rounded-full overflow-hidden border border-gray-700 focus-within:ring-2 focus-within:ring-amber-500"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 text-sm text-gray-200 bg-transparent outline-none"
            />
            <button
              type="submit"
              className="bg-amber-600 px-4 py-2 text-white font-medium hover:bg-amber-500 transition-all"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* === Bottom Bar === */}
      <div
        className="border-t border-gray-700 mt-6 py-5 text-center text-xs text-gray-500"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        © {new Date().getFullYear()}{" "}
        <span className="text-amber-400 font-semibold">Echo Getaways</span> ·
        All Rights Reserved.
      </div>

      {/* Scroll-to-Top Button */}
      
    </footer>
  );
}
