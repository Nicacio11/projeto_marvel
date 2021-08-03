import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';
import { ComicDTO } from 'src/_dtos/comic.dto';
import ComicModel from 'src/_models/comic.model';
import { ComicService } from './comic.service';

@Controller('v1/comic')
export class ComicController {
  constructor(private marvelService: MarvelApiService, private comicService: ComicService) {
  }

  @Get('marvel')
  async getMarvel() {
    const characters = await this.marvelService.getComics()
    return characters.data;
  }

  @Post()
  async setAsFavorite(@Body() data: ComicModel): Promise<ComicDTO> {
    return this.comicService.create(data);
  }

  @Delete()
  async DeleteFavorite(@Param() id: number): Promise<number> {
    return this.comicService.delete(id);
  }

  @Get(':id')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    const character = await this.comicService.findOne(id);
    return character;
  }
}
