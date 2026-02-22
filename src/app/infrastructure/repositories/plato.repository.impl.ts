import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PlatoRepository } from "../../domain/repositories/plato.repository";
import { Plato } from "../../domain/models/plato.model";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PlatoRepositoryImpl extends PlatoRepository {

    constructor(private http: HttpClient) {
        super();
    }

    getPlatos(): Observable<Plato[]> {
        return this.http.get<Plato[]>('assets/mock/platos.json');
    }

    getPlatoById(id: number): Observable<Plato | undefined> {
        return this.http.get<Plato[]>('assets/mock/platos.json')
            .pipe(map(platos => platos.find(p => p.id == id)!));
    }
}
