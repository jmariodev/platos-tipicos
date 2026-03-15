import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../domain/models/usuario.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';

@Injectable({ providedIn: 'root' })
export class UsuarioRepositoryImpl extends UsuarioRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:8080/platos_tipicos/api/usuario');
  }
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:8080/platos_tipicos/api/usuario/${id}`);
  }
  getUsuarioByCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `http://localhost:8080/platos_tipicos/api/usuario/correo/${correo}`,
    );
  }
  createUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/platos_tipicos/api/usuario', usuario);
  }
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `http://localhost:8080/platos_tipicos/api/usuario/${usuario.id}`,
      usuario,
    );
  }
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/platos_tipicos/api/usuario/${id}`);
  }
}
