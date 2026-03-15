import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Plato } from '../../../domain/models/plato.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Comentarios } from '../../../domain/models/comentarios.model';
import { ComentarioRepository } from '../../../domain/repositories/comentario.repository';

@Component({
  selector: 'app-plato-detalle',
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './plato-detalle.html',
  styleUrl: './plato-detalle.css',
})
export class PlatoDetalle {
  private platoRepository = inject(PlatoRepository);
  private comentarioRepository = inject(ComentarioRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  plato = toSignal(
    this.route.params.pipe(
      switchMap((params) => this.platoRepository.getPlatoById(Number(params['id']))),
    ),
  );

  comentarioForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    texto: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    console.log(this.plato());
  }

  async enviarComentario() {
    if (this.comentarioForm.valid) {
      console.log('Datos a enviar:', this.comentarioForm.value);
      // Llamar el servicio para guardar el comentario
      const comentario: Comentarios = {
        nombre: this.comentarioForm.value.usuario!,
        comentario: this.comentarioForm.value.texto!,
        plato: { id: this.plato()?.id! },
      };

      const comentarioGuardado = await firstValueFrom(
        this.comentarioRepository.addComentario(comentario),
      );
      if (!comentarioGuardado || comentarioGuardado.id == null) {
        alert('Error al guardar el comentario');
        return;
      }
      this.plato()?.comentarios!.push(comentarioGuardado);
      this.comentarioForm.reset(); // Limpia el formulario tras publicar
    }
  }
}
