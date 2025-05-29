const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const token = req.headers["Authorization"]?.split(" ")[1]; // Extract token from Authorization header
   if (!token) {
      return res.status(401).json({ message: "No token provided" });
   }
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Invalid token" });
   }
};

module.exports = verifyToken;

// Commade to generate a new JWT secret
// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
