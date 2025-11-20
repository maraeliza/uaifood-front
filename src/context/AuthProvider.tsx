// context/AuthContext.tsx
"use client";

import { AuthContextProps, UserData } from "@/interfaces/common";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useState } from "react";

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter()
  const logout = () => {
    setUser(null);
    router.push("/auth")
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
