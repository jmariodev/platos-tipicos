import { Observable } from 'rxjs';
import { Region } from '../models/region.model';

export abstract class RegionRepository {
  abstract getRegiones(): Observable<Region[]>;
  abstract getRegionById(id: number): Observable<Region | undefined>;
  abstract addRegion(region: Region): Observable<Region>;
  abstract updateRegion(region: Region): Observable<Region>;
  abstract deleteRegion(id: number): Observable<void>;
}
