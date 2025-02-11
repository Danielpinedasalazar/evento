import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export const config = {
  runtime: "nodejs", // 👈 Esto evita que Next.js use Edge Runtime
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { titulo, descripcion, fecha } = req.body;
      const evento = await prisma.evento.create({
        data: {
          titulo,
          descripcion,
          fecha: new Date(fecha),
        },
      });
      return res.status(201).json(evento);
    } catch (error) {
      return res.status(500).json({ error: "Error al crear el evento" });
    }
  }

  if (req.method === "GET") {
    try {
      const eventos = await prisma.evento.findMany();
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener eventos" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
