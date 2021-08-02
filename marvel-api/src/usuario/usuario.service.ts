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

  async findOneByEmail(email: string): Promise<UsuarioModel> {
    return this.modelClass
      .query()
      .where({ email })
      .limit(1)
      .first();
  }

  async findOneByEmailAndPassword(email: string, password: string): Promise<UsuarioModel> {
    return this.modelClass
      .query()
      .where({ email, senha: password })
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

  async update(id: string,
    data: Partial<UsuarioModel>,
  ): Promise<number> {
    return this.modelClass
      .query()
      .patch(data)
      .where({ id })
      .first();
  }
}

