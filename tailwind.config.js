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
    extend: {
      display: ['responsive'],
      margin: ['responsive', 'first', 'last'],
      padding: ['responsive', 'first', 'last'],
      textAlign: ['responsive', 'first', 'last'],
      outline: ['focus'],
      backgroundColor: ['hover', 'focus', 'active', 'group-hover'],
      textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      opacity: ['responsive', 'hover', 'group-hover'],
    }
  },
  plugins: [],
}
