import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../domain/models/usuario.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class UsuarioRepositoryImpl extends UsuarioRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/usuario`;

  constructor(private http: HttpClient) {
    super();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
  createUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
