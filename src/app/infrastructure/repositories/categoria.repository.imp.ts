import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaRepository } from '../../domain/repositories/categoria.repository';
import { Categoria } from '../../domain/models/categoria.model';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaRepositoryImpl extends CategoriaRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/platos_tipicos/api/categoria');
  }

  getCategoriaById(id: number): Observable<Categoria | undefined> {
    return this.http.get<Categoria>(`http://localhost:8080/platos_tipicos/api/categoria/${id}`);
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
