import { Module } from '@nestjs/common';
import { MarvelApiModule } from 'src/marvel-api/marvel-api.module';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  controllers: [CharacterController],
  imports: [MarvelApiModule],
  providers: [CharacterService]
})
export class CharacterModule { }
