/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');

    if (!apiKey) {
      throw new Error(
        'La clave API de SendGrid no está configurada en las variables de entorno',
      );
    }

    sgMail.setApiKey(apiKey);
  }

  async sendEmailWithTemplate(
    to: string,
    subject: string,
    dynamicData: Record<string, unknown>,
  ): Promise<void> {
    const templateId = this.configService.get<string>('SENDGRID_TEMPLATE_ID');

    if (!templateId) {
      throw new Error(
        'El ID de la plantilla de SendGrid no está configurado en las variables de entorno',
      );
    }

    try {
      const msg = {
        to,
        from: 'xaviedunavi@gmail.com',
        templateId,
        dynamicTemplateData: { subject, ...dynamicData },
      };

      await sgMail.send(msg);
      console.log(`Correo enviado exitosamente a ${to}`);
    } catch (error) {
      console.error(
        'Error enviando correo:',
        error.response?.body || error.message,
      );
      throw new Error('No se pudo enviar el correo.');
    }
  }
}
