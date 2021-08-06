import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { PerfilService } from '../../perfil/perfil.service';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  comic: any;
  like = 1;
  usuarioDto: UsuarioDTO;

  constructor(private activatedRoute: ActivatedRoute, private comicService: ComicService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle('Detalhes da comic')
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.comicService.getComicById(+id!).subscribe(x => (this.comic = x))
    this.perfilService.get().subscribe(x => this.usuarioDto = x);

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
      this.like = +x;
    })
  }
}
