import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterDetailComponent } from "./character/character-detail/character-detail.component";
import { CharacterFavoriteComponent } from "./character/character-favorite/character-favorite.component";
import { CharacterComponent } from "./character/character.component";
import { ComicDetailComponent } from "./comic/comic-detail/comic-detail.component";
import { ComicFavoriteComponent } from "./comic/comic-favorite/comic-favorite.component";
import { ComicComponent } from "./comic/comic.component";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'comic',
        pathMatch: 'full'
      },
      { path: 'comic', component: ComicComponent },
      {
        path: 'character', component: CharacterComponent,
        children: []
      },
      { path: 'character-detail/:id', component: CharacterDetailComponent, data: { title: 'Detalhes do personagem' } },
      { path: 'comic-detail/:id', component: ComicDetailComponent, data: { title: 'Detalhes da Comic' } },
      { path: 'comic-favorite', component: ComicFavoriteComponent, data: { title: 'Comic Favoritas' } },
      { path: 'character-favorite', component: CharacterFavoriteComponent, data: { title: 'Personagens Favoritos' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil' } },
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
