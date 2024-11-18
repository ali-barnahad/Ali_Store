import { useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";

const useToken = () => {
  const [token, setToken] = useState(null);

  // Memoize the token to optimize and prevent re-fetching
  const memoizedToken = useMemo(() => {
    const storedToken = Cookies.get("refresh-token");
    if (storedToken) {
      return storedToken;
    }
    return token;
  }, [token]); // Only recompute when the token state changes

  useEffect(() => {
    // If there's no token, set it when the component first mounts
    if (!token) {
      const storedToken = Cookies.get("refresh-token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]); // Ensure this only runs once when there is no token initially

  // Function to update the token manually
  const updateToken = (newToken) => {
    Cookies.set("refresh-token", newToken);
    setToken(newToken); // This will trigger re-computation in useMemo
  };

  return [memoizedToken, updateToken];
};

export default useToken;
