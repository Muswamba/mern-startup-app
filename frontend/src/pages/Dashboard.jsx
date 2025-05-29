import { Button, Typography, Card } from "@mui/material";

const Dashboard = () => {
   return (
      <div>
         <Typography variant="h2">Welcome to Dashboard!</Typography>
         {/* Lorem 100 */}
         <Card sx={{ p: 2, mb: 2 }}>
            <Typography
               variant="body1"
               sx={{ mt: 2 }}>
               {/* Comment about this is about MERN stack app, idea to start builling a MERN stack app */}
               This is a simple MERN stack application to demonstrate the basic
               structure and functionality of a full-stack application using
               React, Node.js, Express.js, and MongoDB.
               {/* This startup app read include all the features, authentication Mongodb set up, etc */}
               This startup app read include all the features, authentication
               Mongodb set up, etc
            </Typography>
         </Card>
      </div>
   );
};

export default Dashboard;
