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
} from "@mui/material";
import AppLogo from "../components/AppLogo";
import api from "../api";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [formError, setFormError] = useState("");

   const [snack, setSnack] = useState({
      open: false,
      message: "",
      severity: "info",
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setFormError("");

      const trimmedEmail = email.trim();

      if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
         setFormError("Please enter a valid email address.");
         setLoading(false);
         return;
      }

      try {
         const res = await api.post(`/auth/forgot-password`, {
            email: trimmedEmail,
         });

         if (res.status !== 200 && res.status !== 204) {
            throw new Error(res.data.message || "Unexpected response");
         }

         setSnack({
            open: true,
            message: "Password reset link sent if email exists.",
            severity: "success",
         });

         setSubmitted(true);
      } catch (err) {
         console.error(err);
         const message =
            err?.response?.data?.message ||
            err?.message ||
            "Error sending reset link.";

         setSnack({
            open: true,
            message,
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
               variant="h5"
               textAlign="center">
               Forgot Password
            </Typography>

            {submitted ? (
               <Typography mt={2}>
                  If that email exists, a password reset link has been sent.
               </Typography>
            ) : (
               <form onSubmit={handleSubmit}>
                  <TextField
                     fullWidth
                     label="Email"
                     margin="normal"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     disabled={loading}
                     error={!!formError}
                     helperText={formError}
                  />

                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                     }}>
                     <Button
                        variant="text"
                        onClick={() => window.history.back()}
                        disabled={loading}>
                        Back
                     </Button>
                     <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}>
                        {loading ? "Sending..." : "Send Reset Link"}
                     </Button>
                  </Box>
               </form>
            )}
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

export default ForgotPassword;
