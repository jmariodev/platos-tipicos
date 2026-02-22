import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegionRepository } from "../../domain/repositories/region.repository";
import { Region } from "../../domain/models/region.model";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegionRepositoryImpl extends RegionRepository {

    constructor(private http: HttpClient) {
        super();
    }

    getRegiones(): Observable<Region[]> {
        return this.http.get<Region[]>('assets/mock/regiones.json');
    }

    getRegionById(id: number): Observable<Region | undefined> {
        return this.http
            .get<Region[]>('assets/mock/regiones.json')
            .pipe(
                map(regiones => regiones.find(r => r.id === id))
            );
    }
}