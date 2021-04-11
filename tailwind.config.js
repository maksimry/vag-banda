// https://jacobneterer.medium.com/angular-and-tailwindcss-2388fb6e0bab
require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || false;
module.exports = {
  purge: {
    enabled: enablePurge,
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        sm: '5px',
        md: '10px',
        lg: '20px',
        xl: '40px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        indigo: {
          light: '#5c667f',
          DEFAULT: '#313c53',
          dark: '#08162a',
        },
        yellow: {
          light: '#ffff79',
          DEFAULT: '#fff343',
          dark: '#c8c100',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
