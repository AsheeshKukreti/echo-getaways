import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20Echo%20Getaways!%20I%27m%20interested%20in%20planning%20a%20trip."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="group-hover:animate-bounce" />
      <span className="absolute bottom-14 right-0 bg-white text-green-700 text-xs font-medium px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        Chat on WhatsApp
      </span>
    </a>
  );
}
