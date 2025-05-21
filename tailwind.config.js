import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["IBM Plex Sans Thai Looped"],
    },
    screens: {
      lg: "990px",
      "3xl": "1600px",
    },
    extend: {
      fontSize: {
        title: [
          "32px", // 32px
          {
            fontWeight: "600", // Semibold
            lineHeight: "44px", // 44px
          },
        ],
        h1: [
          "20px", // 20px
          {
            fontWeight: "600", // Semibold
            lineHeight: "28px", // 28px
          },
        ],
        h2: [
          "18px", // 18px
          {
            fontWeight: "600", // Semibold
            lineHeight: "26px", // 26px
          },
        ],
        h3: [
          "16px", // 16px
          {
            fontWeight: "600", // Semibold
            lineHeight: "24px", // 24px
          },
        ],
        h4: [
          "14px", // 14px
          {
            fontWeight: "600", // Semibold
            lineHeight: "22px", // 22px
          },
        ],
        paragraph: [
          "18px", // 18px
          {
            fontWeight: "400", // Regular
            lineHeight: "26px", // 26px
          },
        ],
        body1: [
          "14px", // 14px
          {
            fontWeight: "400", // Regular
            lineHeight: "22px", // 22px
          },
        ],
        body2: [
          "12px", // 12px
          {
            fontWeight: "400", // Regular
            lineHeight: "20px", // 20px
          },
        ],
        button1: [
          "16px", // 16px
          {
            fontWeight: "500", // Medium
            lineHeight: "24px", // 24px
          },
        ],
        button2: [
          "14px", // 14px
          {
            fontWeight: "500", // Medium
            lineHeight: "22px", // 20px
          },
        ],
      },
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        primary: "#F77A32",
        secondary: "#F9ECE8",
        bg: "#F8F5F4",
        primaryDark: "#E73D00",
        primaryLight: "#F9D6CB",
        textDark: "#3A322D",
      },
      boxShadow: {
        1: "0px 6px 14px rgba(137, 39, 9, 0.25)",
        0: "0px 2px 8px rgba(160, 123, 101, 0.15)",
        search: "0px 3px 12px rgba(83, 34, 7, 0.15)",
        card: "0px 4px 13px rgba(160, 123, 101, 0.15)",
      },
    },
  },
  plugins: [],
});
