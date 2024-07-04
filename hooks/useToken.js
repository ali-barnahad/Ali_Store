// path: hooks/useToken.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("refresh-token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      const fetchToken = async () => {
        try {
          const response = await fetch("/api/get-refresh-token");
          const data = await response.json();
          Cookies.set("refresh-token", data.refreshToken);
          setToken(data.refreshToken);
        } catch (error) {
          console.error("Failed to fetch token", error);
        }
      };

      fetchToken();
    }
  }, []);

  const updateToken = (newToken) => {
    Cookies.set("refresh-token", newToken);
    setToken(newToken);
  };

  return [token, updateToken];
};

export default useToken;
