/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'buya-bright': '#FF6F00',
        'buya-green': '#00FF85',
        'buya-white': '#ffffff',
        'buya-dark': '#000000'
      }
    },
  },
  plugins: [],
}

