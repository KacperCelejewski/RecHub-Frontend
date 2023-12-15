module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary:'#FFF2D8',
        secondary:'#F3EEEA',
        third:'#BCA37F',
        fourth:'#113946',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}