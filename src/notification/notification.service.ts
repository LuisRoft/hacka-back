import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');

    if (!apiKey) {
      throw new Error('La clave API de SendGrid no está configurada en las variables de entorno');
    }

    sgMail.setApiKey(apiKey);
  }

  /**
   * Envía un correo utilizando una plantilla dinámica de SendGrid.
   * @param to Correo del destinatario
   * @param subject Asunto del correo (opcional, para la plantilla)
   * @param dynamicData Datos dinámicos para la plantilla de SendGrid
   */
  async sendEmailWithTemplate(
    to: string,
    subject: string,
    dynamicData: Record<string, unknown>,
  ): Promise<void> {
    const templateId = this.configService.get<string>('SENDGRID_TEMPLATE_ID');

    if (!templateId) {
      throw new Error('El ID de la plantilla de SendGrid no está configurado en las variables de entorno');
    }

    try {
      const msg = {
        to,
        from: 'xaviedunavi@gmail.com', // Cambiado al correo verificado
        replyTo: 'xaviedunavi@gmail.com', // Opcional: Cambia esto si deseas recibir respuestas en otro correo
        templateId,
        dynamicTemplateData: {
          subject,
          ...dynamicData,
        },
      };

      console.log('Enviando correo con los siguientes datos:', msg);

      await sgMail.send(msg);
      console.log(`Correo enviado exitosamente a ${to}`);
    } catch (error) {
      console.error('Error enviando correo con plantilla:', error.response?.body?.errors || error.message);
      throw new Error('No se pudo enviar el correo.');
    }
  }
}

