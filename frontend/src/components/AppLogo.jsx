// AppLogo
import React from "react";
import { Box } from "@mui/material";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import { Link, useNavigate } from "react-router-dom";

const AppLogo = ({ sx = {} }) => {
   const navigate = useNavigate();

   return (
      <Box
         component="img"
         src={logo}
         alt="App Logo"
         onClick={() => navigate("/")}
         sx={{ width: 100, height: "auto", cursor: "pointer", ...sx }}
      />
   );
};

export default AppLogo;
