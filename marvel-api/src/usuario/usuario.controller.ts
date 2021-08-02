import { Body, Param, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import UsuarioModel from 'src/_models/usuario.model';
import UsuarioService from './usuario.service';

@Controller('v1/usuario')
export class UsuarioController {
  constructor(private service: UsuarioService) { }

  @Get(':id')
  async getbyId(@Param('id') id: string): Promise<Partial<UsuarioModel>> {
    const usuario = await this.service.findOne(id);
    usuario.senha = '';
    return usuario;
  }

  @Post()
  async insert(@Body() data: Partial<UsuarioModel>): Promise<Partial<UsuarioModel>> {
    const user = await this.service.create(data);
    user.senha = '';
    return user;
  }
}
