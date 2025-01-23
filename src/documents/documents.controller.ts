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
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@ApiTags('Documents') // Agrupa los endpoints bajo esta etiqueta
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @ApiOperation({ summary: 'Crear un documento' })
  @ApiResponse({ status: 201, description: 'Documento creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear documento.' })
  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.createDocument(createDocumentDto);
  }

  @ApiOperation({ summary: 'Obtener todos los documentos' })
  @ApiResponse({ status: 200, description: 'Lista de documentos.' })
  @Get()
  findAll() {
    return this.documentsService.getDocuments();
  }

  @ApiOperation({ summary: 'Obtener un documento por ID' })
  @ApiResponse({ status: 200, description: 'Documento encontrado.' })
  @ApiResponse({ status: 404, description: 'Documento no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.getDocumentById(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar un documento' })
  @ApiResponse({
    status: 200,
    description: 'Documento actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Documento no encontrado.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.updateDocument(Number(id), updateDocumentDto);
  }

  @ApiOperation({ summary: 'Eliminar un documento' })
  @ApiResponse({
    status: 200,
    description: 'Documento eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Documento no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.deleteDocument(Number(id));
  }
}
