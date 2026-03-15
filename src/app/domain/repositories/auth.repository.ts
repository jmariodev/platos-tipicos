import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

export abstract class AuthRepository {
  abstract login(correo: string, password: string): Observable<Usuario>;
  abstract logout(): void;
}
