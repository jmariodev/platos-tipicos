import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegionRepository } from "../../domain/repositories/region.repository";
import { Region } from "../../domain/models/region.model";
import { Departamento } from "../../domain/models/departamento.model";
import { Observable, BehaviorSubject, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegionRepositoryImpl extends RegionRepository {
    private regionesSubject = new BehaviorSubject<Region[]>([]);
    private loaded = false;

    constructor(private http: HttpClient) {
        super();
    }

    private loadIfNeeded(): void {
        if (!this.loaded) {
            this.loaded = true;
            this.http.get<Region[]>('assets/mock/regiones.json').subscribe(data => {
                this.regionesSubject.next(data);
            });
        }
    }

    getRegiones(): Observable<Region[]> {
        this.loadIfNeeded();
        return this.regionesSubject.asObservable();
    }

    getRegionById(id: number): Observable<Region | undefined> {
        this.loadIfNeeded();
        return this.regionesSubject.pipe(
            map(regiones => regiones.find(r => r.id === id))
        );
    }

    addRegion(region: Region): void {
        const current = this.regionesSubject.getValue();
        const maxId = current.reduce((max, r) => Math.max(max, r.id), 0);
        region.id = maxId + 1;
        this.regionesSubject.next([...current, region]);
    }

    updateRegion(region: Region): void {
        const current = this.regionesSubject.getValue();
        const index = current.findIndex(r => r.id === region.id);
        if (index !== -1) {
            const updated = [...current];
            updated[index] = region;
            this.regionesSubject.next(updated);
        }
    }

    deleteRegion(id: number): void {
        const current = this.regionesSubject.getValue();
        this.regionesSubject.next(current.filter(r => r.id !== id));
    }

    addDepartamento(regionId: number, departamento: Departamento): void {
        const current = this.regionesSubject.getValue();
        const region = current.find(r => r.id === regionId);
        if (region) {
            const maxId = region.departamentos.reduce((max, d) => Math.max(max, d.id), 0);
            departamento.id = maxId + 1;
            region.departamentos = [...region.departamentos, departamento];
            this.regionesSubject.next([...current]);
        }
    }

    deleteDepartamento(regionId: number, departamentoId: number): void {
        const current = this.regionesSubject.getValue();
        const region = current.find(r => r.id === regionId);
        if (region) {
            region.departamentos = region.departamentos.filter(d => d.id !== departamentoId);
            this.regionesSubject.next([...current]);
        }
    }
}
