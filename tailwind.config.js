/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      comic: ["Bangers", "sans-serif"],
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      hk: ["HK Grotesk", "sans-serif"],
      jt: ["Jost", "sans-serif"],
    },
  },
  plugins: [],
}