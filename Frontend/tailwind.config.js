/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        white: 'white',
        none: "none",  
      },
      borderWidth: {
        1: "1"
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      gridTemplateRows: { // Tailwind provides 6 rows for it's grid layout, so this extends it to 8
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
}

