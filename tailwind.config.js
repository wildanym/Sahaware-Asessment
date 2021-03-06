module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primaryRed: "#ED3237",
        primaryGrey: "#848688",
        Blue1: "#2F80ED",
        Blue2: "#2D9CDB",
        secondaryRed: "#ED3237",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        navShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
