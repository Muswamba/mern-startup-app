// src/pages/Terms.jsx
import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";

const Terms = () => {
   return (
      <Container
         maxWidth="md"
         sx={{ py: 5 }}>
         <Typography
            variant="h4"
            gutterBottom>
            Terms and Conditions
         </Typography>
         <Typography
            variant="subtitle2"
            gutterBottom>
            Last updated: May 27, 2025
         </Typography>

         <Typography paragraph>
            By accessing or using this application, you agree to be bound by
            these Terms and Conditions. If you disagree with any part of the
            terms, then you may not access the service.
         </Typography>

         <Box sx={{ mt: 4 }}>
            <Typography variant="h6">1. Use of the Service</Typography>
            <Typography paragraph>
               You agree to use the service only for lawful purposes and in a
               way that does not infringe the rights of, restrict, or inhibit
               anyone else's use and enjoyment of the service.
            </Typography>

            <Typography variant="h6">2. User Accounts</Typography>
            <Typography paragraph>
               When you create an account, you must provide accurate and
               complete information. You are responsible for safeguarding the
               password that you use to access the service.
            </Typography>

            <Typography variant="h6">3. Intellectual Property</Typography>
            <Typography paragraph>
               The service and its original content, features, and functionality
               are and will remain the exclusive property of the app owner.
            </Typography>

            <Typography variant="h6">4. Termination</Typography>
            <Typography paragraph>
               We may terminate or suspend access to our service immediately,
               without prior notice or liability, for any reason whatsoever.
            </Typography>

            <Typography variant="h6">5. Changes to Terms</Typography>
            <Typography paragraph>
               We reserve the right to modify or replace these terms at any
               time. Changes will be effective immediately upon being posted.
            </Typography>

            <Typography paragraph>
               If you have any questions about these Terms, please contact us at{" "}
               <Link href="mailto:support@example.com">
                  support@example.com
               </Link>
               .
            </Typography>
         </Box>
      </Container>
   );
};

export default Terms;
// This code defines a Terms and Conditions page for a React application.
