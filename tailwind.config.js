/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carnival: {
          dark: '#1a0b2e',    // Deep purple background
          primary: '#ff007f',  // Hot Pink
          secondary: '#00e5ff', // Electric Cyan
          gold: '#ffd700',     // Gold for premium/VIP
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}