import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { DocumentsModule } from './documents/documents.module';
import { ReminentModule } from './reminent/remiment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    DocumentsModule,
    ReminentModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
