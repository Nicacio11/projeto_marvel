import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterComponent } from "./character/character.component";
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
      { path: 'character', component: CharacterComponent },
      { path: 'perfil', component: PerfilComponent },
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
