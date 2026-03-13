import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaRepository } from "../../domain/repositories/categoria.repository";
import { Categoria } from "../../domain/models/categoria.model";
import { Observable, of, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoriaRepositoryImpl extends CategoriaRepository {

    private apiUrl = 'assets/mock/categorias.json';
    // TODO: Cambiar por la URL del API real, ej: 'http://localhost:8080/api/categorias'

    constructor(private http: HttpClient) {
        super();
    }

    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl);
    }

    getCategoriaById(id: number): Observable<Categoria | undefined> {
        return this.http.get<Categoria[]>(this.apiUrl)
            .pipe(map(categorias => categorias.find(c => c.id === id)));
        // TODO: Cambiar por this.http.get<Categoria>(`${this.apiUrl}/${id}`)
    }

    addCategoria(categoria: Categoria): Observable<Categoria> {
        // TODO: Cambiar por this.http.post<Categoria>(this.apiUrl, categoria)
        return of(categoria);
    }

    updateCategoria(categoria: Categoria): Observable<Categoria> {
        // TODO: Cambiar por this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria)
        return of(categoria);
    }

    deleteCategoria(id: number): Observable<void> {
        // TODO: Cambiar por this.http.delete<void>(`${this.apiUrl}/${id}`)
        return of(undefined);
    }
}
