"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Evento {
  id: string;
  titulo: string;
  fecha: string;
}

export default function UsuarioPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
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
    ? eventos.filter(
        (evento) => new Date(evento.fecha).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Eventos Universitarios</h1>
      <p className="text-gray-600 text-lg mb-6">Selecciona un día para ver los eventos programados.</p>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <Calendar 
          onChange={(date) => setSelectedDate(date as Date)} 
          className="react-calendar border-none"
          tileClassName={({ date }) => 
            eventos.some((evento) => new Date(evento.fecha).toDateString() === date.toDateString())
              ? "bg-blue-500 text-white rounded-full"
              : ""
          }
        />
      </div>

      <div className="mt-8 w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eventos del Día - {formattedDate}</h2>
        {eventosDelDia.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {eventosDelDia.map((evento) => (
              <li key={evento.id} className="py-3 px-4 hover:bg-gray-200 rounded-md cursor-pointer">{evento.titulo}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No hay eventos programados para este día.</p>
        )}
      </div>
    </div>
  );
}
