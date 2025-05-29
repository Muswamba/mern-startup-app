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
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AppLogo from "../components/AppLogo";

const ResetPassword = () => {
   const { token } = useParams();
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [snack, setSnack] = useState({
      open: false,
      message: "",
      severity: "info",
   });
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      // console.log("Here is your token:", token);
      try {
         const res = await api.post(`/auth/reset-password/${token}`, {
            password,
            token,
         });
         if (res.status !== 200) {
            throw new Error(res.data.message || "Unexpected response");
         }
         setSnack({
            open: true,
            message: "Password updated!",
            severity: "success",
         });
         setTimeout(() => navigate("/login"), 1000); // delay for UX
      } catch (err) {
         console.error(err);
         setSnack({
            open: true,
            message: "Token expired or invalid.",
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
               gutterBottom>
               Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit}>
               <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
               />
               <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}>
                  {loading ? "Updating..." : "Update Password"}
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

export default ResetPassword;
