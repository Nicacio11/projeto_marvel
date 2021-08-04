import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MarvelApiService } from 'src/marvel-api/marvel-api.service';
import { ComicDTO } from 'src/_dtos/comic.dto';
import ComicModel from 'src/_models/comic.model';
import { ComicService } from './comic.service';

@UseGuards(JwtAuthGuard)
@Controller('v1/comic')
export class ComicController {
  constructor(private marvelService: MarvelApiService, private comicService: ComicService) {
  }

  @Get('marvel')
  async getMarvel() {
    const characters = await this.marvelService.getComics()
    return characters.data;
  }

  @Get('marvel/:id')
  async getMarvelById(@Param('id', new ParseIntPipe()) id: number) {
    const characters = await this.marvelService.getComicsById(id)
    return characters.data;
  }

  @Post()
  async setAsFavorite(@Body() data: ComicModel): Promise<number> {

    const comic = await this.comicService.findByUsuarioAndComic(data.id_usuario, data.id_comic)
    if (comic) {
      await this.comicService.delete(comic.id);
      return 0;
    }
    this.comicService.create(data);
    return 1;
  }

  @Delete(':id')
  async DeleteFavorite(@Param('id', new ParseIntPipe()) id: number,): Promise<number> {
    const comic = await this.comicService.findOne(id)
    if (!comic) {
      throw new NotFoundException("Favorito não encontrado");
    }
    return this.comicService.delete(comic.id);

  }

  @Get('byuser/:id')
  async getByUsuarioId(@Param('id') id: string) {
    const comics = await this.comicService.find(id);
    return comics;
  }

}
