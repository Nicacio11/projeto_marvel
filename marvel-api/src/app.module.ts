import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import DbModule from './config/db.module';
import EnvService from './config/env.service';
import UsuarioModule from './usuario/usuario.module';


@Module({
  imports: [
    DbModule,
    UsuarioModule,
    AuthModule
  ],
  providers: [ConfigService, EnvService],
})
export default class AppModule { }
