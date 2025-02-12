"use client";

import { useEffect, useState } from "react";

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
      .then((data) => setEventos(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Panel de Administración</h1>
      
      <div className="flex justify-end mb-4">
        <a href="/admin/nuevo-evento" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
          + Crear Evento
        </a>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Título</th>
              <th className="px-6 py-3 text-left">Descripción</th>
              <th className="px-6 py-3 text-left">Fecha</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <tr key={evento.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{evento.titulo}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{evento.descripcion}</td>
                  <td className="px-6 py-4">
                    {new Intl.DateTimeFormat("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(evento.fecha))}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                      onClick={() => {
                        fetch(`/api/eventos/${evento.id}`, { method: "DELETE" })
                          .then(() => setEventos(eventos.filter((e) => e.id !== evento.id)))
                          .catch((error) => console.error("Error deleting event:", error));
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center px-6 py-4 text-gray-500">No hay eventos programados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
