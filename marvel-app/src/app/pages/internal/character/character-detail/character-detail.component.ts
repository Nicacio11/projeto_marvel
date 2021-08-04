import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { PerfilService } from '../../perfil/perfil.service';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  like = 1;
  usuarioDto: UsuarioDTO;

  constructor(private activatedRoute: ActivatedRoute,
    private characterService: CharacterService,
    private perfilService: PerfilService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Detalhes do Personagem');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.characterService.getCharacterById(+id!).subscribe(x => console.log(this.character = x))
    this.perfilService.get().subscribe(x => this.usuarioDto = x);

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
      this.like = +x;
    })
  }
}
