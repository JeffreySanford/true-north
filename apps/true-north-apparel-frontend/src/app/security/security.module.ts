import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

/**
 *
 */
@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule.forChild([
      { path: '', component: SecurityComponent }
    ])
  ],
  exports: [SecurityComponent]
})
export class SecurityModule {}
