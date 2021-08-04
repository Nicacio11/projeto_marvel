import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';
import CharacterModel from 'src/_models/character.model';
import ComicModel from 'src/_models/comic.model';
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


  @Get('marvel')
  async getMarvel() {
    const characters = await this.marvelService.getCharacters()
    return characters.data;
  }

  @Get('marvel/:id')
  async getMarvelById(@Param('id', new ParseIntPipe()) id: number) {
    const characters = await this.marvelService.getCharactersById(id)
    return characters.data;
  }


  @Post()
  async setAsFavorite(@Body() data: CharacterModel): Promise<number> {

    const character = await this.characterService.findByUsuarioAndCharacter(data.id_usuario, data.id_character);
    if (character) {
      await this.characterService.delete(character.id);
      return 0;
    }

    this.characterService.create(data);
    return 1;
  }

  @Delete('id')
  async DeleteFavorite(@Param('id', new ParseIntPipe()) id: number): Promise<number> {
    return this.characterService.delete(id);
  }

  @Get('byuser/:id')
  async getByUsuarioId(@Param('id') id: string) {
    const characters = await this.characterService.find(id);
    return characters;
  }
}
