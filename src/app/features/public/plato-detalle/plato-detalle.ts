import { Component, inject } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { Plato } from '../../../domain/models/plato.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plato-detalle',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './plato-detalle.html',
  styleUrl: './plato-detalle.css',
})
export class PlatoDetalle {
  
  private platoRepository = inject(PlatoRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  plato = toSignal(this.route.params.pipe(
    switchMap(params => this.platoRepository.getPlatoById(params['id']))
  ));

  ngOnInit(): void {
    
  }
}
