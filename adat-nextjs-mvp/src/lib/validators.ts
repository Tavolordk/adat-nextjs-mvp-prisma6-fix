import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Correo inválido').trim().toLowerCase(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export const registrationSchema = z.object({
  firstName: z.string().trim().min(2, 'Nombre requerido').max(80),
  lastName: z.string().trim().min(2, 'Apellidos requeridos').max(120),
  email: z.string().email('Correo inválido').trim().toLowerCase(),
  phone: z.string().trim().min(8, 'Teléfono requerido').max(25),
  birthDate: z.string().optional().nullable(),
  municipality: z.string().trim().min(2, 'Municipio requerido').max(100),
  discipline: z.enum(['NATACION', 'AGUAS_ABIERTAS', 'CLAVADOS', 'WATERPOLO', 'NADO_ARTISTICO', 'OTRO']),
  level: z.enum(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO', 'ALTO_RENDIMIENTO']),
  clubOrSchool: z.string().trim().max(140).optional().nullable(),
  guardianName: z.string().trim().max(140).optional().nullable(),
  guardianPhone: z.string().trim().max(25).optional().nullable(),
  comments: z.string().trim().max(600).optional().nullable()
});

export const updateRegistrationSchema = z.object({
  status: z.enum(['NUEVO', 'REVISADO', 'ACEPTADO', 'RECHAZADO'])
});
