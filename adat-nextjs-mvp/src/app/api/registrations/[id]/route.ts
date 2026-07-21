import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { updateRegistrationSchema } from "@/lib/validators";

type Params = {
  params: Promise<{ id: string }>;
};

function normalizeNullable(value?: string | null) {
  return value && value.trim().length ? value.trim() : null;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    const { id } = await params;
    const data = updateRegistrationSchema.parse(await request.json());

    const registration = await prisma.registration.update({
      where: { id },
      data: {
        ...(data.firstName !== undefined
          ? { firstName: data.firstName }
          : {}),
        ...(data.lastName !== undefined ? { lastName: data.lastName } : {}),
        ...(data.email !== undefined ? { email: data.email } : {}),
        ...(data.phone !== undefined ? { phone: data.phone } : {}),
        ...(data.birthDate !== undefined
          ? {
            birthDate: data.birthDate ? new Date(data.birthDate) : null
          }
          : {}),
        ...(data.municipality !== undefined
          ? { municipality: data.municipality }
          : {}),
        ...(data.discipline !== undefined
          ? { discipline: data.discipline }
          : {}),
        ...(data.level !== undefined ? { level: data.level } : {}),
        ...(data.clubOrSchool !== undefined
          ? {
            clubOrSchool: normalizeNullable(data.clubOrSchool)
          }
          : {}),
        ...(data.guardianName !== undefined
          ? {
            guardianName: normalizeNullable(data.guardianName)
          }
          : {}),
        ...(data.guardianPhone !== undefined
          ? {
            guardianPhone: normalizeNullable(data.guardianPhone)
          }
          : {}),
        ...(data.comments !== undefined
          ? {
            comments: normalizeNullable(data.comments)
          }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {})
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action:
          Object.keys(data).length === 1 && data.status
            ? `CAMBIO_STATUS_${data.status}`
            : "ACTUALIZO_AFILIACION",
        entity: "registration",
        entityId: id
      }
    });

    return NextResponse.json({
      message: "Afiliación actualizada.",
      registration
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No fue posible actualizar.";

    return NextResponse.json(
      { message },
      { status: message === "No autorizado" ? 401 : 400 }
    );
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
        action: "ELIMINO_REGISTRO",
        entity: "registration",
        entityId: id
      }
    });

    return NextResponse.json({ message: "Afiliación eliminada." });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No fue posible eliminar.";

    return NextResponse.json(
      { message },
      { status: message === "No autorizado" ? 401 : 400 }
    );
  }
}