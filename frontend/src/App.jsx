import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { CustomThemeProvider } from "./theme/ThemeContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Terms from "./pages/policies/Terms";
import Layout from "./components/Layout";
function App() {
   return (
      <CustomThemeProvider>
         <AuthProvider>
            <Router>
               <Routes>
                  <Route element={<Layout />}>
                     <Route
                        path="/"
                        element={<HomePage />}
                     />
                     <Route
                        path="/register"
                        element={<Register />}
                     />
                     <Route
                        path="/login"
                        element={<Login />}
                     />
                     {/* Reset Password */}
                     <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                     />
                     <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                     />
                     {/* Policies */}
                     <Route
                        path="/terms"
                        element={<Terms />}
                     />

                     <Route
                        path="/dashboard"
                        element={
                           <ProtectedRoute>
                              <Dashboard />
                           </ProtectedRoute>
                        }
                     />
                  </Route>
               </Routes>
            </Router>
         </AuthProvider>
      </CustomThemeProvider>
   );
}

export default App;
