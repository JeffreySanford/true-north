import { Route } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ServicesComponent } from './services';
import { BlogComponent } from './blog';
import { ContactComponent } from './contact';
import { DevelopmentComponent } from './development';

export const pagesRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'development', component: DevelopmentComponent },
];
