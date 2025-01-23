import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', required: false })
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    required: false,
  })
  mail?: string;
}
