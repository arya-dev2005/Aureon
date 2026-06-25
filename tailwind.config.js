/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C9A96E",
        background: "#0A0A0F",
        card: "#12121A",
      }
    },
  },
  plugins: [],
}
