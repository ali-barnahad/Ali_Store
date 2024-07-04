// path: context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useToken from "@/hooks/useToken";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuthState(true, decoded.isAdmin, decoded);
        fetchCartCount(decoded.userId);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [token]);

  const setAuthState = (loggedIn, admin, user) => {
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
    setUser(user);
  };

  const fetchCartCount = async (userId) => {
    try {
      const response = await axios.get(`/api/cart/count?userId=${userId}`);
      setCartCount(response.data.count);
    } catch (error) {
      console.error("Failed to fetch cart count", error);
    }
  };
  const refreshCartCount = () => {
    if (user && user.userId) {
      fetchCartCount(user.userId);
    }
  };
  const login = async (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      setAuthState(true, decoded.isAdmin, decoded);
      fetchCartCount(decoded.userId);
      setToken(newToken);
      router.push(decoded.isAdmin ? "/panelAdmin" : "/panelUser/profile");
    } catch (error) {
      console.error("Failed to decode token on login", error);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });
      Cookies.remove("refresh-token"); // Clear cookie
      setAuthState(false, false, null);
      setCartCount(0);
      setToken(null);
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
        login,
        logout,
        cartCount,
        setCartCount,
        refreshCartCount, // Provide the refresh function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
