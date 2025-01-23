import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule], // Importa el módulo de Supabase
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
