import { Module, Global } from '@nestjs/common';
import Knex from "knex";
import { Model } from "objection";
import CharacterModel from 'src/_models/character.model';
import ComicModel from 'src/_models/comic.model';
import UsuarioModel from 'src/_models/usuario.model';
import EnvModule from "./env.module";
import EnvService from "./env.service";

const models = [UsuarioModel, CharacterModel, ComicModel];
const modelProviders = models.map((model) => ({
  provide: model.name,
  useValue: model,
}));

@Global()
@Module({
  imports: [EnvModule],
  providers: [
    ...modelProviders,
    {
      provide: 'KnexConnection',
      inject: [EnvService],
      useFactory: async (config: EnvService) => {
        const knex = Knex({
          client: 'mysql2',
          connection: {
            host: config.dbHost,
            database: config.dbName,
            port: config.dbPort,
            user: config.dbUser,
            password: config.dbPass,
            connectTimeout: 60000,
          },
          debug: config.env !== 'production',
          pool: { min: 2, max: 10 },
        });

        Model.knex(knex);
        return knex;
      },
    },
  ],
  exports: [...modelProviders],
})
export default class DbModule { }
