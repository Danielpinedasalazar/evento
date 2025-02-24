import { NextResponse ,NextRequest} from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener eventos ordenados por fecha
    const eventos = await prisma.evento.findMany({
      orderBy: { fecha: "asc" },
    });

    return NextResponse.json(eventos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { titulo, descripcion, fecha } = body;

    if (!titulo || !descripcion || !fecha) {
      return NextResponse.json({ message: "Faltan datos requeridos" }, { status: 400 });
    }

    const nuevoEvento = await prisma.evento.create({
      data: { titulo, descripcion, fecha: new Date(fecha) },
    });

    return NextResponse.json(nuevoEvento, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
