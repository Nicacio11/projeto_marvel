import { Controller, Get } from '@nestjs/common';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';

@Controller('v1/character')
export class CharacterController {
  constructor(private marvelService: MarvelApiService) {
  }

  @Get()
  async get() {
    const characters = await this.marvelService.getCharacters()
    return characters.data.results;
  }
}
