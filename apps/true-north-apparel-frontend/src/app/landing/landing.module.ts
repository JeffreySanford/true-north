
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

/**
 *
 */
@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
  MatIconModule,
  MatCardModule,
    RouterModule.forChild([
      { path: '', component: LandingComponent }
    ])
  ],
  exports: [LandingComponent]
})
export class LandingModule {}
