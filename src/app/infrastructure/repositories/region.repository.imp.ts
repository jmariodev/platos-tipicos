import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegionRepository } from '../../domain/repositories/region.repository';
import { Region } from '../../domain/models/region.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionRepositoryImpl extends RegionRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>('http://localhost:8080/platos_tipicos/api/region');
  }

  getRegionById(id: number): Observable<Region | undefined> {
    return this.http.get<Region>(`http://localhost:8080/platos_tipicos/api/region/${id}`);
  }
}
