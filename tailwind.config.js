import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI Variable Display",
        "Segoe UI",
        "Helvetica",
        "Apple Color Emoji",
        "Arial",
        "sans-serif",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
    },
    fontSize: {
      title: [
        "36px", // 36px
        {
          fontWeight: "600", // Semibold
          lineHeight: "44px", // 48px
        },
      ],
      h1: [
        "24px", // 24px
        {
          fontWeight: "600", // Semibold
          lineHeight: "32px", // 32px
        },
      ],
      h2: [
        "20px", // 20px
        {
          fontWeight: "600", // Semibold
          lineHeight: "28px", // 28px
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
          lineHeight: "22px", // 20px
        },
      ],
      paragraph: [
        "20px", // 20px
        {
          fontWeight: "400", // Regular
          lineHeight: "28px", // 28px
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
        "18px", // 18px
        {
          fontWeight: "500", // Medium
          lineHeight: "26px", // 24px
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
    extend: {
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
      },
    },
  },
  plugins: [],
});
