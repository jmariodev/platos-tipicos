import { Observable } from "rxjs";
import { Region } from "../models/region.model";

export abstract class RegionRepository {
    abstract getRegiones(): Observable<Region[]>;
abstract getRegionById(id: number): Observable<Region | undefined>;
}