import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { PatrioticThemeService, ThemeMode } from '../services/patriotic-theme.service';

@Directive({
  selector: '[appParallaxMouse]'
})
export class ParallaxMouseDirective implements OnInit {
  @Input('appParallaxMouse') strength: number = 20;
  @Input() parallaxContainer: boolean = false;
  
  private initialX: number = 0;
  private initialY: number = 0;
  private themeMode: ThemeMode = 'light';

  constructor(
    private el: ElementRef,
    private themeService: PatrioticThemeService
  ) {}

  ngOnInit() {
    // Store initial position
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.initialX = rect.left + rect.width / 2;
    this.initialY = rect.top + rect.height / 2;
    
    // Subscribe to theme changes
    this.themeService.getThemeMode().subscribe(mode => {
      this.themeMode = mode;
      this.adjustParallaxIntensity();
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.parallaxContainer) {
      return;
    }
    
    // Apply movement with different strengths based on theme
    const moveIntensity = this.themeMode === 'tactical' ? this.strength * 1.5 : this.strength;
    
    // Calculate movement based on mouse position
    const moveX = ((event.clientX - window.innerWidth / 2) / window.innerWidth) * moveIntensity;
    const moveY = ((event.clientY - window.innerHeight / 2) / window.innerHeight) * moveIntensity;
    
    // Apply transform to element
    this.el.nativeElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // Apply additional tactical effects if in tactical mode
    if (this.themeMode === 'tactical') {
      this.applyTacticalEffects(moveX, moveY);
    }
  }
  
  // Adjust parallax intensity based on theme
  private adjustParallaxIntensity() {
    if (this.themeMode === 'tactical') {
      // More pronounced movement in tactical mode
      this.strength = this.strength * 1.5;
    } else if (this.themeMode === 'dark') {
      // Slightly more movement in dark mode
      this.strength = this.strength * 1.2;
    } else {
      // Reset to default for light mode
      this.strength = 20;
    }
  }
  
  // Apply special tactical display effects
  private applyTacticalEffects(moveX: number, moveY: number) {
    // Add glitch effect occasionally in tactical mode
    if (Math.random() < 0.02) {
      this.el.nativeElement.classList.add('tactical-glitch');
      setTimeout(() => {
        this.el.nativeElement.classList.remove('tactical-glitch');
      }, 200);
    }
    
    // Add scanline effect
    if (!this.el.nativeElement.querySelector('.scanline-overlay')) {
      const scanlines = document.createElement('div');
      scanlines.className = 'scanline-overlay';
      this.el.nativeElement.appendChild(scanlines);
    }
  }

  // Reset position when mouse leaves the window
  @HostListener('document:mouseleave')
  onMouseLeave() {
    if (!this.parallaxContainer) {
      this.el.nativeElement.style.transform = 'translate(0px, 0px)';
    }
  }
}
