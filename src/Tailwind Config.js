/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(teal|yellow|blue|orange|red|green|slate)-(50|100|200|500|600|700|800)/,
      variants: ['hover', 'focus'],
    },
  ],
  plugins: [],
}