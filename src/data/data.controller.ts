/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('data')
export class DataController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async getData(): Promise<any> {
    return this.supabaseService.getTableData('documents');
  }
}