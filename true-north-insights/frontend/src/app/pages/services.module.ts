import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { ServicesComponent } from './services.component';

const routes: Routes = [ { path: '', component: ServicesComponent } ];

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, MaterialModule, SharedDirectivesModule, RouterModule.forChild(routes)]
})
export class ServicesModule {}
