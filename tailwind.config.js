const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": [["Open Sans Variable", ...defaultTheme.fontFamily.serif]],
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss"), require("@tailwindcss/forms")],
};
