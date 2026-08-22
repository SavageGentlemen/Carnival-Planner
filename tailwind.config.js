/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // 👈 Enables manual dark mode toggling
  theme: {
    extend: {
      colors: {
        carnival: {
          dark: '#080c14',
          card: '#0f172a',
          surface: '#131c2e',
          teal: '#00e5cc',
          cyan: '#06b6d4',
          gold: '#f59e0b',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(teal|yellow|blue|orange|red|green|slate)-(50|100|200|500|600|700|800)/,
      variants: ["hover", "focus", "dark"], // Added dark variant
    },
    'bg-gradient-to-r',
    'from-indigo-500', 'via-purple-500', 'to-pink-500',
    'from-green-400', 'to-blue-500',
    'from-yellow-400', 'via-red-500', 'to-pink-500',
    'from-teal-400', 'to-cyan-500',
    'from-red-500', 'via-orange-500', 'to-yellow-500',
    'from-purple-600', 'to-indigo-600',
    'backdrop-blur-md',
  ],
  plugins: [],
};