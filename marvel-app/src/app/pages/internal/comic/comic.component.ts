import { Component, OnInit } from '@angular/core';
import { ComicService } from './comic.service';
import { Comic } from './comic.model';
import { PageEvent } from '@angular/material/paginator';
import { PerfilService } from '../perfil/perfil.service';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { SearchComicDTO } from 'src/app/core/models/search.dto';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  comic: Comic;
  usuarioDto: UsuarioDTO;

  itemsPerPage = 20;
  value: any;
  total: number;
  offset: number;
  constructor(private comicService: ComicService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle('Comics')
    this.perfilService.get().subscribe(x => this.usuarioDto = x);
    this.getComics(1)
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.getComics(event.pageIndex)
    return event;
  }

  getComics(page: number) {
    const searchParams = {
      limit: this.itemsPerPage,
      offset: (page - 1) * this.itemsPerPage,
    } as SearchComicDTO;
    if (this.value) {
      searchParams.titleStartsWith = this.value
    }
    debugger;
    Swal.showLoading();
    this.comicService.getAll(searchParams).subscribe(
      (res) => {
        Swal.close();
        debugger;
        this.total = res.total;
        this.offset = page;
        this.comic = res;
        this.perfilService.get().subscribe(x => {
          this.usuarioDto = x
          this.comicService.getByUserId(x.id!).subscribe(y => {

            this.comic?.results.forEach(element => {
              if (y.map(z => z.id_comic).includes(element.id)) {
                element.gostei = 1
              }
            });
          })
        });
      }, (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Algo deu errado!', err.error.message, 'error');
      },
    )
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
