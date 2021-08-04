import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { PerfilService } from '../../perfil/perfil.service';
import { CharacterService } from '../character.service';
import { CharacterFavorite } from './character.favorite.model';

@Component({
  selector: 'app-character-favorite',
  templateUrl: './character-favorite.component.html',
  styleUrls: ['./character-favorite.component.css']
})
export class CharacterFavoriteComponent implements OnInit {


  characters: any;
  like = 1;
  usuarioDto: UsuarioDTO;

  constructor(private characterService: CharacterService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Personagens Favoritos');
    this.perfilService.get().subscribe(x => {
      this.usuarioDto = x
      console.log(x);
      this.characterService.getByUserId(x.id!).subscribe(y => console.log(this.characters = y))
    });

  }

  remove(objComic: any) {
    console.log(objComic)
    this.characterService.delete(objComic.id).subscribe(() => {
      this.characters = this.characters.filter((y: CharacterFavorite) => y.id !== objComic.id)!
    })
  }
}

