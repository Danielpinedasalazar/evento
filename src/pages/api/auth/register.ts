import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { role } = req.body;
  if (!role || (role !== 'usuario' && role !== 'admin')) {
    return res.status(400).json({ error: 'Rol inválido' });
  }

  try {
    const user = await prisma.usuario.upsert({
      where: { email: session.user.email },
      update: { role },
      create: {
        email: session.user.email,
        name: session.user.name || '',
        role,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
}
