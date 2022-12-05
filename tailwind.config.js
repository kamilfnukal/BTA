/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "lighterblue": "#BDE0FE",
        "lightblue": "#A2D2FF",
        "lighterpink": "#FFC8DD",
        "lightpink": "#FFAFCC",
        "lightpurple": "#CDB4DB"
      },
      screens: {
        '3xl': '1800px'
      }
    }
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")]
}
