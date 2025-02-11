import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  // Si el usuario no ha iniciado sesión, redirigirlo a la página de login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return res;
}

// Solo aplicar el middleware en las rutas protegidas
export const config = {
  matcher: ["/admin/:path*", "/usuario/:path*"],
};
