import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDTO } from '../models/usuario.dto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  constructor(private router: Router, private http: HttpClient) { }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['auth/login']);
  }

  decodeToken(): UsuarioDTO {
    const token = sessionStorage.getItem('currentUser');

    if (token) {
      return this.jwtHelper.decodeToken(token);
    }

    return {} as UsuarioDTO;
  }
  isTokenExpired(): boolean {
    const currentUser = sessionStorage.getItem('currentUser');

    if (currentUser) {
      return this.jwtHelper.isTokenExpired(currentUser);
    }

    return true;
  }
}
