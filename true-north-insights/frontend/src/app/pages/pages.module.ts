
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { BlogComponent } from './blog';
import { ContactComponent } from './contact';
import { DevelopmentComponent } from './development';
import { HomeComponent } from './home';
import { ServicesComponent } from './services';

import { pagesRoutes } from './pages.routes';

@NgModule({
  declarations: [
    AboutComponent,
    BlogComponent,
    ContactComponent,
    DevelopmentComponent,
    HomeComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pagesRoutes),
  ],
})
export class PagesModule {}
