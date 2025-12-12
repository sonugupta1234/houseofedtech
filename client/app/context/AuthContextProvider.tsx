"use client";

import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: ProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
