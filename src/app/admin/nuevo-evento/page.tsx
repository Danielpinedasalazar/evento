"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoEvento() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, fecha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error al crear el evento: " + errorData.error);
        return;
      }

      alert("Evento creado exitosamente!");
      router.push("/admin"); // Redirige a la lista de eventos
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Evento</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Crear Evento
        </button>
      </form>
    </div>
  );
}
