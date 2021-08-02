import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import EnvService from 'src/config/env.service';
import { MarvelApiService } from './marvel-api.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [MarvelApiService, EnvService],
  exports: [MarvelApiService],
})
export class MarvelApiModule { }
