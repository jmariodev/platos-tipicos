import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

export abstract class UsuarioRepository {
  abstract getUsuarios(): Observable<Usuario[]>;
  abstract getUsuarioById(id: number): Observable<Usuario>;
  abstract getUsuarioByCorreo(correo: string): Observable<Usuario>;
  abstract createUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario>;
  abstract updateUsuario(usuario: Usuario): Observable<Usuario>;
  abstract deleteUsuario(id: number): Observable<void>;
}
