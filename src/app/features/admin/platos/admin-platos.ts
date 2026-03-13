import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';

@Component({
    selector: 'app-admin-platos',
    imports: [RouterLink, FormsModule, LucideAngularModule],
    templateUrl: './admin-platos.html',
    styleUrl: './admin-platos.css',
})
export class AdminPlatos {
    private platoRepo = inject(PlatoRepository);

    platos = toSignal(this.platoRepo.getPlatos(), { initialValue: [] });
    busqueda = signal('');

    platosFiltrados = computed(() => {
        const term = this.busqueda().toLowerCase();
        if (!term) return this.platos();
        return this.platos().filter(p =>
            p.nombre.toLowerCase().includes(term) ||
            p.categoria.nombre.toLowerCase().includes(term) ||
            p.departamento.nombre.toLowerCase().includes(term)
        );
    });

    eliminarPlato(id: number) {
        if (confirm('¿Estás seguro de eliminar este plato?')) {
            this.platoRepo.deletePlato(id);
        }
    }

    onBusqueda(value: string) {
        this.busqueda.set(value);
    }
}
