import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallaxMouse]',
  standalone: false
})
export class ParallaxMouseDirective implements OnInit {
  @Input() parallaxRatio = 0.1;
  @Input() parallaxDirection = 'both'; // 'both', 'horizontal', 'vertical'
  
  private initialX = 0;
  private initialY = 0;
  private elementWidth = 0;
  private elementHeight = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    console.log('ParallaxMouseDirective initialized');
  }

  ngOnInit() {
    this.initialX = this.elementRef.nativeElement.getBoundingClientRect().left;
    this.initialY = this.elementRef.nativeElement.getBoundingClientRect().top;
    this.elementWidth = this.elementRef.nativeElement.offsetWidth;
    this.elementHeight = this.elementRef.nativeElement.offsetHeight;
    
    // Set initial 3D transform properties
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'transform 0.2s ease-out');
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform-style', 'preserve-3d');
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position relative to center of window
    const mouseX = event.clientX - (windowWidth / 2);
    const mouseY = event.clientY - (windowHeight / 2);
    
    // Calculate percentage of mouse position
    const moveX = (mouseX / windowWidth) * this.parallaxRatio * 20; 
    const moveY = (mouseY / windowHeight) * this.parallaxRatio * 20;
    
    let transform = '';
    
    if (this.parallaxDirection === 'horizontal' || this.parallaxDirection === 'both') {
      transform += `translateX(${moveX}px) `;
    }
    
    if (this.parallaxDirection === 'vertical' || this.parallaxDirection === 'both') {
      transform += `translateY(${moveY}px) `;
    }
    
    // Add subtle rotation for more depth
    transform += `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', transform);
  }
}
