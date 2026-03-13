import { Observable } from "rxjs";
import { Plato } from "../models/plato.model";

export abstract class PlatoRepository {
    abstract getPlatos(): Observable<Plato[]>;
    abstract getPlatoById(id: number): Observable<Plato | undefined>;
    abstract addPlato(plato: Plato): Observable<Plato>;
    abstract updatePlato(plato: Plato): Observable<Plato>;
    abstract deletePlato(id: number): Observable<void>;
}
