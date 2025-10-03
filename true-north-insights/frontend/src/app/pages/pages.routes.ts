import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ServicesComponent } from './services.component';
import { ContactComponent } from './contact.component';
import { DevelopmentComponent } from './development.component';

export const pagesRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'projects', loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'contact', component: ContactComponent },
  { path: 'development', component: DevelopmentComponent },
];
