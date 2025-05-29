// App layout
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
const Layout = () => {
   return (
      <Box>
         <PrimarySearchAppBar />
         <Container className="layout">
            <Outlet />
         </Container>
      </Box>
   );
};
export default Layout;
