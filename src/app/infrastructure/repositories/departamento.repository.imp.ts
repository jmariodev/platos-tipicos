import { DepartamentoRepository } from '../../domain/repositories/departamento.repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../../domain/models/departamento.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class DepartamentoRepositoryImpl extends DepartamentoRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/departamento`;

  constructor(private http: HttpClient) {
    super();
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }
  getDepartamentoById(id: number): Observable<Departamento | undefined> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }
  getDepartamentosByRegionId(id: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/region/${id}`);
  }
}
