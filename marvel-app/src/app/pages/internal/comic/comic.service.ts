import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comic } from './comic.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  baseURL = `${environment.baseUrl}/v1/comic`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Comic> {
    return this.http.get<Comic>(`${this.baseURL}/marvel`);
  }
}
