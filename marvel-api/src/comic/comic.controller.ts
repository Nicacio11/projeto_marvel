import { Controller, Get } from '@nestjs/common';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';

@Controller('v1/comic')
export class ComicController {
  constructor(private marvelService: MarvelApiService) {
  }

  @Get()
  async get() {
    const comics = await this.marvelService.getComics()
    return comics.data.results;
  }
}
