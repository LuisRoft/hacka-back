import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL o Key no está definido');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Nuevo método para obtener datos de una tabla
  async getTableData<T>(tableName: string): Promise<T[]> {
    const { data, error } = await this.supabase.from(tableName).select('*');
    if (error) {
      console.error(
        `Error al obtener datos de la tabla ${tableName}:`,
        error.message,
      );
      throw new Error(
        `Error al obtener datos de la tabla ${tableName}: ${error.message}`,
      );
    }
    return data as T[];
  }
}
