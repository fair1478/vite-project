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
        },
      ],
      h1: [
        "24px", // 24px
        {
          fontWeight: "600", // Semibold
        },
      ],
      h2: [
        "20px", // 20px
        {
          fontWeight: "600", // Semibold
        },
      ],
      h3: [
        "16px", // 16px
        {
          fontWeight: "600", // Semibold
        },
      ],
      h4: [
        "14px", // 14px
        {
          fontWeight: "600", // Semibold
        },
      ],
      paragraph: [
        "20px", // 20px
        {
          fontWeight: "400", // Regular
        },
      ],
      body1: [
        "14px", // 14px
        {
          fontWeight: "400", // Regular
        },
      ],
      body2: [
        "12px", // 12px
        {
          fontWeight: "400", // Regular
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
        bg: "#F8F5F4",
      },
    },
  },
  plugins: [],
});
