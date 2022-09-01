/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "maincolor": "#2d2d2d",
        "maincolor-light": "#222222",
        "maincolor-lighter": "#191919",
        "maincolor-lightest": "#101010",
        "gradient-left": "#d61044",
        "gradient-right": "#8f40f5",
        "button-color": "#bc0233",
        "button-color-hover": "#d61044",
        "button-text": "#ffffff",
        "global-text": "#ffffff",
        'val-blue': '#67c2a8',
        'val-red': '#f15c56',
        'val-yellow': '#eaefb3',
        'blurple': '#5865F2',
        'blurple-dark': '#454FBF',
      },
      screens: {
        'base': '870px',
        'base2': '950px',
        'mini': '500px'
      }
    },
  },
  plugins: [],
}
