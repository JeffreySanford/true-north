import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedDirectivesModule } from '../shared/directives/directives.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactBriefingComponent } from './contact-briefing.component';

const routes: Routes = [{ path: '', component: ContactBriefingComponent }];

@NgModule({
  declarations: [ContactBriefingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedDirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ContactBriefingModule {}
