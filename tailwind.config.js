const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Fira Code', ...fontFamily.mono],
      },
      colors: {
        text: {
          primary: '#111827',
        },
        background: '#FCFCFC',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
