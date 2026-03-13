import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../domain/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private usuarios = signal<Usuario[]>([]);
    private usuarioActual = signal<Usuario | null>(null);

    isLoggedIn() {
        return this.usuarioActual() !== null;
    }

    getUsuarioActual() {
        return this.usuarioActual();
    }

    login(correo: string, password: string): { success: boolean; error?: string } {
        const usuario = this.usuarios().find(
            u => u.correo === correo && u.password === password
        );
        if (!usuario) {
            return { success: false, error: 'Correo o contraseña incorrectos' };
        }
        this.usuarioActual.set(usuario);
        return { success: true };
    }

    registrar(data: Omit<Usuario, 'id'>): { success: boolean; error?: string } {
        const existe = this.usuarios().find(u => u.correo === data.correo);
        if (existe) {
            return { success: false, error: 'Ya existe un usuario con este correo' };
        }
        const maxId = this.usuarios().reduce((max, u) => Math.max(max, u.id), 0);
        const nuevo: Usuario = { ...data, id: maxId + 1 };
        this.usuarios.update(list => [...list, nuevo]);
        this.usuarioActual.set(nuevo);
        return { success: true };
    }

    logout() {
        this.usuarioActual.set(null);
    }
}
