import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { PerfilService } from '../../perfil/perfil.service';
import { ComicService } from '../comic.service';
import { ComicFavorite } from './comic.model';

@Component({
  selector: 'app-comic-favorite',
  templateUrl: './comic-favorite.component.html',
  styleUrls: ['./comic-favorite.component.css']
})
export class ComicFavoriteComponent implements OnInit {

  comics: any;
  like = 1;
  usuarioDto: UsuarioDTO;

  constructor(private comicService: ComicService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Comics favoritas')
    this.perfilService.get().subscribe(x => {
      this.usuarioDto = x
      this.comicService.getByUserId(x.id!).subscribe(y => (this.comics = y))
    });

  }

  remove(objComic: any) {
    this.comicService.delete(objComic.id).subscribe(() => {
      this.comics = this.comics.filter((y: ComicFavorite) => y.id !== objComic.id)!
    })
  }
}
