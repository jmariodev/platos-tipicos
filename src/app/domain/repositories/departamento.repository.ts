import { Observable } from "rxjs";
import { Departamento } from "../models/departamento.model";

export abstract class DepartamentoRepository {
    abstract getDepartamentos(): Observable<Departamento[]>;
    abstract getDepartamentoById(id: string): Observable<Departamento | undefined>;
}