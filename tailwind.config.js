/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "google-blue": "#4285f4",
        "google-red": "#ea4335",
        "google-yellow": "#fbbc05",
        "google-green": "#34a853",
      },
    },
  },
  plugins: [],
}
