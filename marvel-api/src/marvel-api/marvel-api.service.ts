
import EnvService from 'src/config/env.service';
import crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SearchCharacterDTO, SearchComicDTO } from 'src/_dtos/search.dto';

@Injectable()
export class MarvelApiService {
  constructor(
    private envService: EnvService,
    private http: HttpService
  ) {

  }

  private generateHash() {
    const ts = parseInt(String(Date.now() / 1000), 10);
    const preHash = ts + this.envService.mavelApiPrivate + this.envService.mavelApiPublic;
    return {
      ts,
      hash: crypto.createHash('md5').update(preHash).digest('hex')
    };
  }

  getCharacters(search: SearchCharacterDTO) {
    const obj = this.generateHash();
    return this.http
      .get<any>(`${this.envService.mavelApi}/characters?ts=${obj.ts}&apikey=${this.envService.mavelApiPublic}&hash=${obj.hash}&offset=${search.offset}&limit=${search.limit}${search.nameStartsWith && search.nameStartsWith != 'undefined' ? '&nameStartsWith=' + search.nameStartsWith : ''}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }

  getCharactersById(id: number) {
    const obj = this.generateHash();
    return this.http
      .get<any>(`${this.envService.mavelApi}/characters/${id}?ts=${obj.ts}&apikey=${this.envService.mavelApiPublic}&hash=${obj.hash}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }

  getComics(search: SearchComicDTO) {
    const obj = this.generateHash();
    return this.http
      .get<any>(`${this.envService.mavelApi}/comics?ts=${obj.ts}&apikey=${this.envService.mavelApiPublic}&hash=${obj.hash}&offset=${search.offset}&limit=${search.limit}${search.titleStartsWith && search.titleStartsWith != 'undefined' ? '&titleStartsWith=' + search.titleStartsWith : ''}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }

  getComicsById(id: number) {
    const obj = this.generateHash();
    return this.http
      .get<any>(`${this.envService.mavelApi}/comics/${id}?ts=${obj.ts}&apikey=${this.envService.mavelApiPublic}&hash=${obj.hash}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }


}
