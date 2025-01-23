import { ApiProperty } from '@nestjs/swagger';

export class UpdateReminentDto {
  @ApiProperty({ description: 'Nombre del remitente', required: false })
  name?: string;

  @ApiProperty({ description: 'Correo del remitente', required: false })
  mail?: string;

  @ApiProperty({ description: 'Cédula del remitente', required: false })
  cedula?: number;

  @ApiProperty({ description: 'Institución del remitente', required: false })
  institution?: string;
}
