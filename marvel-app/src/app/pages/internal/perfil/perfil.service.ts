import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { environment } from 'src/environments/environment';
import { PerfilDTO } from './perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  baseURL = `${environment.baseUrl}/v1`;
  constructor(private http: HttpClient) { }

  get(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.baseURL}/auth/profile`);
  }
  put(id: string, perfilDto: PerfilDTO): Observable<number> {
    return this.http.put<number>(`${this.baseURL}/usuario/${id}`, perfilDto);
  }
}
