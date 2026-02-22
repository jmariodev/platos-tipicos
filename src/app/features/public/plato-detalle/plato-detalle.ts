import { Component, inject } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { Plato } from '../../../domain/models/plato.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-plato-detalle',
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './plato-detalle.html',
  styleUrl: './plato-detalle.css',
})
export class PlatoDetalle {
  
  private platoRepository = inject(PlatoRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  plato = toSignal(this.route.params.pipe(
    switchMap(params => this.platoRepository.getPlatoById(Number(params['id'])))
  ));

  comentarioForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    texto: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    console.log(this.plato());
  }

  

  enviarComentario() {
    if (this.comentarioForm.valid) {
      console.log('Datos a enviar:', this.comentarioForm.value);
      this.plato()?.comentarios.push({
        id: this.plato()!.comentarios.length + 1,
        usuario: this.comentarioForm.value.usuario!,
        comentario: this.comentarioForm.value.texto!,
        fecha: new Date()
      });
      // Llamar el servicio para guardar el comentario
      this.comentarioForm.reset(); // Limpia el formulario tras publicar
    }
  }
}
