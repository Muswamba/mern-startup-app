//ThemeContext.jsx
import React, {
   createContext,
   useContext,
   useState,
   useMemo,
   useEffect,
} from "react";
import {
   createTheme,
   ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
   const [mode, setMode] = useState("light");

   useEffect(() => {
      const savedMode = localStorage.getItem("themeMode");

      if (savedMode) {
         setMode(savedMode);
      }
   }, []);
   //    Toggle
   const toggleMode = () => {
      setMode((prevMode) => {
         const newMode = prevMode === "light" ? "dark" : "light";
         localStorage.setItem("themeMode", newMode);
         return newMode;
      });
   };

   // Use useMemo to create a theme object based on the current mode
   const theme = useMemo(() => {
      return createTheme({
         palette: {
            mode,
            ...(mode === "dark" && {
               background: {
                  default: "#121212",
                  paper: "#1d1d1d",
               },
            }),
         },
      });
   }, [mode]);
   return (
      <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
         <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
         </MuiThemeProvider>
      </ThemeContext.Provider>
   );
};
