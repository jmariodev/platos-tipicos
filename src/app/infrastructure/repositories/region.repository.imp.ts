import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegionRepository } from "../../domain/repositories/region.repository";
import { Region } from "../../domain/models/region.model";
import { Departamento } from "../../domain/models/departamento.model";
import { Observable, of, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegionRepositoryImpl extends RegionRepository {

    private apiUrl = 'assets/mock/regiones.json';
    // TODO: Cambiar por la URL del API real, ej: 'http://localhost:8080/api/regiones'

    constructor(private http: HttpClient) {
        super();
    }

    getRegiones(): Observable<Region[]> {
        return this.http.get<Region[]>(this.apiUrl);
    }

    getRegionById(id: number): Observable<Region | undefined> {
        return this.http.get<Region[]>(this.apiUrl)
            .pipe(map(regiones => regiones.find(r => r.id === id)));
        // TODO: Cambiar por this.http.get<Region>(`${this.apiUrl}/${id}`)
    }

    addRegion(region: Region): Observable<Region> {
        // TODO: Cambiar por this.http.post<Region>(this.apiUrl, region)
        return of(region);
    }

    updateRegion(region: Region): Observable<Region> {
        // TODO: Cambiar por this.http.put<Region>(`${this.apiUrl}/${region.id}`, region)
        return of(region);
    }

    deleteRegion(id: number): Observable<void> {
        // TODO: Cambiar por this.http.delete<void>(`${this.apiUrl}/${id}`)
        return of(undefined);
    }

    addDepartamento(regionId: number, departamento: Departamento): Observable<Departamento> {
        // TODO: Cambiar por this.http.post<Departamento>(`${this.apiUrl}/${regionId}/departamentos`, departamento)
        return of(departamento);
    }

    deleteDepartamento(regionId: number, departamentoId: number): Observable<void> {
        // TODO: Cambiar por this.http.delete<void>(`${this.apiUrl}/${regionId}/departamentos/${departamentoId}`)
        return of(undefined);
    }
}
