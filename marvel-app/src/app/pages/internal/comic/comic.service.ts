import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComicFavorite } from './comic-favorite/comic.model';
import { Comic } from './comic.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  baseURL = `${environment.baseUrl}/v1/comic`;
  constructor(private http: HttpClient) { }
  get(): Observable<Comic> {
    return this.http.get<Comic>(`${this.baseURL}`);
  }
  getAll(): Observable<Comic> {
    return this.http.get<Comic>(`${this.baseURL}/marvel`);
  }
  setAsFavorite(obj: any) {
    return this.http.post(`${this.baseURL}/`, obj)
  }
  getComicById(id: number) {
    return this.http.get<Comic>(`${this.baseURL}/marvel/${id}`);
  }
  getByUserId(id: string) {
    return this.http.get<ComicFavorite[]>(`${this.baseURL}/byuser/${id}`);
  }
  delete(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
