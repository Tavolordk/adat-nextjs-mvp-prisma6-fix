# ADAT Next.js MVP

Proyecto pequeño en **Next.js monolítico** para ADAT:

- Landing pública estilo deportivo.
- Registro público de atletas/interesados.
- Login administrativo con cookie HttpOnly.
- Panel administrativo protegido.
- Consulta, filtro, cambio de estatus y eliminación de registros.
- Exportación CSV.
- Base de datos PostgreSQL mediante Prisma.

## Stack

- Next.js + TypeScript
- CSS global sin dependencia de UI pesada
- Prisma ORM
- PostgreSQL gratuito: Supabase / Neon / Render PostgreSQL
- JWT con cookie HttpOnly
- bcryptjs para contraseñas
- zod para validaciones

## Estructura

```txt
src/app
  page.tsx                      Landing pública
  registro/page.tsx             Formulario público
  login/page.tsx                Login administrativo
  admin/page.tsx                Dashboard
  admin/registros/page.tsx      Administración de registros
  api/auth/login/route.ts       Login
  api/auth/logout/route.ts      Logout
  api/auth/me/route.ts          Usuario actual
  api/registrations/route.ts    Crear/listar registros
  api/registrations/[id]/route.ts Actualizar/eliminar registros
  api/admin/stats/route.ts      Indicadores
  api/admin/export/registrations/route.ts Export CSV
```

## Instalación

```bash
npm install
cp .env.example .env
```

Configura `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
JWT_SECRET="un-secreto-largo"
ADMIN_EMAIL="admin@adat.com.mx"
ADMIN_PASSWORD="Adat2026!*"
ADMIN_NAME="Administrador ADAT"
```

## Crear tablas

Opción recomendada con Prisma:

```bash
npm run prisma:push
npm run seed
```

Opción manual:

- Abre `prisma/supabase.sql`
- Cópialo en Supabase SQL Editor
- Ejecuta el script

## Levantar local

```bash
npm run dev
```

Abre:

```txt
http://localhost:3000
```

Login demo inicial después de ejecutar `npm run seed`:

```txt
Correo: admin@adat.com.mx
Contraseña: Adat2026!*
```

Cambia la contraseña antes de publicar.

## Deploy gratis recomendado

Para mantenerlo simple:

- Front + API routes: Vercel o Cloudflare Pages compatible con Next.js.
- Base de datos: Supabase o Neon PostgreSQL.

Para producción, configura las variables de entorno en el panel del hosting.

## Pendientes recomendados para producción

- Agregar Cloudflare Turnstile al formulario público.
- Pantalla para crear/editar usuarios administrativos.
- Recuperación de contraseña.
- Bitácora visible de cambios.
- Políticas de privacidad y aviso de tratamiento de datos.
- Página de eventos/convocatorias administrable.


## Nota Prisma

Este proyecto fija Prisma en `6.19.0` para conservar la configuración clásica en `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

No uses `prisma@latest` aquí, porque Prisma 7 mueve la URL de conexión a `prisma.config.ts` y rompe esta configuración.
