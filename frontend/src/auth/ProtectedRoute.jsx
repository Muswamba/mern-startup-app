import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
/**
 * ProtectedRoute component that checks if the user is authenticated.
 * If authenticated, it renders the children components; otherwise, it redirects to the login page.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The components to render if authenticated.
 * @returns {ReactNode} The children components or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();

   // If the user is authenticated, render the children components
   if (isAuthenticated) {
      return children;
   }

   // If not authenticated, redirect to the login page
   return (
      <Navigate
         to="/login"
         replace
      />
   );
};
export default ProtectedRoute;
