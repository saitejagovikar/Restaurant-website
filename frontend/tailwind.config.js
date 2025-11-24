/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f2',
          100: '#ffe8e0',
          200: '#ffd4c7',
          300: '#ffb8a0',
          400: '#ff8f68',
          500: '#ff6b35',  // Main orange
          600: '#f55a24',
          700: '#e04718',
          800: '#b83a16',
          900: '#963118',
          950: '#521809',
        },
      },
    },
  },
  plugins: [],
}
