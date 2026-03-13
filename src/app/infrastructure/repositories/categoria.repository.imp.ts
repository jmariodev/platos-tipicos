import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaRepository } from "../../domain/repositories/categoria.repository";
import { Categoria } from "../../domain/models/categoria.model";
import { Observable, BehaviorSubject, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoriaRepositoryImpl extends CategoriaRepository {
    private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
    private loaded = false;

    constructor(private http: HttpClient) {
        super();
    }

    private loadIfNeeded(): void {
        if (!this.loaded) {
            this.loaded = true;
            this.http.get<Categoria[]>('assets/mock/categorias.json').subscribe(data => {
                this.categoriasSubject.next(data);
            });
        }
    }

    getCategorias(): Observable<Categoria[]> {
        this.loadIfNeeded();
        return this.categoriasSubject.asObservable();
    }

    getCategoriaById(id: number): Observable<Categoria | undefined> {
        this.loadIfNeeded();
        return this.categoriasSubject.pipe(
            map(categorias => categorias.find(c => c.id === id))
        );
    }

    addCategoria(categoria: Categoria): void {
        const current = this.categoriasSubject.getValue();
        const maxId = current.reduce((max, c) => Math.max(max, c.id), 0);
        categoria.id = maxId + 1;
        this.categoriasSubject.next([...current, categoria]);
    }

    updateCategoria(categoria: Categoria): void {
        const current = this.categoriasSubject.getValue();
        const index = current.findIndex(c => c.id === categoria.id);
        if (index !== -1) {
            const updated = [...current];
            updated[index] = categoria;
            this.categoriasSubject.next(updated);
        }
    }

    deleteCategoria(id: number): void {
        const current = this.categoriasSubject.getValue();
        this.categoriasSubject.next(current.filter(c => c.id !== id));
    }
}
