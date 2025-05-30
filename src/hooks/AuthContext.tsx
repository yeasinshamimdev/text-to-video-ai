import { useState } from "react";
import { redirect } from "react-router";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<number | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? Number(storedUser) : null;
  });

  const login = (userId: number) => {
    localStorage.setItem("user", userId.toString());
    setUser(userId);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    redirect("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
