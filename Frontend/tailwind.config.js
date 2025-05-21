/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotateGradient: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rotate-gradient": "rotateGradient 15s linear infinite",
      },
      backgroundImage: {
        "text-gradient": "linear-gradient(90deg, #ff7e5f, #feb47b)", // Example gradient colors
      },
      textColor: {
        transparent: "transparent",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        accentRed: {
          DEFAULT: "#EB1C17",
          light: "#EF4A46",
          dark: "#BF1510",
        },
        accentGreen: {
          DEFAULT: "#089a27",
          light: "#27b344",
          dark: "#06791f",
        },
        primary: {
          DEFAULT: "#1c1c1e",
          light: "#383838",
          dark: "#000000",
        },
        secondary: {
          DEFAULT: "#3f000e",
          dark: "#221e1f",
        },
      },
    },
  },
  plugins: [],
};
