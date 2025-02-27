import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit {
  @Input() ratio: number = 0.1;
  @Input() zIndex: number = 0;
  private initialY: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Set initial position
    this.initialY = window.scrollY;
    
    // Apply z-index if provided
    if (this.zIndex) {
      this.renderer.setStyle(this.el.nativeElement, 'z-index', this.zIndex.toString());
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Calculate translation based on scroll position and ratio
    const scrollPosition = window.scrollY;
    const offset = scrollPosition - this.initialY;
    const translateY = offset * this.ratio;
    
    // Apply transformation
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `translateY(${translateY}px)`
    );
  }
}
