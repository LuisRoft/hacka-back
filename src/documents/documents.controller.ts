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
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Crear un documento' })
  @ApiResponse({ status: 201, description: 'Documento creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear documento.' })
  @Post('send')
  async sendDocument(
    @Body() document: { title: string; collaborator_email: string },
  ) {
    console.log(
      `Documento "${document.title}" enviado a ${document.collaborator_email}`,
    );

    try {
      await this.notificationService.sendEmailWithTemplate(
        document.collaborator_email,
        'Documento Enviado', // Asunto del correo
        {
          title: document.title,
          email: document.collaborator_email,
        },
      );
      return {
        message: 'Documento enviado y notificación por correo enviada.',
      };
    } catch (error) {
      console.error('Error al enviar el documento:', error.message);
      throw error;
    }
  }

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
