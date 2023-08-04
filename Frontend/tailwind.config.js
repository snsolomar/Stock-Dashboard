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
      }
    },
  },
  plugins: [],
}

