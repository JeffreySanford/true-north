import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedDirectivesModule } from '../../shared/directives/directives.module';
import { DevelopmentComponent } from './development.component';

const routes: Routes = [{ path: '', component: DevelopmentComponent }];

@NgModule({
  declarations: [],
  imports: [
    DevelopmentComponent,
    CommonModule,
    MaterialModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes),
  ],
})
export class DevelopmentModule {}
