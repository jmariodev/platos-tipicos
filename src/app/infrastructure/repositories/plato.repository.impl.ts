import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatoRepository } from '../../domain/repositories/plato.repository';
import { Plato } from '../../domain/models/plato.model';
import { Observable, of, map } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class PlatoRepositoryImpl extends PlatoRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/plato`;

  constructor(private http: HttpClient) {
    super();
  }

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  getPlatoById(id: number): Observable<Plato | undefined> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  getPlatosByRegion(id: number): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/region/${id}`);
  }

  addPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, plato);
  }

  updatePlato(plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${plato.id}`, plato);
  }

  deletePlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
