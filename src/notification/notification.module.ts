import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Module({
  imports: [ConfigModule], // Importa ConfigModule para que ConfigService esté disponible
  providers: [NotificationService],
  exports: [NotificationService], // Exporta NotificationService para que otros módulos puedan usarlo
})
export class NotificationModule {}

