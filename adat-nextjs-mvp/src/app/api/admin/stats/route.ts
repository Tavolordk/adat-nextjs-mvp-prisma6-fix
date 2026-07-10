import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();

    const [total, nuevo, revisado, aceptado, rechazado] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: 'NUEVO' } }),
      prisma.registration.count({ where: { status: 'REVISADO' } }),
      prisma.registration.count({ where: { status: 'ACEPTADO' } }),
      prisma.registration.count({ where: { status: 'RECHAZADO' } })
    ]);

    return NextResponse.json({ total, nuevo, revisado, aceptado, rechazado });
  } catch {
    return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
  }
}
