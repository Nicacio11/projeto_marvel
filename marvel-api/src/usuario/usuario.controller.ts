import { BadRequestException, Body, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import UsuarioModel from 'src/_models/usuario.model';
import UsuarioService from './usuario.service';

@Controller('v1/usuario')
export class UsuarioController {
  constructor(private service: UsuarioService) { }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getbyId(@Param('id') id: string): Promise<Partial<UsuarioModel>> {
    const usuario = await this.service.findOne(id);
    usuario.senha = '';
    return usuario;
  }

  @Post()
  async insert(@Body() data: Partial<UsuarioModel>): Promise<Partial<UsuarioModel>> {

    const find = await this.service.findOneByEmail(data.email);
    if (find) {
      throw new BadRequestException('Email cadastrado');
    }
    const user = await this.service.create(data);
    user.senha = '';
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<UsuarioModel>): Promise<number> {
    return this.service.update(id, data);
  }
}
