import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { Comic } from '../comic/comic.model';
import { PerfilService } from '../perfil/perfil.service';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: Character;
  lowValue: number = 0;
  highValue: number = 5;
  usuarioDto: UsuarioDTO;
  constructor(private characterService: CharacterService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {
    this.perfilService.get().subscribe(x => this.usuarioDto = x);
    this.characterService.getAll().subscribe(x => console.log(this.character = x))
    this.titleService.setTitle('Personagens');
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

  gostei(objCharacter: any) {
    const comic = {
      id_usuario: this.usuarioDto.id,
      id_character: objCharacter.id,
      name: objCharacter.name,
      description: objCharacter.description,
      thumbnailPath: objCharacter.thumbnail.path,
      thumbnailPathExtension: objCharacter.thumbnail.extension,
    }
    this.characterService.setAsFavorite(comic).subscribe((x) => {
      objCharacter.gostei = x;
    })
  }
}
