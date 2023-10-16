/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        fugaz: "var(--font-fugaz)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bgk: "url('/img/hero-pattern.svg')",
      },
      screens: {
        pn: "130px",
        vs: "360px",
        sm: "720px",
        md: "1024px",
        lg: "1280px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
