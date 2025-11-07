/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0077b6",
        accent: "#f77f00",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      fontSize: {
        // Global Typography Scale (consistent across pages)
        headingLg: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }], // ~text-4xl
        headingMd: ["2rem", { lineHeight: "1.3", fontWeight: "700" }],   // ~text-3xl
        headingSm: ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }], // ~text-2xl
        bodyLg: ["1.125rem", { lineHeight: "1.8" }],                     // ~text-lg
        bodyMd: ["1rem", { lineHeight: "1.7" }],                         // ~text-base
        bodySm: ["0.875rem", { lineHeight: "1.6" }],                     // ~text-sm
      },
    },
  },
  plugins: [],
};
