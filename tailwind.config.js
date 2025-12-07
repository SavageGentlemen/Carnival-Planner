// tailwind.config.js
module.exports = {
  // ...existing config...
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { /* ... */ },
  },
  safelist: [
    // (existing safelist patterns)
    {
      pattern: /(bg|text|border)-(teal|yellow|blue|orange|red|green|slate)-(50|100|200|500|600|700|800)/,
      variants: ["hover", "focus"],
    },
    // ensure gradient and blur utility classes are not purged
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
