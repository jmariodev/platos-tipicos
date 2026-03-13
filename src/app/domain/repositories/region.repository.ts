import { Observable } from "rxjs";
import { Region } from "../models/region.model";
import { Departamento } from "../models/departamento.model";

export abstract class RegionRepository {
    abstract getRegiones(): Observable<Region[]>;
    abstract getRegionById(id: number): Observable<Region | undefined>;
    abstract addRegion(region: Region): void;
    abstract updateRegion(region: Region): void;
    abstract deleteRegion(id: number): void;
    abstract addDepartamento(regionId: number, departamento: Departamento): void;
    abstract deleteDepartamento(regionId: number, departamentoId: number): void;
}
