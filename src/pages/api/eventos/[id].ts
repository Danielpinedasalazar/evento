import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export const config = {
  runtime: "nodejs", // 👈 Esto evita que Next.js use Edge Runtime
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await prisma.evento.delete({
        where: { id: String(id) },
      });
      return res.status(200).json({ message: "Evento eliminado" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar el evento" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
