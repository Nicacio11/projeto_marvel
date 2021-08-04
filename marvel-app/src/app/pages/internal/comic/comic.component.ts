import { Component, OnInit } from '@angular/core';
import { ComicService } from './comic.service';
import { Comic } from './comic.model';
import { PageEvent } from '@angular/material/paginator';
import { PerfilService } from '../perfil/perfil.service';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  comic: Comic;
  lowValue: number = 0;
  highValue: number = 5;
  usuarioDto: UsuarioDTO;
  constructor(private comicService: ComicService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle('Comics')
    this.perfilService.get().subscribe(x => this.usuarioDto = x);
    this.comicService.getAll().subscribe(x => console.log(this.comic = x))
  }
  // handlePageChange(page) {
  //   const searchParams = {
  //     limit: this.itemsPerPage,
  //     nameStartsWith: this.searchFG.get('nameStartsWith')?.value,
  //     startPage: page,
  //     orderBy: this.searchFG.get('orderBy')?.value,
  //   } as SearchCharactersParamsDTO;
  // }
  // used to build an array of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  gostei(objComic: any) {
    const comic = {
      id_usuario: this.usuarioDto.id,
      id_comic: objComic.id,
      title: objComic.title,
      description: objComic.description,
      thumbnailPath: objComic.thumbnail.path,
      thumbnailPathExtension: objComic.thumbnail.extension,
      pageCount: objComic.pageCount
    }
    this.comicService.setAsFavorite(comic).subscribe((x) => {
      objComic.gostei = x;
    })
  }
}
