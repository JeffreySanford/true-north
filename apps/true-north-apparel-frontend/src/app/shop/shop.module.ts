
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
/**
 *
 */
@NgModule({
  declarations: [ShopComponent],
  imports: [
  CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  HttpClientModule,
  // Browser animations should be provided once by the root app if needed
    RouterModule.forChild([
      { path: '', component: ShopComponent },
      {
        path: 'shop/:id', component: ShopComponent
      }
    ])
  ]
})
export class ShopModule {}
