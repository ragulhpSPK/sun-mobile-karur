module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xsm: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1580px",
    },
  },
  daisyui: {
    themes: [
      {
        lightmode: {
          primary: "#D0021B",
          secondary: "#ffff",
          accent: "#1c2c52",
        },
        darkmode: {
          primary: "#ffff",
          secondary: "#0e0250",
          accent: "#fafafa",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
