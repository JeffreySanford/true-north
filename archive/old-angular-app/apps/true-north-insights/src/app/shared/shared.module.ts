import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxDirective } from '../directives/parallax.directive';

@NgModule({
  imports: [
    CommonModule,
    ParallaxDirective // Import the combined standalone directive
  ],
  exports: [
    ParallaxDirective // Export the combined directive
  ]
})
export class SharedModule { }
