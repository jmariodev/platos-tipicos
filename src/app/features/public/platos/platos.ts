import { Component, computed, effect, inject, resource, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { RegionRepository } from '../../../domain/repositories/region.repository';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { DepartamentoRepository } from '../../../domain/repositories/departamento.repository';
import { Plato } from '../../../domain/models/plato.model';
import { Listado } from './components/listado/listado';
import { Filtros } from './components/filtros/filtros';
import { Region } from '../../../domain/models/region.model';
import { Categoria } from '../../../domain/models/categoria.model';
import { Departamento } from '../../../domain/models/departamento.model';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
  private departamentoRepository = inject(DepartamentoRepository);

  regiones = toSignal(this.regionRepository.getRegiones(), { initialValue: [] as Region[] });
  categorias = toSignal(this.categoriaRepository.getCategorias(), {
    initialValue: [] as Categoria[],
  });

  // señales para guardar el filtro seleccionado
  searchTerm = signal('');
  regionSeleccionada = signal(0);
  departamentoSeleccionado = signal(0);
  categoriaSeleccionada = signal(0);

  private route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('regionId');
      this.regionSeleccionada.set(Number(id) || 0);
    });
  }

  //Los resource son para cargar datos de forma asincrona y evitar el uso de useEffect
  //los resource se ejecutan cuando se inicializa el componente y cuando cambia el valor de la variable params
  platosResource = resource({
    params: () => this.regionSeleccionada(),

    loader: async ({ params }) => {
      if (params == undefined) return [];

      if (params === 0) return firstValueFrom(this.platosRepository.getPlatos());

      return firstValueFrom(this.platosRepository.getPlatosByRegion(params));
    },
  });

  //la computed es para crear una señal basada en el resultado de la funcion loader del resource
  platos = computed(() => this.platosResource.value() ?? []);

  departamentosResource = resource({
    params: () => this.regionSeleccionada(),

    loader: async ({ params }) => {
      if (!params) return [];

      return firstValueFrom(this.departamentoRepository.getDepartamentosByRegionId(params));
    },
  });

  departamentos = computed(() => this.departamentosResource.value() ?? []);

  regionSeleccionadaObj = computed(() =>
    this.regiones().find((r) => r.id == this.regionSeleccionada()),
  );

  platosFiltrados = computed(() => {
    console.log(this.regionSeleccionada());

    return this.platos()
      .filter(
        (p) =>
          this.regionSeleccionada() == 0 ||
          this.departamentos().some((d) => d.id == p.departamento.id),
      )
      .filter(
        (p) =>
          this.searchTerm() == '' ||
          p.nombre.toLowerCase().includes(this.searchTerm().toLowerCase()),
      )
      .filter(
        (p) => this.categoriaSeleccionada() == 0 || p.categoria.id == this.categoriaSeleccionada(),
      )
      .filter(
        (p) =>
          this.departamentoSeleccionado() == 0 ||
          p.departamento.id == this.departamentoSeleccionado(),
      );
  });

  limpiarFiltros() {
    this.searchTerm.set('');
    this.categoriaSeleccionada.set(0);
    this.departamentoSeleccionado.set(0);
    this.regionSeleccionada.set(0);
  }
}
