import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SamComponent } from './sam.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { samRoutes } from './sam.routes';

import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [SamComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forChild(samRoutes),
  ],
  providers: [DecimalPipe],
})
export class SamModule {}
