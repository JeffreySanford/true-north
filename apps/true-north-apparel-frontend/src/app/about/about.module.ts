import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 *
 */
@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent }
    ])
  ],
  exports: [AboutComponent]
})
export class AboutModule {}
