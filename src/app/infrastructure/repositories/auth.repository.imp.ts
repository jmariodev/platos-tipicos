import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { Usuario } from '../../domain/models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl extends AuthRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/login`;

  constructor(private http: HttpClient) {
    super();
  }
  login(usuario: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, {
      usuario,
      contrasena,
    });
  }
  logout(): void {
    localStorage.removeItem('usuario');
  }
}
