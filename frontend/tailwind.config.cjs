// filepath: d:\SLIIY2y\Customer\Frontend\tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93c5fd', // light blue
          DEFAULT: '#3b82f6', // blue
          dark: '#1e40af', // dark blue
        },
      },
    },
  },
  plugins: [ require('@tailwindcss/forms'),],
  
};