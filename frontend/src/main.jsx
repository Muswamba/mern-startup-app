import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <CssBaseline />
      <App />
   </React.StrictMode>
);
