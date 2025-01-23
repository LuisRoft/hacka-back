import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReminentService } from './reminent.service';
import { CreateReminentDto } from './dtos/create-reminent.dto';
import { UpdateReminentDto } from './dtos/update-reminent.dto';

@ApiTags('Reminent') // Agrupa los endpoints bajo esta etiqueta
@Controller('remitent')
export class ReminentController {
  constructor(private readonly reminentService: ReminentService) {}

  @ApiOperation({ summary: 'Crear un remitente' })
  @ApiResponse({ status: 201, description: 'Remitente creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear remitente.' })
  @Post()
  create(@Body() createReminentDto: CreateReminentDto) {
    return this.reminentService.createReminent(createReminentDto);
  }

  @ApiOperation({ summary: 'Obtener todos los remitentes' })
  @ApiResponse({ status: 200, description: 'Lista de remitentes.' })
  @Get()
  findAll() {
    return this.reminentService.getReminents();
  }

  @ApiOperation({ summary: 'Obtener un remitente por ID' })
  @ApiResponse({ status: 200, description: 'Remitente encontrado.' })
  @ApiResponse({ status: 404, description: 'Remitente no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reminentService.getReminentById(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar un remitente' })
  @ApiResponse({
    status: 200,
    description: 'Remitente actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Remitente no encontrado.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminentDto: UpdateReminentDto,
  ) {
    return this.reminentService.updateReminent(Number(id), updateReminentDto);
  }

  @ApiOperation({ summary: 'Eliminar un remitente' })
  @ApiResponse({
    status: 200,
    description: 'Remitente eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Remitente no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reminentService.deleteReminent(Number(id));
  }
}
