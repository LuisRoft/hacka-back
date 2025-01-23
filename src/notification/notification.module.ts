import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Module({
  imports: [ConfigModule],
  providers: [NotificationService],
  controllers: [], // Puedes agregar aquí un controlador si lo necesitas
  exports: [NotificationService], // Exporta el servicio
})
export class NotificationModule {}
