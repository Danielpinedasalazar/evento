"use client";

import { useEffect, useState } from "react";
import "./admin.css"; // Importamos el CSS personalizado

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
}

export default function AdminPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data));
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      <a href="/admin/nuevo-evento" className="create-button">
        + Crear Evento
      </a>

      <div className="table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.titulo}</td>
                  <td>{evento.descripcion}</td>
                  <td>
                    {new Intl.DateTimeFormat("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(evento.fecha))}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => {
                        fetch(`/api/eventos/${evento.id}`, { method: "DELETE" })
                          .then(() => setEventos(eventos.filter((e) => e.id !== evento.id)));
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-events">No hay eventos programados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
