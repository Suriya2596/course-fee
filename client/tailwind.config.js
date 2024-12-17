/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primOne: "#581D9E",
        primTwo: "#B587EC",
        primThree: "#D5C8E5",
        darkOne: "#180A28",
        darkTwo: "#200046",
        darkThree: "#6F667A",
        whiteOne: "#F8F3FF",
        whiteTwo: "#D2D2D2"
      }
    },
  },
  plugins: [],
}

