
import EnvService from 'src/config/env.service';
import crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarvelApiService {
  constructor(
    private envService: EnvService,
    private http: HttpService
  ) {

  }

  private generateHash() {
    const ts = parseInt(String(Date.now() / 1000), 10);
    console.log(ts);
    const preHash = ts + this.envService.mavelApiPrivate + this.envService.mavelApiPublic;
    return {
      ts,
      hash: crypto.createHash('md5').update(preHash).digest('hex')
    };
  }

  getCharacters() {
    const obj = this.generateHash();
    return this.http
      .get<any>(`${this.envService.mavelApi}/characters?ts=${obj.ts}&apikey=${this.envService.mavelApiPublic}&hash=${obj.hash}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }

  getComics() {
    const obj = this.generateHash();
    return this.http
      .get<any>(`${this.envService.mavelApi}/comics?ts=${obj.ts}&apikey=${this.envService.mavelApiPublic}&hash=${obj.hash}`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }


}
