/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'font': ['Italiana']
      },

      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '6xl': '4rem',
        '7xl': '5rem',
      }
    }
    
  },
  plugins: [],
}

