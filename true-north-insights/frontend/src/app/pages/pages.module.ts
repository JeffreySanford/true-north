import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';

import { pagesRoutes } from './pages.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    RouterModule.forChild(pagesRoutes),
  ],
})
export class PagesModule {}
