import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { DocumentsModule } from './documents/documents.module';
import { ReminentModule } from './reminent/remiment.module';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
    DocumentsModule,
    ReminentModule,
    UsersModule,
    SupabaseModule,
  ],
})
export class AppModule {}
