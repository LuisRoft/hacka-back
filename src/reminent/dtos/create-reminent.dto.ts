import { ApiProperty } from '@nestjs/swagger';

export class CreateReminentDto {
  @ApiProperty({ description: 'Nombre del remitente' })
  name: string;

  @ApiProperty({ description: 'Correo del remitente' })
  mail: string;

  @ApiProperty({ description: 'Cédula del remitente' })
  cedula: number;

  @ApiProperty({ description: 'Institución del remitente' })
  institution: string;
}
