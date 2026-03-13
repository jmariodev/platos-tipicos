import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Plato } from '../../../../../domain/models/plato.model';

@Component({
  selector: 'app-listado',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './listado.html',
  styleUrl: './listado.css',
})
export class Listado {
  platos = input<Plato[]>();
  limpiar = output<void>();

  imagenPrincipal(plato: Plato) {
    return plato.galeria.find((g) => g.esPrincipal)?.url || '';
  }
}
