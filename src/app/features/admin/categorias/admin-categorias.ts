import { Component, inject, OnInit, signal } from '@angular/core';
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
export class AdminCategorias implements OnInit {
  private categoriaRepository = inject(CategoriaRepository);

  categorias = signal<Categoria[]>([]);

  nuevaCategoria = signal('');
  editandoId = signal<number | null>(null);
  editandoNombre = signal('');

  ngOnInit() {
    this.categoriaRepository.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias.set(categorias);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  agregar() {
    const nombre = this.nuevaCategoria().trim();
    if (!nombre) return;

    this.categoriaRepository.addCategoria({ nombre }).subscribe({
      next: (categoria: Categoria) => {
        this.categorias.update((list) => list.concat(categoria));
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  iniciarEdicion(categoria: Categoria) {
    this.editandoId.set(categoria.id);
    this.editandoNombre.set(categoria.nombre);
  }

  limpiarFormulario() {
    this.editandoId.set(null);
    this.editandoNombre.set('');
  }

  guardarEdicion() {
    const id = this.editandoId();
    const nombre = this.editandoNombre().trim();
    if (!id || !nombre) return;
    this.categoriaRepository.updateCategoria({ id, nombre }).subscribe({
      next: (categoria: Categoria) => {
        this.categorias.update((list) =>
          list.map((cat) => (cat.id === categoria.id ? categoria : cat)),
        );
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaRepository.deleteCategoria(id).subscribe({
        next: () => {
          this.categorias.update((list) => list.filter((c) => c.id !== id));
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
