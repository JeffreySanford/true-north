import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/core/core.module').then((m) => m.CoreModule),
  },
  { path: '**', redirectTo: '' },
];
