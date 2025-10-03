import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';

import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { DevelopmentComponent } from './development.component';
import { HomeComponent } from './home.component';
import { ServicesComponent } from './services.component';

import { pagesRoutes } from './pages.routes';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    DevelopmentComponent,
    HomeComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(pagesRoutes),
  ],
})
export class PagesModule {}
