/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: "#E9EFFF",
        bgBlue: "#F9FAFF",
        btnBlue: "#1E5ECD",
        textBlue: "#1E4ED8",
        bgGreen: "#00635B",
        lightGreen: "#D0F7FA",
        textRed: "#A80000"
      }
    },
  },
  plugins: [],
}