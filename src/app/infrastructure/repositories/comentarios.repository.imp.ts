import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioRepository } from '../../domain/repositories/comentario.repository';
import { Comentarios } from '../../domain/models/comentarios.model';

@Injectable({
  providedIn: 'root',
})
export class ComentariosRepositoryImp extends ComentarioRepository {
  constructor(private http: HttpClient) {
    super();
  }

  addComentario(comentario: Comentarios): Observable<Comentarios> {
    return this.http.post<Comentarios>(
      'http://localhost:8080/platos_tipicos/api/comentario',
      comentario,
    );
  }
}
