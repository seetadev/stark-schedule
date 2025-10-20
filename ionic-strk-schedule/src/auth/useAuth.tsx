import { useState, useEffect } from "react";
import { useAccount } from "@starknet-react/core";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { address, status } = useAccount();

  // Check localStorage for auth and ensure wallet is still connected
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth_status2");
    setIsAuthenticated(storedAuth === "true");
  }, [isAuthenticated, status]);

  // Login function - only works if wallet is connected
  const login = () => {
    console.log("Login function called", status, address);
    if (status === "connected" && address) {
      localStorage.setItem("auth_status2", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_status2");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    address,
    walletStatus: status,
    login,
    logout,
  };
}
