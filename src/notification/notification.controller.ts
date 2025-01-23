import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@ApiTags('Notifications') // Agrupa los endpoints bajo esta etiqueta
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Enviar correo con plantilla' })
  @ApiResponse({ status: 201, description: 'Correo enviado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al enviar correo.' })
  @Post('send-email')
  async sendEmail(
    @Body()
    body: {
      to: string;
      subject: string;
      dynamicData: Record<string, unknown>;
    },
  ) {
    try {
      await this.notificationService.sendEmailWithTemplate(
        body.to,
        body.subject,
        body.dynamicData,
      );
      return { message: 'Correo enviado exitosamente.' };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Error al enviar correo:', error.message);
      throw error;
    }
  }
}
