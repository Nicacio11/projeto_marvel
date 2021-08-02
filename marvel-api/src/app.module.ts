import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DbModule from './config/db.module';
import EnvService from './config/env.service';
import UsuarioModule from './usuario/usuario.module';


@Module({
  imports: [
    DbModule,
    UsuarioModule
  ],
  providers: [ConfigService, EnvService],
})
export default class AppModule { }
