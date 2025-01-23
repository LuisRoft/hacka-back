import { Module } from '@nestjs/common';
import { ReminentService } from './reminent.service';
import { ReminentController } from './reminent.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule], // Importa el módulo de Supabase
  controllers: [ReminentController],
  providers: [ReminentService],
})
export class ReminentModule {}
