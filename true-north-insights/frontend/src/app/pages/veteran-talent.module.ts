import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { VeteranTalentComponent } from './veteran-talent.component';

const routes: Routes = [{ path: '', component: VeteranTalentComponent }];

@NgModule({
  declarations: [VeteranTalentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes),
  ],
})
export class VeteranTalentModule {}
