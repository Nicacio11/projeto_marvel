import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsuarioService from 'src/usuario/usuario.service';
import { UsuarioDTO } from 'src/_dtos/usuario.dto';
import UsuarioModel from 'src/_models/usuario.model';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService,
    private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('chega')
    const user = await this.usuarioService.findOneByEmail(username);
    console.log(user);
    if (user && (await user.comparePassword(pass))) {
      const { id, nome, email } = user;
      return { id, nome, email };
    }
    return null;
  }

  async login(user: Partial<UsuarioDTO>) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
