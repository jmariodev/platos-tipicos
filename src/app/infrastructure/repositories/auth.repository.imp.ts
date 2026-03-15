import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { Usuario } from '../../domain/models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private http: HttpClient) {
    super();
  }
  login(usuario: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/platos_tipicos/api/login', {
      usuario,
      contrasena,
    });
  }
  logout(): void {
    localStorage.removeItem('usuario');
  }
}
