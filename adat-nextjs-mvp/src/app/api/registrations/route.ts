import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registrationSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/auth';

function normalizeNullable(value?: string | null) {
  return value && value.trim().length ? value.trim() : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registrationSchema.parse(body);

    const registration = await prisma.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        municipality: data.municipality,
        discipline: data.discipline,
        level: data.level,
        clubOrSchool: normalizeNullable(data.clubOrSchool),
        guardianName: normalizeNullable(data.guardianName),
        guardianPhone: normalizeNullable(data.guardianPhone),
        comments: normalizeNullable(data.comments)
      }
    });

    return NextResponse.json({
      message: `Registro recibido correctamente. Folio: ${registration.id}`,
      registration
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'No fue posible guardar el registro.' },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const q = searchParams.get('q')?.trim();

    const registrations = await prisma.registration.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(q
          ? {
              OR: [
                { firstName: { contains: q, mode: 'insensitive' } },
                { lastName: { contains: q, mode: 'insensitive' } },
                { email: { contains: q, mode: 'insensitive' } },
                { phone: { contains: q, mode: 'insensitive' } },
                { municipality: { contains: q, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      orderBy: { createdAt: 'desc' },
      take: 300
    });

    return NextResponse.json({ registrations });
  } catch {
    return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
  }
}
