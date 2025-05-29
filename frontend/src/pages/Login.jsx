import { useState } from "react";
import {
   TextField,
   Button,
   Container,
   Typography,
   Box,
   Snackbar,
   Alert,
   CircularProgress,
   Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AppLogo from "../components/AppLogo";
import api from "../api";

const Login = () => {
   const [form, setForm] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);
   const [snack, setSnack] = useState({
      open: false,
      message: "",
      severity: "success",
   });

   const navigate = useNavigate();
   const { login } = useAuth();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await api.post(`/auth/login`, form);
         login(res.data.token);
         setSnack({
            open: true,
            message: "Login successful!",
            severity: "success",
         });
         setTimeout(() => navigate("/dashboard"), 1000); // slight delay for UX
      } catch (err) {
         console.error(err);
         setSnack({
            open: true,
            message: err.response?.data?.message || "Login failed",
            severity: "error",
         });
      } finally {
         setLoading(false);
      }
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
               gutterBottom
               textAlign="center">
               Login
            </Typography>
            <form onSubmit={handleSubmit}>
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

               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     mt: 2,
                  }}>
                  <Typography
                     variant="body2"
                     color="textSecondary"
                     sx={{ mt: 1 }}>
                     Don't have an account?{" "}
                     <Link href="/register">Register</Link>
                  </Typography>
                  <Typography
                     variant="body2"
                     color="textSecondary"
                     sx={{ mt: 1 }}>
                     <Link href="/forgot-password">Forgot Password?</Link>
                  </Typography>
               </Box>

               <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}>
                  {loading ? "Logging in..." : "Login"}
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

export default Login;
