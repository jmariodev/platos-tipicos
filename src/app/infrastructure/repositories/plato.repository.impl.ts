import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatoRepository } from '../../domain/repositories/plato.repository';
import { Plato } from '../../domain/models/plato.model';
import { Observable, of, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlatoRepositoryImpl extends PlatoRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>('http://localhost:8080/platos_tipicos/api/plato');
  }

  getPlatoById(id: number): Observable<Plato | undefined> {
    return this.http.get<Plato>(`http://localhost:8080/platos_tipicos/api/plato/${id}`);
  }

  getPlatosByRegion(id: number): Observable<Plato[]> {
    return this.http.get<Plato[]>(`http://localhost:8080/platos_tipicos/api/plato/region/${id}`);
  }

  addPlato(plato: Plato): Observable<Plato> {
    // TODO: Cambiar por this.http.post<Plato>(this.apiUrl, plato)
    return of(plato);
  }

  updatePlato(plato: Plato): Observable<Plato> {
    // TODO: Cambiar por this.http.put<Plato>(`${this.apiUrl}/${plato.id}`, plato)
    return of(plato);
  }

  deletePlato(id: number): Observable<void> {
    // TODO: Cambiar por this.http.delete<void>(`${this.apiUrl}/${id}`)
    return of(undefined);
  }
}
