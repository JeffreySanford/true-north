import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type ParallaxMode = 'scroll' | 'mouse' | 'none';

@Directive({
  selector: '[appParallax], [appParallaxMouse]', // Support both selectors for backward compatibility
  standalone: true
})
export class ParallaxDirective implements OnInit, OnDestroy {
  // Common inputs
  @Input() ratio: number = 0.1;
  @Input() parallaxRatio: number = 0.1; // Alternative name for ratio (for backward compatibility)
  @Input() zIndex: number = 0;
  @Input() reverse: boolean = false;
  @Input() mode: ParallaxMode = 'scroll'; // Default to scroll-based parallax
  
  // Tracking variables
  private initialY: number = 0;
  private initialX: number = 0;
  private subscriptions: Subscription[] = [];
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit(): void {
    // Set initial values
    this.initialY = window.scrollY;
    this.initialX = window.innerWidth / 2;
    this.initialY = window.innerHeight / 2;
    
    // Auto-detect mode based on directive selector used
    if (this.el.nativeElement.hasAttribute('appParallaxMouse')) {
      this.mode = 'mouse';
    }
    
    // Apply z-index if provided
    if (this.zIndex) {
      this.renderer.setStyle(this.el.nativeElement, 'z-index', this.zIndex.toString());
    }
    
    // Set up element styles for both modes
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.2s ease-out');
    
    if (this.mode === 'mouse') {
      this.setupMouseParallax();
    }
    
    // For scroll mode, the scroll event listener will handle the movement
  }
  
  /**
   * Set up mouse-based parallax effects
   */
  private setupMouseParallax(): void {
    // Position element for mouse parallax
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    
    // Subscribe to mouse move events
    const mouseMoveSubscription = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(debounceTime(10))
      .subscribe(event => this.handleMouseMove(event));
      
    this.subscriptions.push(mouseMoveSubscription);
  }
  
  /**
   * Handle mouse movement for mouse-based parallax
   */
  private handleMouseMove(event: MouseEvent): void {
    if (this.mode !== 'mouse') return;
    
    // Use either ratio or parallaxRatio (prioritize parallaxRatio for backward compatibility)
    const effectRatio = this.parallaxRatio || this.ratio;
    
    const { clientX, clientY } = event;
    
    // Calculate movement factor
    const moveX = (clientX - this.initialX) * effectRatio;
    const moveY = (clientY - this.initialY) * effectRatio;
    
    // Apply parallax effect with optional reverse
    const transformX = this.reverse ? -moveX : moveX;
    const transformY = this.reverse ? -moveY : moveY;
    
    // Apply transform to element
    this.renderer.setStyle(
      this.el.nativeElement, 
      'transform', 
      `translate3d(${transformX}px, ${transformY}px, 0)`
    );
  }
  
  /**
   * Handle scroll events for scroll-based parallax
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.mode !== 'scroll') return;
    
    // Use either ratio or parallaxRatio (prioritize ratio for backwards compatibility with scroll mode)
    const effectRatio = this.ratio || this.parallaxRatio;
    
    // Calculate translation based on scroll position and ratio
    const scrollPosition = window.scrollY;
    const offset = scrollPosition - this.initialY;
    const translateY = this.reverse ? -offset * effectRatio : offset * effectRatio;
    
    // Apply transformation
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `translateY(${translateY}px)`
    );
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
