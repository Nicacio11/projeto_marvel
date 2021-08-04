import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL = `${environment.baseUrl}/v1/auth`;
  constructor(private http: HttpClient) { }

  login(
    login: {
      email: string;
      senha: string;
    },
  ): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.baseURL}/login`, {
        email: login.email,
        senha: login.senha,
      })
      .pipe(
        map((user) => {
          sessionStorage.setItem('currentUser', user.access_token);
          return user;
        }),
      );
  }
}
