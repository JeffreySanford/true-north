import { Route } from '@angular/router';

export const coreRoutes: Route[] = [
  {
    path: 'overview',
    loadComponent: () =>
      import('./overview.component').then((m) => m.OverviewComponent),
    data: { title: 'Overview' },
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('../../projects/projects.module').then((m) => m.ProjectsModule),
    data: { title: 'Planning' },
  },
  {
    path: 'about',
    loadChildren: () => import('./about.module').then((m) => m.AboutModule),
    data: { title: 'About' },
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact.module').then((m) => m.ContactModule),
    data: { title: 'Contact' },
  },
  {
    path: 'development',
    loadChildren: () =>
      import('./development.module').then((m) => m.DevelopmentModule),
    data: { title: 'Development' },
  },
  {
    path: 'sam',
    loadChildren: () => import('./sam.module').then((m) => m.SamModule),
    data: { title: 'SAM Contracts' },
  },
  // Scaffold for future views
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard.component').then((m) => m.DashboardComponent),
    data: { title: 'Dashboard' },
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports.component').then((m) => m.ReportsComponent),
    data: { title: 'Reports' },
  },
];
