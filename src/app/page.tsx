"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import "./home.css"; // Importamos el CSS personalizado

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="home-container">
      <h1 className="home-title">Eventos Universitarios</h1>
      <p className="home-subtitle">Administra y descubre eventos fácilmente.</p>

      {!user ? (
        <a href="/api/auth/login" className="login-button">
          Iniciar sesión con Auth0
        </a>
      ) : (
        <div className="user-info">
          <p className="welcome-text">Bienvenido, <span className="user-name">{user.name}</span>!</p>
          <div className="button-group">
            <a href="/usuario" className="user-button">Ver eventos</a>
            <a href="/admin" className="admin-button">Panel de administración</a>
          </div>
          <a href="/api/auth/logout" className="logout-button">Cerrar sesión</a>
        </div>
      )}
    </div>
  );
}
