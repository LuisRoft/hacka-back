import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { DocumentsController } from './documents/documents.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en todos los módulos automáticamente
    }),
    NotificationModule,
  ],
  controllers: [DocumentsController],
})
export class AppModule {}
