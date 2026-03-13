import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { Categoria } from '../../../domain/models/categoria.model';

@Component({
    selector: 'app-admin-categorias',
    imports: [FormsModule, LucideAngularModule],
    templateUrl: './admin-categorias.html',
    styleUrl: './admin-categorias.css',
})
export class AdminCategorias {
    private categoriaRepo = inject(CategoriaRepository);

    categorias = toSignal(this.categoriaRepo.getCategorias(), { initialValue: [] });

    nuevaCategoria = signal('');
    editandoId = signal<number | null>(null);
    editandoNombre = signal('');

    agregar() {
        const nombre = this.nuevaCategoria().trim();
        if (!nombre) return;
        this.categoriaRepo.addCategoria({ id: 0, nombre }).subscribe();
        this.nuevaCategoria.set('');
    }

    iniciarEdicion(categoria: Categoria) {
        this.editandoId.set(categoria.id);
        this.editandoNombre.set(categoria.nombre);
    }

    cancelarEdicion() {
        this.editandoId.set(null);
        this.editandoNombre.set('');
    }

    guardarEdicion() {
        const id = this.editandoId();
        const nombre = this.editandoNombre().trim();
        if (!id || !nombre) return;
        this.categoriaRepo.updateCategoria({ id, nombre }).subscribe();
        this.cancelarEdicion();
    }

    eliminar(id: number) {
        if (confirm('¿Estás seguro de eliminar esta categoría?')) {
            this.categoriaRepo.deleteCategoria(id).subscribe();
        }
    }
}
