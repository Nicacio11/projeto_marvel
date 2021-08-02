import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import EnvService from 'src/config/env.service';
import UsuarioService from 'src/usuario/usuario.service';
import { UsuarioDTO } from 'src/_dtos/usuario.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private envService: EnvService,
    private usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.jwtSecret,
    });
  }


  async validate(payload: UsuarioDTO, done): Promise<any> {
    const user = await this.usuarioService.findOneByEmail(payload.email);
    if (!user) {
      return done(new UnauthorizedException('Credenciais inválidas'), false);
    }
    delete user.senha;
    return user;
  }
}
