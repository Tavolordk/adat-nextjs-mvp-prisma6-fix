import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@adat.com.mx';
  const password = process.env.ADMIN_PASSWORD || 'Adat2026!*';
  const name = process.env.ADMIN_NAME || 'Administrador ADAT';
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: UserRole.SUPER_ADMIN, active: true },
    create: { email, name, passwordHash, role: UserRole.SUPER_ADMIN, active: true }
  });

  console.log(`Admin listo: ${email}`);
  console.log('Cambia la contraseña inicial antes de publicar el sitio.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
