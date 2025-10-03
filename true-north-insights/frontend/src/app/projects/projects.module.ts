import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from '../pages/project.component';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    DragDropModule,
    ProjectsRoutingModule,
  ],
})
export class ProjectsModule {}
