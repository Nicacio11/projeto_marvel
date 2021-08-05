import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { Comic } from '../comic/comic.model';
import { PerfilService } from '../perfil/perfil.service';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { SearchCharacterDTO } from 'src/app/core/models/search.dto';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: Character;

  usuarioDto: UsuarioDTO;
  itemsPerPage = 20;
  value: any;
  total: number;
  offset: number;
  constructor(private characterService: CharacterService, private perfilService: PerfilService, private titleService: Title) { }

  ngOnInit(): void {
    this.perfilService.get().subscribe(x => this.usuarioDto = x);
    this.getCharacter(1);
    this.titleService.setTitle('Personagens');
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.getCharacter(event.pageIndex)
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

  getCharacter(page: number) {
    const searchParams = {
      limit: this.itemsPerPage,
      offset: (page - 1) * this.itemsPerPage,
    } as SearchCharacterDTO;
    if (this.value) {
      searchParams.nameStartsWith = this.value
    }
    Swal.showLoading();
    this.characterService.getAll(searchParams).subscribe(
      (res: any) => {
        Swal.close();
        debugger;
        this.total = res.total;
        this.offset = page;
        this.character = res;
      }, (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Algo deu errado!', err.error.message, 'error');
      },
    )
  }
}
