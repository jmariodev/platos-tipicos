import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioRepository } from '../../domain/repositories/comentario.repository';
import { Comentarios } from '../../domain/models/comentarios.model';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ComentariosRepositoryImp extends ComentarioRepository {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/comentario`;

  constructor(private http: HttpClient) {
    super();
  }

  addComentario(comentario: Comentarios): Observable<Comentarios> {
    return this.http.post<Comentarios>(this.apiUrl, comentario);
  }
}
