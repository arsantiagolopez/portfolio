const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.zinc[800],
        secondary: colors.zinc[500],
      },
      fontFamily: {
        times: ["Times New Roman"],
      },
    },
  },
  plugins: [],
};
