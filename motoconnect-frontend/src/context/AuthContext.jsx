import { createContext, useState, useContext } from "react";

// Crear contexto
const AuthContext = createContext();

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
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
};

// Hook para usar AuthContext
export const useAuth = () => useContext(AuthContext);

// Exportar el contexto por si acaso
export default AuthContext;
