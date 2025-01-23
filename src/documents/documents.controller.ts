import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendDocument(@Body() document: { title: string; collaborator_email: string }) {
    console.log(`Documento "${document.title}" enviado a ${document.collaborator_email}`);

    try {
      await this.notificationService.sendEmailWithTemplate(
        document.collaborator_email,
        'Documento Enviado', // Asunto del correo
        {
          title: document.title,
          email: document.collaborator_email,
        }
      );
      return { message: 'Documento enviado y notificación por correo enviada.' };
    } catch (error) {
      console.error('Error al enviar el documento:', error.message);
      throw error;
    }
  }
}
