import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO, UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseURL = `${environment.baseUrl}/v1/usuario`;

  constructor(private http: HttpClient) { }

  create(usuario: RegisterDTO) {
    return this.http.post(this.baseURL, usuario);
  }
}
