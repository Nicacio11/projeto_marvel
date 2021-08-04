import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'internal',
    loadChildren: () => import('../../../pages/internal/internal.module').then(m => m.InternalModule)
  }
];
