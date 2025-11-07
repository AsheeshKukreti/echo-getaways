import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import JourneyCTA from "../components/JourneyCTA";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-16 px-6 sm:px-4 md:px-8 overflow-hidden">
      {/* Intro Section */}
      <section
        className="grid md:grid-cols-2 gap-12 items-center"
        data-aos="fade-up"
      >
        <img
          src="https://as2.ftcdn.net/jpg/05/66/28/77/1000_F_566287755_v6U1pJrqQ6CBeuxLb7gopAHFzCuStLLH.jpg"
          alt="About Echo Getaways"
          className="rounded-2xl shadow-lg object-cover w-full h-[340px] sm:h-[420px] transition-transform duration-700 hover:scale-105"
        />

        <div className="transition-all duration-700 ease-in-out transform hover:translate-y-1">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-6 font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-teal-600"
            data-aos="fade-right"
          >
            About <span className="text-emerald-700 drop-shadow-md">Echo Getaways</span>
          </h1>

          <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
            <strong className="text-primary font-semibold">Echo Getaways</strong> was founded
            with a mission to redefine how travelers experience India. We believe every journey
            should echo with emotion, color, and connection — not just sightseeing.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
            With over 15 years of hospitality excellence, we curate meaningful escapes across
            India — from royal heritage trails in Rajasthan to peaceful backwaters of Kerala and
            soulful ghats of Varanasi.
          </p>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            As a boutique travel company rooted in India’s heart, <strong>Echo Getaways</strong>
            crafts immersive, sustainable journeys that celebrate authentic culture, stories, and
            traditions.
          </p>

          <ul className="mt-6 space-y-2 text-gray-700 text-base sm:text-[15px]">
            <li>✅ Personalized itineraries by local experts</li>
            <li>✅ Handpicked boutique accommodations</li>
            <li>✅ 24×7 ground assistance & safety assurance</li>
            <li>✅ Authentic & offbeat cultural experiences</li>
          </ul>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        className="mt-16 bg-gradient-to-r from-orange-50 via-amber-50 to-teal-50 rounded-3xl p-10 text-center shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-emerald-700 mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
          Our mission is to craft meaningful, immersive, and sustainable travel experiences that
          reveal India beyond the guidebooks — connecting travelers to its heart through stories
          and people.
          <br />
          Our vision is to make <span className="font-semibold text-amber-600">Echo Getaways</span>{" "}
          India’s most trusted inbound travel brand — known for authenticity, creativity, and
          exceptional guest care.
        </p>
      </section>

      {/* Team Section */}
      <section className="mt-20" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 font-serif mb-12">
          Meet the <span className="text-amber-600">Echo Getaways</span> Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[
            {
              name: "Aarav Mehta",
              role: "Founder & Travel Curator",
              img: "https://images.unsplash.com/photo-1603415526960-f7e0328ad1f3?auto=format&fit=crop&w=400&q=80",
              text: "Aarav’s deep love for India’s heritage and storytelling drives the soul of Echo Getaways. With two decades in hospitality, he curates journeys that echo beyond the ordinary."
            },
            {
              name: "Priya Sharma",
              role: "Head of Operations",
              img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80",
              text: "Priya ensures every itinerary flows seamlessly — balancing precision with warmth, so every traveler feels cared for at every step."
            },
            {
              name: "Rohan Kapoor",
              role: "Experience Designer",
              img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
              text: "Rohan transforms destinations into memories. From secret viewpoints to culinary journeys, he adds youthful vibrance to every itinerary."
            }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 ease-in-out hover:-translate-y-1"
              data-aos="zoom-in"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-amber-200 mb-4 shadow-md"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{member.role}</p>
              <p className="text-gray-600 text-base sm:text-[15px] leading-relaxed">{member.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Plan Your Bespoke Journey CTA (Reusable Component) === */}
      <JourneyCTA />
    </main>
  );
}
