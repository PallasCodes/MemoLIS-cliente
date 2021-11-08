const colors = require('tailwindcss/colors')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Rubik']
    },
    extend: {
      colors: {
        lime: colors.lime
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
