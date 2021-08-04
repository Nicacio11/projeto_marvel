import { Routes } from '@angular/router';

export const full: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../../pages/auth/auth.module').then(m => m.AuthModule)
  }
];
