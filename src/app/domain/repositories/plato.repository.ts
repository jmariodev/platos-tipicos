import { Observable } from "rxjs";
import { Plato } from "../models/plato.model";

export abstract class PlatoRepository {
    abstract getPlatos(): Observable<Plato[]>;
    abstract getPlatoById(id: number): Observable<Plato | undefined>;
    abstract addPlato(plato: Plato): void;
    abstract updatePlato(plato: Plato): void;
    abstract deletePlato(id: number): void;
}
