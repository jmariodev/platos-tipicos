import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegionRepository } from '../../domain/repositories/region.repository';
import { Region } from '../../domain/models/region.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class RegionRepositoryImpl extends RegionRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/region`;

  constructor(private http: HttpClient) {
    super();
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }

  getRegionById(id: number): Observable<Region | undefined> {
    return this.http.get<Region>(`${this.apiUrl}/${id}`);
  }
}
