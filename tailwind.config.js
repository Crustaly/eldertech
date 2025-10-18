/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nomi-blue': '#e0f2fe',
        'nomi-dark-blue': '#0ea5e9',
        'nomi-red': '#ef4444',
        'nomi-black': '#374151',
        'nomi-light-blue': '#3b82f6',
      }
    },
  },
  plugins: [],
}
