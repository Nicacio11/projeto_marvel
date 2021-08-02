import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MarvelApiService } from './marvel-api/marvel-api.service';
import { MarvelApiModule } from './marvel-api/marvel-api.module';
import { CharacterModule } from './character/character.module';
import { ComicModule } from './comic/comic.module';
import DbModule from './config/db.module';
import EnvService from './config/env.service';
import UsuarioModule from './usuario/usuario.module';


@Module({
  imports: [
    DbModule,
    UsuarioModule,
    AuthModule,
    MarvelApiModule,
    CharacterModule,
    ComicModule
  ],
  providers: [ConfigService, EnvService],
})
export default class AppModule { }
