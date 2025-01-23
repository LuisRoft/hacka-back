import { ApiProperty } from '@nestjs/swagger';
export class UpdateDocumentDto {
  @ApiProperty({ description: 'Título del documento', required: false })
  title?: string;

  @ApiProperty({ description: 'Descripción del documento', required: false })
  description?: string;

  @ApiProperty({
    description: 'Tipo del documento (carta, sobre, etc.)',
    required: false,
  })
  tipo?: string;

  @ApiProperty({ description: 'ID del remitente asociado', required: false })
  sender_id?: number;

  @ApiProperty({ description: 'Correo del colaborador', required: false })
  collaborator_email?: string;
}
