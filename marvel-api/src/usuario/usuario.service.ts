import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import UsuarioModel from '../_models/usuario.model';

@Injectable()
export default class UsuarioService {
  constructor(
    @Inject('UsuarioModel') private modelClass: ModelClass<UsuarioModel>,
  ) { }

  async findOne(id: string): Promise<UsuarioModel> {
    return this.modelClass
      .query()
      .where({ id })
      .limit(1)
      .first();
  }

  async create(
    data: Partial<UsuarioModel>,
  ): Promise<UsuarioModel> {
    return this.modelClass
      .query()
      .insert(data)
      .first();
  }

}
