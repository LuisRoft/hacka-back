export interface Document {
  id: number; // ID del documento (requerido)
  title: string; // Título del documento
  description?: string; // Descripción opcional
  tipo: 'carta' | 'sobre' | 'oficio' | 'paquete'; // Enum de tipo de documento
  sender_id?: number; // ID del remitente (opcional)
  collaborator_email?: string; // Email del colaborador (opcional)
}
