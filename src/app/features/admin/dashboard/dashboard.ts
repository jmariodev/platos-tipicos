import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { RegionRepository } from '../../../domain/repositories/region.repository';

@Component({
    selector: 'app-admin-dashboard',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class AdminDashboard {
    private platoRepo = inject(PlatoRepository);
    private categoriaRepo = inject(CategoriaRepository);
    private regionRepo = inject(RegionRepository);

    platos = toSignal(this.platoRepo.getPlatos(), { initialValue: [] });
    categorias = toSignal(this.categoriaRepo.getCategorias(), { initialValue: [] });
    regiones = toSignal(this.regionRepo.getRegiones(), { initialValue: [] });
}
