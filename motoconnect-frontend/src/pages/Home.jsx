import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-5">
      <h2>Bienvenido {user?.name || "Usuario"}</h2>
      <button className="btn btn-danger mt-3" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
