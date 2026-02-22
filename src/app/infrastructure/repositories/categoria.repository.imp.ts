import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaRepository } from "../../domain/repositories/categoria.repository";
import { Categoria } from "../../domain/models/categoria.model";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoriaRepositoryImpl extends CategoriaRepository {

    constructor(private http: HttpClient) {
        super();
    }

    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>('assets/mock/categorias.json');
    }

    getCategoriaById(id: number): Observable<Categoria | undefined> {
        return this.http.get<Categoria[]>('assets/mock/categorias.json')
            .pipe(map(categorias => categorias.find(c => c.id === id)!));
    }
}