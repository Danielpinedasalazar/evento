"use client";

import Carousel from "@/components/carousel";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function HomePage() {
  const { user } = useUser();

  const images = [
    { src: "/Evento1.jpg", alt: "Evento 1" },
    { src: "/Evento2.jpg", alt: "Evento 2" },
    { src: "/Evento3.jpg", alt: "Evento 3" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center py-10 px-4">
      {/* Contenedor principal */}
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/UniversidadLogo.png" alt="Logo de la Universidad" width={120} height={120} />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Eventos Universitarios</h1>
        <p className="text-gray-600 text-lg mb-6">Descubre y gestiona eventos de tu universidad fácilmente.</p>

        {/* Acciones */}
        {!user ? (
          <a
            href="/api/auth/login"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg text-lg shadow-md transition duration-300"
          >
            Iniciar sesión con Auth0
          </a>
        ) : (
          <div>
            <p className="text-lg text-gray-800 mb-4">
              Bienvenido, <span className="font-bold text-blue-600">{user.name}</span>!
            </p>
            <div className="flex space-x-4 justify-center mb-6">
              <a
                href="/eventos"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Ver eventos
              </a>
              <a
                href="/admin"
                className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Panel de administración
              </a>
            </div>
            <a href="/api/auth/logout" className="text-blue-600 hover:text-blue-800 font-bold text-lg">
              Cerrar sesión
            </a>
          </div>
        )}
      </div>

      {/* Carrusel de eventos */}
      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Próximos eventos</h2>
        <Carousel images={images} />
      </div>
    </div>
  );
}
