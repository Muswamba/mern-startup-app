import { useState } from "react";
import {
   TextField,
   Button,
   Typography,
   Container,
   Box,
   Snackbar,
   Alert,
   CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../auth/AuthContext";
import AppLogo from "../components/AppLogo";

const Register = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
   });
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [snack, setSnack] = useState({
      open: false,
      message: "",
      severity: "success",
   });

   const { login } = useAuth();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const response = await api.post("/auth/register", form);

         setLoading(false);
         //   If successful, response will contain token and user data
         if (response.status === 201 || response.status === 200) {
            //   Save token to localStorage
            login(response.data.token);
            //   Redirect to login page after successful registration | profile | dashboard
            setSnack({
               open: true,
               message: "Registration successful! Redirecting to dashboard...",
               severity: "success",
            });
            //  deley
            setTimeout(() => navigate("/dashboard"), 1000);
         } else {
            //    throw new Error("");
            throw new Error(
               response.data.message || "Registration failed. Please try again."
            );
         }
      } catch (error) {
         setLoading(false);
         console.error("Registration failed:", error);
         setSnack({
            open: true,
            message:
               error.response?.data?.message ||
               "Registration failed. Please try again.",
            severity: "error",
         });
      }
   };

   const handleChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <Container maxWidth="sm">
         <Box mt={4}>
            <AppLogo
               sx={{
                  width: 100,
                  height: "auto",
                  display: "block",
                  margin: "0 auto 20px auto",
               }}
            />
            <Typography
               variant="h4"
               textAlign="center"
               gutterBottom>
               Register
            </Typography>
            <form onSubmit={handleSubmit}>
               <TextField
                  fullWidth
                  margin="normal"
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  required
                  disabled={loading}
               />
               <TextField
                  fullWidth
                  margin="normal"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  required
                  disabled={loading}
               />
               <TextField
                  fullWidth
                  margin="normal"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  required
                  disabled={loading}
               />

               <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}>
                  By clicking register, you agree to our{" "}
                  <Link
                     component="a"
                     color="primary"
                     to="/terms"
                     style={{ textDecoration: "none" }}>
                     Terms and Conditions
                  </Link>
               </Typography>

               <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}>
                  {loading ? "Registering..." : "Register"}
               </Button>

               <Button
                  fullWidth
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{ mt: 2 }}
                  disabled={loading}>
                  Already have an account? Login
               </Button>
            </form>
         </Box>

         <Snackbar
            open={snack.open}
            autoHideDuration={4000}
            onClose={() => setSnack({ ...snack, open: false })}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert
               onClose={() => setSnack({ ...snack, open: false })}
               severity={snack.severity}
               variant="filled"
               sx={{ width: "100%" }}>
               {snack.message}
            </Alert>
         </Snackbar>
      </Container>
   );
};

export default Register;
