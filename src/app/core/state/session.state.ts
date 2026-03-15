import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class SessionState {
  private usuarioActual = signal<Usuario | null>(this.loadUsuario());

  usuario = this.usuarioActual.asReadonly();

  setUsuario(usuario: Usuario | null) {
    this.usuarioActual.set(usuario);

    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }

  private loadUsuario(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  getUsuario(): Usuario | null {
    return this.usuarioActual();
  }
}
