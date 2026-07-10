import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { updateRegistrationSchema } from '@/lib/validators';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    const { id } = await params;
    const data = updateRegistrationSchema.parse(await request.json());

    const registration = await prisma.registration.update({
      where: { id },
      data: { status: data.status }
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: `CAMBIO_STATUS_${data.status}`,
        entity: 'registration',
        entityId: id
      }
    });

    return NextResponse.json({ message: 'Registro actualizado.', registration });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No fue posible actualizar.';
    return NextResponse.json({ message }, { status: message === 'No autorizado' ? 401 : 400 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    const { id } = await params;

    await prisma.registration.delete({ where: { id } });
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ELIMINO_REGISTRO',
        entity: 'registration',
        entityId: id
      }
    });

    return NextResponse.json({ message: 'Registro eliminado.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No fue posible eliminar.';
    return NextResponse.json({ message }, { status: message === 'No autorizado' ? 401 : 400 });
  }
}
