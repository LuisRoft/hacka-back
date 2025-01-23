/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Injectable()
export class DocumentsService {
  private readonly supabase = this.supabaseService.getClient();

  constructor(private readonly supabaseService: SupabaseService) {}

  // Crear un documento
  async createDocument(dto: CreateDocumentDto): Promise<any> {
    const response = await this.supabase
      .from('documents')
      .insert(dto)
      .select()
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al crear documento:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Obtener todos los documentos
  async getDocuments(): Promise<any[]> {
    const response = await this.supabase.from('documents').select('*');
    const { data, error } = response;

    if (error) {
      console.error('Error al obtener documentos:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Obtener un documento por ID
  async getDocumentById(id: number): Promise<any> {
    const response = await this.supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al obtener documento:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Actualizar un documento
  async updateDocument(id: number, dto: UpdateDocumentDto): Promise<any> {
    const response = await this.supabase
      .from('documents')
      .update(dto)
      .eq('id', id)
      .select()
      .single();
    const { data, error } = response;

    if (error) {
      console.error('Error al actualizar documento:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Eliminar un documento
  async deleteDocument(id: number): Promise<string> {
    const response = await this.supabase
      .from('documents')
      .delete()
      .eq('id', id);
    const { error } = response;

    if (error) {
      console.error('Error al eliminar documento:', error.message);
      throw new Error(error.message);
    }
    return `Documento con ID ${id} eliminado correctamente.`;
  }
}
