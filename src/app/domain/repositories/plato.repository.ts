import { Observable } from "rxjs";
import { Plato } from "../models/plato.model";

export abstract class PlatoRepository {
    abstract getPlatos(): Observable<Plato[]>;
    abstract getPlatoById(id: number): Observable<Plato | undefined>;
}