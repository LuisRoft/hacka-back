/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateReminentDto } from './dtos/create-reminent.dto';
import { UpdateReminentDto } from './dtos/update-reminent.dto';

@Injectable()
export class ReminentService {
  private readonly supabase = this.supabaseService.getClient();

  constructor(private readonly supabaseService: SupabaseService) {}

  // Crear un remitente
  async createReminent(dto: CreateReminentDto): Promise<any> {
    const response = await this.supabase
      .from('reminent')
      .insert(dto)
      .select()
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al crear remitente:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Obtener todos los remitentes
  async getReminents(): Promise<any[]> {
    const response = await this.supabase.from('reminent').select('*');
    const { data, error } = response;

    if (error) {
      console.error('Error al obtener remitentes:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Obtener un remitente por ID
  async getReminentById(id: number): Promise<any> {
    const response = await this.supabase
      .from('reminent')
      .select('*')
      .eq('id', id)
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al obtener remitente:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Actualizar un remitente
  async updateReminent(id: number, dto: UpdateReminentDto): Promise<any> {
    const response = await this.supabase
      .from('reminent')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    const { data, error } = response;

    if (error) {
      console.error('Error al actualizar remitente:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Eliminar un remitente
  async deleteReminent(id: number): Promise<string> {
    const response = await this.supabase.from('reminent').delete().eq('id', id);
    const { error } = response;

    if (error) {
      console.error('Error al eliminar remitente:', error.message);
      throw new Error(error.message);
    }

    return `Remitente con ID ${id} eliminado correctamente.`;
  }
}
