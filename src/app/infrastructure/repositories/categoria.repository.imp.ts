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
    return this.http.post<Categoria>(
      'http://localhost:8080/platos_tipicos/api/categoria',
      categoria,
    );
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `http://localhost:8080/platos_tipicos/api/categoria/${categoria.id}`,
      categoria,
    );
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/platos_tipicos/api/categoria/${id}`);
  }
}
