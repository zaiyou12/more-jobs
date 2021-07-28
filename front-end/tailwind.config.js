module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      '8xl': '90rem'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
