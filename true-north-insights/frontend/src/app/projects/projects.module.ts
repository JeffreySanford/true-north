import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';
import { MiniCalendarComponent } from './mini-calendar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ProjectsComponent, MiniCalendarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonToggleModule,
    MatTooltipModule,
    DragDropModule,
    ProjectsRoutingModule,
  ],
})
export class ProjectsModule {}
