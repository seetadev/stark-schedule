import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  address: string | undefined;
  walletStatus: string;
  login: () => void;
  logout: () => void;
}

// Create and export the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
