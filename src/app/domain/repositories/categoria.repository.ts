import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

export abstract class CategoriaRepository {
  abstract getCategorias(): Observable<Categoria[]>;
  abstract getCategoriaById(id: number): Observable<Categoria | undefined>;
  abstract addCategoria(categoria: Omit<Categoria, 'id'>): Observable<Categoria>;
  abstract updateCategoria(categoria: Categoria): Observable<Categoria>;
  abstract deleteCategoria(id: number): Observable<void>;
}
