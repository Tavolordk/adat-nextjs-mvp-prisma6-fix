-- Script opcional si prefieres crear la base desde Supabase SQL Editor.
-- Si usas Prisma, basta con ejecutar: npm run prisma:push

CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'LECTOR');
CREATE TYPE "RegistrationStatus" AS ENUM ('NUEVO', 'REVISADO', 'ACEPTADO', 'RECHAZADO');
CREATE TYPE "Discipline" AS ENUM ('NATACION', 'AGUAS_ABIERTAS', 'CLAVADOS', 'WATERPOLO', 'NADO_ARTISTICO', 'OTRO');
CREATE TYPE "ExperienceLevel" AS ENUM ('PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO', 'ALTO_RENDIMIENTO');

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role "UserRole" NOT NULL DEFAULT 'ADMIN',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_date TIMESTAMP NULL,
  municipality TEXT NOT NULL,
  discipline "Discipline" NOT NULL,
  level "ExperienceLevel" NOT NULL,
  club_or_school TEXT NULL,
  guardian_name TEXT NULL,
  guardian_phone TEXT NULL,
  comments TEXT NULL,
  status "RegistrationStatus" NOT NULL DEFAULT 'NUEVO',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity, entity_id);
