import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PlatoRepository } from "../../domain/repositories/plato.repository";
import { Plato } from "../../domain/models/plato.model";
import { Observable, BehaviorSubject, map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PlatoRepositoryImpl extends PlatoRepository {
    private platosSubject = new BehaviorSubject<Plato[]>([]);
    private loaded = false;

    constructor(private http: HttpClient) {
        super();
    }

    private loadIfNeeded(): void {
        if (!this.loaded) {
            this.loaded = true;
            this.http.get<Plato[]>('assets/mock/platos.json').subscribe(data => {
                this.platosSubject.next(data);
            });
        }
    }

    getPlatos(): Observable<Plato[]> {
        this.loadIfNeeded();
        return this.platosSubject.asObservable();
    }

    getPlatoById(id: number): Observable<Plato | undefined> {
        this.loadIfNeeded();
        return this.platosSubject.pipe(
            map(platos => platos.find(p => p.id == id))
        );
    }

    addPlato(plato: Plato): void {
        const current = this.platosSubject.getValue();
        const maxId = current.reduce((max, p) => Math.max(max, p.id), 0);
        plato.id = maxId + 1;
        this.platosSubject.next([...current, plato]);
    }

    updatePlato(plato: Plato): void {
        const current = this.platosSubject.getValue();
        const index = current.findIndex(p => p.id === plato.id);
        if (index !== -1) {
            const updated = [...current];
            updated[index] = plato;
            this.platosSubject.next(updated);
        }
    }

    deletePlato(id: number): void {
        const current = this.platosSubject.getValue();
        this.platosSubject.next(current.filter(p => p.id !== id));
    }
}
