import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class EnvService {
  constructor(private configService: ConfigService) { }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get dbName(): string {
    return this.configService.get<string>('app.dbName');
  }

  get dbHost(): string {
    return this.configService.get<string>('app.dbHost');
  }

  get dbPort(): number {
    return this.configService.get<number>('app.dbPort');
  }

  get dbUser(): string {
    return this.configService.get<string>('app.dbUser');
  }

  get dbPass(): string {
    return this.configService.get<string>('app.dbPass');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('app.jwtSecret');
  }
}
