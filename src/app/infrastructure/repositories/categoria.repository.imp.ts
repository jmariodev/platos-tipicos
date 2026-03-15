import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaRepository } from '../../domain/repositories/categoria.repository';
import { Categoria } from '../../domain/models/categoria.model';
import { Observable, map, of } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class CategoriaRepositoryImpl extends CategoriaRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/categoria`;

  constructor(private http: HttpClient) {
    super();
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoriaById(id: number): Observable<Categoria | undefined> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
