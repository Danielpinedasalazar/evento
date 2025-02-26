"use client";

import { ReactNode, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Evento {
  descripcion: ReactNode;
  id: string;
  titulo: string;
  fecha: string;
}

export default function UsuarioPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false); // ✅ Evita SSR issues

  useEffect(() => {
    setIsClient(true); // ✅ Indicar que estamos en el cliente

    const fetchEventos = async () => {
      try {
        const res = await fetch("/api/eventos");
        if (!res.ok) {
          throw new Error("Error al obtener eventos");
        }
        const data = await res.json();  
        setEventos(data);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchEventos();
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(
        new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" }).format(selectedDate)
      );
    }
  }, [selectedDate]);

  const eventosDelDia = selectedDate
  ? eventos.filter((evento) => {
      const eventoFecha = new Date(evento.fecha).toISOString().split("T")[0]; // YYYY-MM-DD
      const selectedFecha = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      return eventoFecha === selectedFecha;
    })
  : [];


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Eventos Universitarios</h1>
      <p className="text-gray-600 text-lg mb-6">Selecciona un día para ver los eventos programados.</p>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {isClient && ( // ✅ Evita renderizar el calendario hasta que esté en el cliente
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            className="react-calendar border-none"
            tileClassName={({ date }) => {
              const tieneEvento = eventos.some(
                (evento) => new Date(evento.fecha).toDateString() === date.toDateString()
              );
              return tieneEvento ? "relative text-black" : "";
            }}
            tileContent={({ date }) => {
              const tieneEvento = eventos.some(
                (evento) => new Date(evento.fecha).toDateString() === date.toDateString()
              );
              return tieneEvento ? (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              ) : null;
            }}
          />
        )}
      </div>

      <div className="mt-6">
  <h2 className="text-xl font-semibold">
    Eventos del Día: {selectedDate ? selectedDate.toLocaleDateString("es-ES") : ""}
  </h2>
  
  {eventosDelDia.length > 0 ? (
    <ul className="mt-4 space-y-2">
      {eventosDelDia.map((evento) => (
        <li key={evento.id} className="p-4 border rounded-lg bg-blue-100">
          <h3 className="font-bold">{evento.titulo}</h3>
          <p>{evento.descripcion}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-4 text-gray-600">No hay eventos programados para este día.</p>
  )}
</div>

    </div>
  );
}