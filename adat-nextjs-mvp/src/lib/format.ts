export const statusLabels: Record<string, string> = {
  NUEVO: 'Nuevo',
  REVISADO: 'Revisado',
  ACEPTADO: 'Aceptado',
  RECHAZADO: 'Rechazado'
};

export const disciplineLabels: Record<string, string> = {
  NATACION: 'Natación',
  AGUAS_ABIERTAS: 'Aguas abiertas',
  CLAVADOS: 'Clavados',
  WATERPOLO: 'Waterpolo',
  NADO_ARTISTICO: 'Nado artístico',
  OTRO: 'Otro'
};

export const levelLabels: Record<string, string> = {
  PRINCIPIANTE: 'Principiante',
  INTERMEDIO: 'Intermedio',
  AVANZADO: 'Avanzado',
  ALTO_RENDIMIENTO: 'Alto rendimiento'
};

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}
