/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      agdasima: ['Agdasima', 'sans-serif'],
      inria: ['Inria Sans', 'sans-serif'], // 'sans-serif' as fallback
    }
  },
  },
  plugins: [],
}