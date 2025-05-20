/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "sans-serif"],
      },
      colors: {
        orange: {
          500: "#FF9500",
        },
        neutral: {
          900: "#262626",
        },
      },
    },
  },
  plugins: [],
};