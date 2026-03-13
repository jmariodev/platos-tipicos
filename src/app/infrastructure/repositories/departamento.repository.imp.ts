import { DepartamentoRepository } from '../../domain/repositories/departamento.repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../../domain/models/departamento.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartamentoRepositoryImpl extends DepartamentoRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>('http://localhost:8080/platos_tipicos/api/departamento');
  }
  getDepartamentoById(id: number): Observable<Departamento | undefined> {
    return this.http.get<Departamento>(
      `http://localhost:8080/platos_tipicos/api/departamento/${id}`,
    );
  }
  getDepartamentosByRegionId(id: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(
      `http://localhost:8080/platos_tipicos/api/departamento/region/${id}`,
    );
  }
}
