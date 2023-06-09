/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/src/images/background.jpg')",
        'sideBackground': "url('/src/images/red.jpg')",
      },
      colors:{
        "blue-green" : "#06BABC"
      }
      
      
    },
  },
  plugins: [],
}