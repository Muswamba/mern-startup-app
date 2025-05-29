import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

/**
 * Provides an authentication context for the application.
 *
 * This component wraps the application and provides the current authentication
 * state, as well as functions to log in and log out, to all of its children.
 *
 * @param {ReactNode} children - The components to be wrapped with the authentication context.
 * @returns {ReactElement} The wrapped components with the authentication context.
 */
export const AuthProvider = ({ children }) => {
   // Initialize the token state
   const [token, setToken] = useState(localStorage.getItem("token") || null);

   /**
    * Logs in a user by storing the provided token in local storage and updating the state.
    *
    * @param {string} newToken - The token to be stored and used for authentication.
    */
   const login = (newToken) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
   };

   /**
    * Logs out a user by removing the stored token from local storage and updating the state.
    */
   const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
   };

   const isAuthenticated = !!token;

   return (
      <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
