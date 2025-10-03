import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { MissionPlatformComponent } from './mission-platform.component';

const routes: Routes = [{ path: '', component: MissionPlatformComponent }];

@NgModule({
  declarations: [MissionPlatformComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes),
  ],
})
export class MissionPlatformModule {}
