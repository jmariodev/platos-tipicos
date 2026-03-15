import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { LoginUseCase } from '../../domain/use-cases/login.usecase';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginUseCase = inject(LoginUseCase);

  modo = signal<'login' | 'registro'>('login');
  error = signal('');

  loginForm = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
  });

  registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  cambiarModo(modo: 'login' | 'registro') {
    this.modo.set(modo);
    this.error.set('');
  }

  iniciarSesion() {
    this.error.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { usuario, contrasena } = this.loginForm.value;
    this.loginUseCase.execute(usuario!, contrasena!).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
        this.loginForm.reset();
      },
      error: (error: any) => {
        this.error.set(error.error);
      },
    });
  }

  /* registrarse() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
    const val = this.registroForm.value;
    const result = this.auth.registrar({
      nombre: val.nombre!,
      usuario: val.usuario!,
      contrasena: val.contrasena!,
    });
    if (result.success) {
      this.router.navigate(['/admin']);
    } else {
      this.error.set(result.error!);
    }
  } */
}
