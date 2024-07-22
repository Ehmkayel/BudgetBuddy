/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors : {
        DarkGreen: '#004343',
        MintGreen: '#77E6B6',
        DeepGreen: '#1A5319'

      }
    },
  },
  plugins: [],
}




 
