import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';
import { CharacterService } from './character.service';

@Controller('v1/character')
export class CharacterController {
  constructor(private marvelService: MarvelApiService, private characterService: CharacterService) {
  }

  @Get()
  async get() {
    const characters = await this.marvelService.getCharacters()
    return characters.data;
  }
  @Get(':id')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    const characters = await this.marvelService.getCharacters()
    return characters.data;
  }

  @Get('marvel')
  async getMarvel() {
    const characters = await this.marvelService.getCharacters()
    return characters.data;
  }


}
