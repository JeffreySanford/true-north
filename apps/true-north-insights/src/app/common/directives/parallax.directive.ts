import { Directive } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: false
})
export class ParallaxDirective {
  constructor() {
    console.log('ParallaxDirective is working...');
  }
}
