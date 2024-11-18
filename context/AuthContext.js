import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; // Fix the import
import axios from "axios";
import useToken from "@/hooks/useToken";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const [token, updateToken] = useToken(); // Use the token from the hook
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (token) {
      handleTokenDecode(token);
    }
  }, [token]); // Only decode token when it changes

  const handleTokenDecode = (token) => {
    try {
      const decoded = jwtDecode(token); // Decode the JWT token
      setAuthState(true, decoded.isAdmin); // Set auth state
      fetchCartCount(decoded.userId); // Fetch the cart count for the user
      fetchUserDetails(decoded.userId); // Fetch user details
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };
  useEffect(() => {
    // Fetch the token only once when the app initially loads
    if (!token) {
      const storedToken = Cookies.get("refresh-token");
      if (storedToken) {
        updateToken(storedToken);
      } else {
        // Fetch the token if not present
        const fetchToken = async () => {
          try {
            const response = await axios.get("/api/get-refresh-token");
            const { refreshToken } = response.data;
            if (refreshToken) {
              updateToken(refreshToken);
            }
          } catch (error) {
            console.error("Failed to fetch refresh token:", error);
          }
        };
        fetchToken();
      }
    }
  }, []); // Empty dependency array to ensure it runs only once
  const setAuthState = (loggedIn, admin) => {
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  };

  const fetchCartCount = async (userId) => {
    try {
      const response = await axios.get(`/api/cart/count?userId=${userId}`);
      setCartCount(response.data.count);
    } catch (error) {
      console.error("Failed to fetch cart count", error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/user/userDetail?userId=${userId}`);
      const userData = response.data.user;
      setUser(userData);
      setUserEmail(userData.email);
      setUserName(userData.name);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const login = async (newToken) => {
    try {
      updateToken(newToken); // Update token using the hook
      handleTokenDecode(newToken);
      router.push(isAdmin ? "/panelAdmin" : "/panelUser/profile");
    } catch (error) {
      console.error("Failed to decode token on login", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/logout", { withCredentials: true });
      Cookies.remove("refresh-token");
      setAuthState(false, false); // Reset the auth state
      setCartCount(0);
      updateToken(null); // Clear the token
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        user,
        userName,
        userEmail,
        login,
        logout,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
