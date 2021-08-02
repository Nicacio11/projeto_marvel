import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsuarioService from 'src/usuario/usuario.service';
import UsuarioModel from 'src/_models/usuario.model';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService,
    private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findOneByEmail(username);
    if (user && (await user.comparePassword(pass))) {
      const { id, nome, email } = user;
      return { id, nome, email };
    }
    return null;
  }

  async login(user: Partial<UsuarioModel>) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
