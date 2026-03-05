/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGrey: '#2A2A2A',
        blackBg: '#0A0A0A',
      },
      fontFamily: {
        agrandir: ['"Agrandir Wide"', 'Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
