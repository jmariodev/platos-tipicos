import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { RegionRepository } from '../../../domain/repositories/region.repository';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { Plato } from '../../../domain/models/plato.model';
import { Listado } from './components/listado/listado';
import { Filtros } from './components/filtros/filtros';
import { Region } from '../../../domain/models/region.model';
import { Categoria } from '../../../domain/models/categoria.model';
import { Departamento } from '../../../domain/models/departamento.model';
import { LucideAngularModule } from "lucide-angular";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-platos',
  imports: [Listado, Filtros, LucideAngularModule],
  templateUrl: './platos.html',
  styleUrl: './platos.css',
})
export class Platos {

  private platosRepository = inject(PlatoRepository);
  private regionRepository = inject(RegionRepository);
  private categoriaRepository = inject(CategoriaRepository);

  platos = toSignal(this.platosRepository.getPlatos(),{initialValue: [] as Plato[]});
  regiones = toSignal(this.regionRepository.getRegiones(),{initialValue: [] as Region[]});/* 
  departamentos = signal<Departamento[]>(this.regiones().flatMap(region => region.departamentos)); */
  categorias = toSignal(this.categoriaRepository.getCategorias(),{initialValue: [] as Categoria[]});

  // señales para guardar el filtro seleccionado
  searchTerm = signal('');
  regionSeleccionada = signal(0);
  departamentoSeleccionado = signal(0);
  categoriaSeleccionada = signal(0);

  private route = inject(ActivatedRoute);

ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const id = params.get('regionId');
    this.regionSeleccionada.set(Number(id));
  });
}




  regionSeleccionadaObj = computed(() => this.regiones().find(r => r.id == this.regionSeleccionada()));

  departamentos = computed(() => this.regionSeleccionadaObj()?.departamentos || []);

  platosFiltrados = computed(() => {
    console.log(this.regionSeleccionada());
    
    const region = this.regionSeleccionadaObj();

    return this.platos()
      .filter(p =>
        this.regionSeleccionada() == 0 || region?.departamentos.some(d => d.id == p.departamento.id)
      )
      .filter(p =>
        this.searchTerm() == '' ||
        p.nombre.toLowerCase().includes(this.searchTerm().toLowerCase())
      )
      .filter(p =>
        this.categoriaSeleccionada() == 0 ||
        p.categoria.id == this.categoriaSeleccionada()
      )
      .filter(p =>
        this.departamentoSeleccionado() == 0 ||
        p.departamento.id == this.departamentoSeleccionado()
      );
  });

  limpiarFiltros() {
    this.searchTerm.set('');
    this.categoriaSeleccionada.set(0);
    this.departamentoSeleccionado.set(0);
    this.regionSeleccionada.set(0);
  }
  
}
