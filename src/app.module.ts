import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { DocumentsController } from './documents/documents.controller';
import { SupabaseModule } from './supabase/supabase.module';
import { DocumentsModule } from './documents/documents.module';
import { ReminentModule } from './reminent/remiment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en todos los módulos automáticamente
    }),
    NotificationModule,
    SupabaseModule,
    DocumentsModule,
    ReminentModule,
    UsersModule,
  ],
  controllers: [DocumentsController],
})
export class AppModule {}
