import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsuarioService from 'src/usuario/usuario.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import EnvModule from 'src/config/env.module';
import EnvService from 'src/config/env.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsuarioService,
    PassportModule,
    PassportModule.register({ defaultStrategy: 'usuario-jwt' }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.jwtSecret,
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
