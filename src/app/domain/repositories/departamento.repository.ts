import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.model';

export abstract class DepartamentoRepository {
  abstract getDepartamentos(): Observable<Departamento[]>;
  abstract getDepartamentoById(id: number): Observable<Departamento | undefined>;
  abstract getDepartamentosByRegionId(id: number): Observable<Departamento[]>;
}
