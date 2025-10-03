import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { FederalReadinessComponent } from './federal-readiness.component';

const routes: Routes = [{ path: '', component: FederalReadinessComponent }];

@NgModule({
  declarations: [FederalReadinessComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes),
  ],
})
export class FederalReadinessModule {}
