import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { disciplineLabels, levelLabels, statusLabels } from '@/lib/format';

function csvCell(value: unknown) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  try {
    await requireAdmin();
    const records = await prisma.registration.findMany({ orderBy: { createdAt: 'desc' } });

    const header = [
      'Folio',
      'Fecha registro',
      'Nombre',
      'Apellidos',
      'Correo',
      'Teléfono',
      'Municipio',
      'Disciplina',
      'Nivel',
      'Club/Escuela',
      'Tutor',
      'Teléfono tutor',
      'Estatus',
      'Comentarios'
    ];

    const rows = records.map((item) => [
      item.id,
      item.createdAt.toISOString(),
      item.firstName,
      item.lastName,
      item.email,
      item.phone,
      item.municipality,
      disciplineLabels[item.discipline],
      levelLabels[item.level],
      item.clubOrSchool,
      item.guardianName,
      item.guardianPhone,
      statusLabels[item.status],
      item.comments
    ]);

    const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="registros-adat.csv"'
      }
    });
  } catch {
    return NextResponse.json({ message: 'No autorizado.' }, { status: 401 });
  }
}
