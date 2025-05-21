import { ThemeProvider } from "@material-tailwind/react";
import AppRouter from "./Router.jsx";

function App() {
  const theme = {
    button: {
      styles: {
        variants: {
          filled: {
            white: {
              backgroud: "bg-[#F9ECE8]",
              color: "text-primary",
              shadow: "shadow-none",
              hover: "hover:bg-primaryLight",
              focus: "focus:opacity-[0.85]",
              active: "active:opacity-[0.85]",
            },
            orange: {
              backgroud: "bg-primary",
              color: "text-bg",
              shadow: "shadow-none",
              hover: "hover:bg-primaryDark",
              focus: "focus:opacity-[0.85]",
              active: "active:opacity-[0.85]",
            },
          },
          outlined: {
            orange: {
              border: "border-2 border-primary",
              color: "text-primary",
              hover: "hover:opacity-75",
              focus: "focus:bg-primary/30",
              active: "active:opacity-[0.85]",
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider value={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
