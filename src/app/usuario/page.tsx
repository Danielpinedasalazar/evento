"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./usuario.css"; // Importamos el CSS personalizado

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
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" }).format(selectedDate));
    }
  }, [selectedDate]);

  const eventosDelDia = selectedDate
    ? eventos.filter(
        (evento) => new Date(evento.fecha).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="usuario-container">
      <h1 className="usuario-title">Eventos Universitarios</h1>
      <p className="usuario-subtitle">Selecciona un día para ver los eventos programados.</p>

      <div className="calendar-container">
        <Calendar 
          onChange={(date) => setSelectedDate(date as Date)} 
          className="custom-calendar"
          tileClassName={({ date }) => 
            eventos.some((evento) => new Date(evento.fecha).toDateString() === date.toDateString()) ? "highlight-day" : ""
          }
        />
      </div>

      <div className="event-list">
        <h2 className="event-title">Eventos del Día - {formattedDate}</h2>
        {eventosDelDia.length > 0 ? (
          <ul>
            {eventosDelDia.map((evento) => (
              <li key={evento.id} className="event-item">{evento.titulo}</li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No hay eventos.</p>
        )}
      </div>
    </div>
  );
}
