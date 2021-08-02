import { Module, Global } from '@nestjs/common';
import UsuarioService from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Global()
@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export default class UsuarioModule { }
