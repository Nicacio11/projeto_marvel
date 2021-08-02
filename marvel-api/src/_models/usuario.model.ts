/* eslint-disable lines-between-class-members */
import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

export default class UsuarioModel extends Model {
  static tableName = 'tb_usuario';

  id: string;
  nome: string;
  email: string;
  senha: string;

  async $beforeInsert(ctx): Promise<void> {
    await super.$beforeInsert(ctx);
    this.senha = await bcrypt.hash(this.senha, 12);
    this.id = uuidv4();
  }

  async $beforeUpdate(opt, ctx): Promise<void> {
    await super.$beforeUpdate(opt, ctx);
    if (this.senha) {
      this.senha = await bcrypt.hash(this.senha, 12);
    }
  }
  async $afterUpdate(opt, ctx): Promise<void> {
    await super.$afterUpdate(opt, ctx);
    delete this.senha;
  }
  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.senha);
  }


}
