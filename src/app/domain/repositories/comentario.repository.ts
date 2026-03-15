import { Comentarios } from '../models/comentarios.model';
import { Observable } from 'rxjs';

export abstract class ComentarioRepository {
  abstract addComentario(comentario: Comentarios): Observable<Comentarios>;
}
