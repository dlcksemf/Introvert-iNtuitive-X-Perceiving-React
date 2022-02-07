const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
          primary: colors.blue,
          secondary: colors.yellow,
          warning: colors.red,
          success: colors.lime,
          gray: colors.slate,
      },
    },
  },
  plugins: [],
};
