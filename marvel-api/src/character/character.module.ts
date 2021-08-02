import { Module } from '@nestjs/common';
import { MarvelApiModule } from 'src/marvel-api/marvel-api.module';
import { CharacterController } from './character.controller';

@Module({
  controllers: [CharacterController],
  imports: [MarvelApiModule]
})
export class CharacterModule { }
