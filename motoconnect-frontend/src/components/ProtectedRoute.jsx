import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // usamos el hook, no el contexto directo

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // obtenemos el user del contexto

  if (!user) {
    // si no hay usuario, redirige a login
    return <Navigate to="/login" />;
  }

  return children; // si hay usuario, muestra la página
};

export default ProtectedRoute;
