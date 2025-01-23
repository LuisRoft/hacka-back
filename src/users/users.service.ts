/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-users.dto';

@Injectable()
export class UsersService {
  private readonly supabase = this.supabaseService.getClient();

  constructor(private readonly supabaseService: SupabaseService) {}

  // Crear un usuario
  async createUser(dto: CreateUserDto): Promise<any> {
    const response = await this.supabase
      .from('users')
      .insert(dto)
      .select()
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al crear usuario:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<any[]> {
    const response = await this.supabase.from('users').select('*');
    const { data, error } = response;

    if (error) {
      console.error('Error al obtener usuarios:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Obtener un usuario por ID
  async getUserById(id: number): Promise<any> {
    const response = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al obtener usuario:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Actualizar un usuario
  async updateUser(id: number, dto: UpdateUserDto): Promise<any> {
    const response = await this.supabase
      .from('users')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    const { data, error } = response;

    if (error) {
      console.error('Error al actualizar usuario:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<string> {
    const response = await this.supabase.from('users').delete().eq('id', id);
    const { error } = response;

    if (error) {
      console.error('Error al eliminar usuario:', error.message);
      throw new Error(error.message);
    }

    return `Usuario con ID ${id} eliminado correctamente.`;
  }
}
