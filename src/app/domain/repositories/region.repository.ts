import { Observable } from "rxjs";
import { Region } from "../models/region.model";
import { Departamento } from "../models/departamento.model";

export abstract class RegionRepository {
    abstract getRegiones(): Observable<Region[]>;
    abstract getRegionById(id: number): Observable<Region | undefined>;
    abstract addRegion(region: Region): Observable<Region>;
    abstract updateRegion(region: Region): Observable<Region>;
    abstract deleteRegion(id: number): Observable<void>;
    abstract addDepartamento(regionId: number, departamento: Departamento): Observable<Departamento>;
    abstract deleteDepartamento(regionId: number, departamentoId: number): Observable<void>;
}
