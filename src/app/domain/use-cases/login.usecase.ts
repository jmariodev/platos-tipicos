import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { SessionState } from '../../core/state/session.state';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private authRepository = inject(AuthRepository);
  private sessionState = inject(SessionState);

  execute(usuario: string, contrasena: string) {
    return this.authRepository
      .login(usuario, contrasena)
      .pipe(tap((res) => this.sessionState.setUsuario(res)));
  }
}
