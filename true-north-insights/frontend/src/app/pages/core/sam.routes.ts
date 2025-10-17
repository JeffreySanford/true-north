import { Route } from '@angular/router';
import { SamComponent } from './sam.component';

export const samRoutes: Route[] = [
  {
    path: '',
    component: SamComponent,
    data: { title: 'SAM Contracts' },
  },
];
