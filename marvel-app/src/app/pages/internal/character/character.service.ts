import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../character/character.model';
import { CharacterFavorite } from './character-favorite/character.favorite.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  baseURL = `${environment.baseUrl}/v1/character`;
  character: any;
  constructor(private http: HttpClient) { }
  get(): Observable<Character> {
    return this.http.get<Character>(`${this.baseURL}`);
  }
  getAll(): Observable<Character> {
    return this.http.get<Character>(`${this.baseURL}/marvel`);
  }
  getById(id: number) {

  }
  setAsFavorite(obj: any) {
    return this.http.post(`${this.baseURL}/`, obj)
  }
  getCharacterById(id: number) {
    return this.http.get<Character>(`${this.baseURL}/marvel/${id}`);
  }
  getByUserId(id: string) {
    return this.http.get<CharacterFavorite[]>(`${this.baseURL}/byuser/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
