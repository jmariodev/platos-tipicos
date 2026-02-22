import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Categoria } from '../../../../../domain/models/categoria.model';
import { Departamento } from '../../../../../domain/models/departamento.model';
import { Region } from '../../../../../domain/models/region.model';

@Component({
  selector: 'app-filtros',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css',
})
export class Filtros {

  filtersOpen = false;

  @Input() searchTerm = '';
  @Input() categorias: Categoria[] = [];
  @Input() departamentos: Departamento[] = [];
  @Input() regiones: Region[] = [];
  @Input() regionSeleccionada = 0;
  @Input() departamentoSeleccionado = 0;
  @Input() categoriaSeleccionada = 0;

  @Output() searchChange = new EventEmitter<string>();
  @Output() categoriaChange = new EventEmitter<number>();
  @Output() departamentoChange = new EventEmitter<number>();
  @Output() regionChange = new EventEmitter<number>();
  
}
