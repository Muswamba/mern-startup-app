import * as React from "react";
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Box,
   Badge,
   Menu,
   MenuItem,
   Tooltip,
} from "@mui/material";
import {
   Menu as MenuIcon,
   AccountCircle,
   Mail as MailIcon,
   Notifications as NotificationsIcon,
   MoreVert as MoreIcon,
   Brightness4 as Brightness4Icon,
   Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useThemeMode } from "../theme/ThemeContext"; // Custom hook for theme mode toggle
import AppLogo from "./AppLogo";

export default function PrimarySearchAppBar() {
   // State for desktop profile menu anchor element (null means closed)
   const [anchorEl, setAnchorEl] = React.useState(null);
   // State for mobile menu anchor element
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

   // Get authentication state and functions from AuthContext
   const { isAuthenticated, logout, user } = useAuth();

   // React Router hook to navigate programmatically
   const navigate = useNavigate();

   // Get current theme mode ('light' or 'dark') and toggle function from ThemeContext
   const { mode, toggleMode } = useThemeMode();

   // Boolean indicating if desktop profile menu is open
   const isMenuOpen = Boolean(anchorEl);
   // Boolean indicating if mobile menu is open
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   // Open desktop profile menu, set anchor to clicked element
   const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);

   // Open mobile menu, set anchor to clicked element
   const handleMobileMenuOpen = (event) =>
      setMobileMoreAnchorEl(event.currentTarget);

   // Close both desktop and mobile menus by clearing anchors
   const handleMenuClose = () => {
      setAnchorEl(null);
      setMobileMoreAnchorEl(null);
   };

   // Logout user, close menus, and navigate to login page
   const handleLogout = () => {
      logout();
      handleMenuClose();
      navigate("/login");
   };

   // ID for desktop profile menu (for accessibility)
   const menuId = "primary-search-account-menu";

   // Desktop profile menu JSX
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         id={menuId}
         open={isMenuOpen}
         onClose={handleMenuClose}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
         transformOrigin={{ vertical: "top", horizontal: "right" }}>
         {/* Show user info if logged in */}
         {user && (
            <MenuItem disabled>Signed in as {user.name || user.email}</MenuItem>
         )}
         {/* Profile menu item navigates to dashboard */}
         <MenuItem
            onClick={() => {
               handleMenuClose();
               navigate("/dashboard");
            }}>
            Profile
         </MenuItem>
         {/* Logout menu item only if authenticated */}
         {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
      </Menu>
   );

   // ID for mobile menu (for accessibility)
   const mobileMenuId = "primary-search-account-menu-mobile";

   // Mobile menu JSX (shown on small screen sizes)
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         id={mobileMenuId}
         open={isMobileMenuOpen}
         onClose={handleMenuClose}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
         transformOrigin={{ vertical: "top", horizontal: "right" }}>
         {/* Messages menu item with badge */}
         <MenuItem>
            <Tooltip title="Messages">
               <IconButton
                  size="large"
                  color="inherit">
                  <Badge
                     badgeContent={4}
                     color="error">
                     <MailIcon />
                  </Badge>
               </IconButton>
            </Tooltip>
            <p>Messages</p>
         </MenuItem>
         {/* Notifications menu item with badge */}
         <MenuItem>
            <Tooltip title="Notifications">
               <IconButton
                  size="large"
                  color="inherit">
                  <Badge
                     badgeContent={17}
                     color="error">
                     <NotificationsIcon />
                  </Badge>
               </IconButton>
            </Tooltip>
            <p>Notifications</p>
         </MenuItem>
         {/* Profile menu item navigates to dashboard */}
         <MenuItem
            onClick={() => {
               handleMenuClose();
               navigate("/dashboard");
            }}>
            <IconButton
               size="large"
               color="inherit">
               <AccountCircle />
            </IconButton>
            <p>Profile</p>
         </MenuItem>
         {/* Dark/Light mode toggle in mobile menu */}
         <MenuItem
            onClick={() => {
               toggleMode();
               handleMenuClose();
            }}>
            <IconButton
               size="large"
               color="inherit">
               {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <p>{mode === "dark" ? "Light Mode" : "Dark Mode"}</p>
         </MenuItem>
      </Menu>
   );

   return (
      // Container box with flex-grow to fill horizontal space
      <Box sx={{ flexGrow: 1 }}>
         <AppBar
            position="sticky"
            color="secondary"
            elevation={1}>
            <Toolbar>
               {/* Hamburger menu icon button (currently no handler, add if needed) */}
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 1 }}
                  onClick={() => {
                     // Optional: add menu open logic here
                  }}>
                  <MenuIcon />
               </IconButton>

               {/* Logo image - clickable, navigates to homepage */}
               <AppLogo
                  sx={{
                     height: 40,
                     width: 40,
                     mr: 1,
                     display: { xs: "none", sm: "block" }, // Hide on very small screens
                     cursor: "pointer",
                  }}
               />

               {/* Site name - clickable, navigates to homepage */}
               <Typography
                  variant="h6"
                  noWrap
                  sx={{
                     display: { xs: "none", sm: "block" },
                     cursor: "pointer",
                  }}
                  onClick={() => navigate("/")} // Navigate home on click
               >
                  Startup
               </Typography>

               {/* Search bar component (custom) */}
               <SearchBar />

               {/* Flexible spacer to push right-side icons to the right */}
               <Box sx={{ flexGrow: 1 }} />

               {/* Desktop right-side icons & controls */}
               <Box
                  sx={{
                     display: { xs: "none", md: "flex" }, // Show on medium+ screens only
                     alignItems: "center",
                  }}>
                  {/* Light/Dark mode toggle button */}
                  <Tooltip title="Toggle light/dark mode">
                     <IconButton
                        size="large"
                        color="inherit"
                        onClick={toggleMode}
                        aria-label="toggle theme mode">
                        {mode === "dark" ? (
                           <Brightness7Icon />
                        ) : (
                           <Brightness4Icon />
                        )}
                     </IconButton>
                  </Tooltip>

                  {/* Messages icon with badge */}
                  <Tooltip title="Messages">
                     <IconButton
                        size="large"
                        color="inherit">
                        <Badge
                           badgeContent={4}
                           color="error">
                           <MailIcon />
                        </Badge>
                     </IconButton>
                  </Tooltip>

                  {/* Notifications icon with badge */}
                  <Tooltip title="Notifications">
                     <IconButton
                        size="large"
                        color="inherit">
                        <Badge
                           badgeContent={17}
                           color="error">
                           <NotificationsIcon />
                        </Badge>
                     </IconButton>
                  </Tooltip>

                  {/* Profile icon button to open menu */}
                  <IconButton
                     size="large"
                     edge="end"
                     onClick={handleProfileMenuOpen}
                     color="inherit"
                     aria-controls={menuId}
                     aria-haspopup="true">
                     <AccountCircle />
                  </IconButton>
               </Box>

               {/* Mobile menu icon button - visible only on xs to md screens */}
               <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="inherit">
                     <MoreIcon />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>

         {/* Render menus */}
         {renderMobileMenu}
         {renderMenu}
      </Box>
   );
}
