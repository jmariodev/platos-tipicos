import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);

    modo = signal<'login' | 'registro'>('login');
    error = signal('');

    loginForm = this.fb.group({
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    registroForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellido: ['', [Validators.required, Validators.minLength(2)]],
        contacto: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    cambiarModo(modo: 'login' | 'registro') {
        this.modo.set(modo);
        this.error.set('');
    }

    iniciarSesion() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const { correo, password } = this.loginForm.value;
        const result = this.auth.login(correo!, password!);
        if (result.success) {
            this.router.navigate(['/admin']);
        } else {
            this.error.set(result.error!);
        }
    }

    registrarse() {
        if (this.registroForm.invalid) {
            this.registroForm.markAllAsTouched();
            return;
        }
        const val = this.registroForm.value;
        const result = this.auth.registrar({
            nombre: val.nombre!,
            apellido: val.apellido!,
            contacto: val.contacto!,
            correo: val.correo!,
            password: val.password!,
        });
        if (result.success) {
            this.router.navigate(['/admin']);
        } else {
            this.error.set(result.error!);
        }
    }
}
