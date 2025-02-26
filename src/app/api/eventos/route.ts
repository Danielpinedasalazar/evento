import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Verifica que este archivo existe y está correcto

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany();
    return NextResponse.json(eventos);
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return NextResponse.json({ error: "Error al obtener eventos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titulo, descripcion, fecha } = body;

    if (!titulo || !descripcion || !fecha) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const evento = await prisma.evento.create({
      data: { titulo, descripcion, fecha: new Date(fecha) },
    });

    return NextResponse.json(evento, { status: 201 });
  } catch (error) {
    console.error("Error al crear evento:", error);
    return NextResponse.json({ error: "Error al crear el evento" }, { status: 500 });
  }
}
