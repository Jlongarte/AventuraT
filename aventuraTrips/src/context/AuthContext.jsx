import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) return { token, id: null, name: null, email: null, imageUrl: null };
    return null;
  });

  const login = ({ token, id, name, email, imageUrl }) => {
    localStorage.setItem("token", token);
    setUser({ token, id, name, email, imageUrl });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}