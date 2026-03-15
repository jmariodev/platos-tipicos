import { Component, computed, inject, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { RegionRepository } from '../../../domain/repositories/region.repository';
import { Region } from '../../../domain/models/region.model';
import { DepartamentoRepository } from '../../../domain/repositories/departamento.repository';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-regiones',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './admin-regiones.html',
  styleUrl: './admin-regiones.css',
})
export class AdminRegiones {
  private regionRepository = inject(RegionRepository);
  private departamentoRepository = inject(DepartamentoRepository);

  regiones = toSignal(this.regionRepository.getRegiones(), { initialValue: [] });

  // Expandir región
  expandedRegionId = signal<number | null>(null);

  toggleExpand(regionId: number) {
    if (this.expandedRegionId() == regionId) {
      this.expandedRegionId.set(null);
      return;
    }
    this.expandedRegionId.set(regionId);
  }

  departamentosResource = resource({
    params: () => this.expandedRegionId(),
    loader: async ({ params }) => {
      if (!params) return [];
      const departamentos = firstValueFrom(
        this.departamentoRepository.getDepartamentosByRegionId(params),
      );
      return departamentos;
    },
  });

  departamentos = computed(() => this.departamentosResource.value() ?? []);
}
