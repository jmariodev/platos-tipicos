import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-listado',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './listado.html',
  styleUrl: './listado.css',
})
export class Listado {

  platos = input<any[]>();
  limpiar = output<void>();
  
}
