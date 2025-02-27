import { Injectable, Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface TransitionEvent {
  fromSection: string;
  toSection: string;
  timestamp: number;
}

export interface BackgroundConfig {
  url: string;
  opacity: number;
  blur: string;
  overlay?: string;
  scale?: number;
  colorShift?: string;
  animation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  private transitionSubject = new Subject<TransitionEvent>();
  private activeSectionSubject = new BehaviorSubject<string>('About Us');
  private renderer: Renderer2;
  private pageContainerEl: HTMLElement | null = null;
  private isTransitioning = false; // Add flag to prevent multiple transitions
  private currentBackground: string | null = null; // Track current background to prevent unnecessary updates
  
  // Enhanced background mapping for different sections with PNG files
  private sectionBackgrounds: Record<string, BackgroundConfig> = {
    'Tactical': {
      url: 'assets/backgrounds/tactical-background.png',
      opacity: 0.95,
      blur: '0px',
      overlay: 'linear-gradient(rgba(0, 40, 104, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)',
      colorShift: 'brightness(1.05)',
      animation: 'tactical'
    },
    'About Us': {
      url: 'assets/backgrounds/intelligence-background.png',
      opacity: 1,
      blur: '0px',
      overlay: 'radial-gradient(ellipse at center, rgba(0, 40, 104, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)',
      scale: 1.0,
      animation: 'pulse'
    },
    'Services': {
      url: 'assets/backgrounds/design-background.png',
      opacity: 0.85,
      blur: '1px',
      overlay: 'linear-gradient(135deg, rgba(0, 40, 104, 0.6) 0%, rgba(0, 0, 0, 0.7) 100%)',
      scale: 1.05,
      animation: 'pan'
    },
    'Veterans': {
      url: 'assets/backgrounds/awards-background.png',
      opacity: 0.9,
      blur: '0px',
      overlay: 'linear-gradient(rgba(191, 10, 48, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
      colorShift: 'sepia(0.2)',
      animation: 'wave'
    },
    'Mission': {
      url: 'assets/backgrounds/leadership-background.png',
      opacity: 0.85,
      blur: '1px',
      overlay: 'linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 40, 104, 0.5) 100%)',
      colorShift: 'hue-rotate(5deg)',
      scale: 1.02,
      animation: 'tactical'
    },
    'Projects': {
      url: 'assets/backgrounds/data-visualization-background.png',
      opacity: 0.88,
      blur: '0.5px',
      overlay: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 40, 104, 0.5) 100%)',
      scale: 1.03,
      animation: 'zoom'
    },
    'Contact': {
      url: 'assets/backgrounds/contact-background.png',
      opacity: 0.8,
      blur: '1.5px',
      overlay: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 40, 104, 0.4) 100%)',
      scale: 1.03,
      animation: 'zoom'
    },
    'default': {
      url: 'assets/backgrounds/intelligence-background.png',
      opacity: 1,
      blur: '0px'
    }
  };
  
  // Updated additional backgrounds with PNG files for special sections or features
  private additionalBackgrounds: Record<string, BackgroundConfig> = {
    'modernization': {
      url: 'assets/backgrounds/modernization-background.png',
      opacity: 0.9,
      blur: '0.5px',
      overlay: 'linear-gradient(120deg, rgba(0, 40, 104, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%)',
      scale: 1.05
    },
    'cybersecurity': {
      url: 'assets/backgrounds/security-background.png',
      opacity: 0.85,
      blur: '1px',
      overlay: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 40, 104, 0.5) 100%)',
      colorShift: 'brightness(1.1)'
    },
    'cloud': {
      url: 'assets/backgrounds/cloud-background.png',
      opacity: 0.88,
      blur: '0.8px',
      overlay: 'radial-gradient(circle at top right, rgba(0, 40, 104, 0.3) 0%, rgba(0, 0, 0, 0.7) 80%)'
    },
    'emerging-tech': {
      url: 'assets/backgrounds/data-background.png',
      opacity: 0.82,
      blur: '1px',
      overlay: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 40, 104, 0.4) 100%)',
      colorShift: 'saturate(1.2)'
    },
    'dev-ops': {
      url: 'assets/backgrounds/tech-stack-background.png',
      opacity: 0.85,
      blur: '1px',
      overlay: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 40, 104, 0.5) 100%)'
    }
  };
  
  transition$ = this.transitionSubject.asObservable().pipe(
    debounceTime(50) // Prevent rapid firing
  );
  
  // Add distinctUntilChanged to prevent unnecessary updates
  activeSection$ = this.activeSectionSubject.asObservable().pipe(
    distinctUntilChanged()
  );
  
  constructor(private rendererFactory: RendererFactory2) {
    console.log('TransitionService initialized');
    this.renderer = rendererFactory.createRenderer(null, null);
    
    // Fix: Add guard to prevent infinite loops
    this.activeSection$.subscribe(section => {
      if (!this.isTransitioning && section) {
        this.updateBackgroundForSection(section);
      }
    });
  }
  
  /**
   * Sets the page container element reference to be used by this service
   */
  setPageContainer(elementRef: ElementRef): void {
    this.pageContainerEl = elementRef.nativeElement;
    console.log('Page container set:', this.pageContainerEl);
  }
  
  /**
   * Triggers transition effects between sections
   */
  triggerTransition(fromSection: string, toSection: string): void {
    // Guard against same section transitions or ongoing transitions
    if (fromSection === toSection || this.isTransitioning) return;
    
    console.log(`Transitioning from "${fromSection}" to "${toSection}"`);
    this.isTransitioning = true;
    
    this.transitionSubject.next({
      fromSection,
      toSection,
      timestamp: Date.now()
    });
    
    // Update the active section
    this.activeSectionSubject.next(toSection);
    
    // Apply effects
    this.applyPageEffects();
    this.animateBackgroundIntensity();
    
    // Clear transitioning flag after effects complete
    setTimeout(() => {
      this.isTransitioning = false;
    }, 1000);
  }
  
  /**
   * Get background config for a specific feature or subsection
   */
  getBackgroundConfig(key: string): BackgroundConfig | null {
    return this.additionalBackgrounds[key] || null;
  }
  
  /**
   * Manually set a specific background from the additional backgrounds
   */
  setSpecificBackground(backgroundKey: string): void {
    // Prevent duplicate updates to the same background
    if (this.currentBackground === backgroundKey || this.isTransitioning) return;
    
    const config = this.additionalBackgrounds[backgroundKey];
    if (config) {
      this.isTransitioning = true;
      this.currentBackground = backgroundKey;
      this.applyBackgroundConfig(config);
      
      // Reset transitioning flag after effects complete
      setTimeout(() => {
        this.isTransitioning = false;
      }, 1000);
    } else {
      console.warn(`Background config not found for key: ${backgroundKey}`);
    }
  }
  
  /**
   * Updates the background image based on active section
   */
  private updateBackgroundForSection(sectionName: string): void {
    if (!this.pageContainerEl) {
      console.warn('Page container element not set. Call setPageContainer() first.');
      return;
    }
    
    // Prevent duplicate background updates
    if (this.currentBackground === sectionName) return;
    this.currentBackground = sectionName;
    
    // Get background config for current section (or default if not found)
    const bgConfig = this.sectionBackgrounds[sectionName] || this.sectionBackgrounds['default'];
    
    // Create a ripple effect for smooth transition
    this.createRippleEffect();
    
    // Apply transition effect to page container
    this.renderer.addClass(this.pageContainerEl, 'transition-effect');
    
    // Apply the background configuration
    this.applyBackgroundConfig(bgConfig);
  }
  
  /**
   * Apply background configuration to the page container
   */
  private applyBackgroundConfig(bgConfig: BackgroundConfig): void {
    if (!this.pageContainerEl) return;
    
    // Set background with a slight delay for transition effect
    setTimeout(() => {
      // Only proceed if we still have a page container
      if (!this.pageContainerEl) return;
      
      // Update background image
      this.renderer.setStyle(
        this.pageContainerEl,
        'background-image',
        bgConfig.overlay 
          ? `${bgConfig.overlay}, url(${bgConfig.url})`
          : `url(${bgConfig.url})`
      );
      
      this.renderer.setStyle(this.pageContainerEl, 'background-size', 'cover');
      this.renderer.setStyle(this.pageContainerEl, 'background-position', 'center');
      this.renderer.setStyle(this.pageContainerEl, 'background-repeat', 'no-repeat');
      this.renderer.setStyle(this.pageContainerEl, 'opacity', bgConfig.opacity.toString());
      
      // Apply optional transform scale if specified
      if (bgConfig.scale && bgConfig.scale !== 1.0) {
        this.renderer.setStyle(
          this.pageContainerEl,
          'transform', 
          `scale(${bgConfig.scale})`
        );
      } else {
        this.renderer.removeStyle(this.pageContainerEl, 'transform');
      }
      
      // Apply blur effect if specified
      if (bgConfig.blur && bgConfig.blur !== '0px') {
        this.renderer.setStyle(this.pageContainerEl, 'backdrop-filter', `blur(${bgConfig.blur})`);
      } else {
        this.renderer.removeStyle(this.pageContainerEl, 'backdrop-filter');
      }
      
      // Apply color shift if specified (filter effects)
      if (bgConfig.colorShift) {
        this.renderer.setStyle(this.pageContainerEl, 'filter', bgConfig.colorShift);
      } else {
        this.renderer.removeStyle(this.pageContainerEl, 'filter');
      }
      
      // Apply animation class if specified
      if (bgConfig.animation) {
        this.renderer.addClass(this.pageContainerEl, `bg-animation-${bgConfig.animation}`);
        
        // Remove animation class after it completes
        setTimeout(() => {
          if (this.pageContainerEl) {
            this.renderer.removeClass(this.pageContainerEl, `bg-animation-${bgConfig.animation}`);
          }
        }, 5000);
      }
      
      // Remove transition effect class
      setTimeout(() => {
        if (this.pageContainerEl) {
          this.renderer.removeClass(this.pageContainerEl, 'transition-effect');
        }
      }, 500);
    }, 150);
  }
  
  /**
   * Creates a ripple effect at the center of the screen for transitions
   */
  private createRippleEffect(): void {
    if (!this.pageContainerEl) return;
    
    const ripple = this.renderer.createElement('div');
    this.renderer.addClass(ripple, 'ripple-effect');
    
    // Position the ripple at the center of the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    this.renderer.setStyle(ripple, 'top', `${viewportHeight / 2}px`);
    this.renderer.setStyle(ripple, 'left', `${viewportWidth / 2}px`);
    this.renderer.setStyle(ripple, 'width', `${Math.max(viewportWidth, viewportHeight) * 2}px`);
    this.renderer.setStyle(ripple, 'height', `${Math.max(viewportWidth, viewportHeight) * 2}px`);
    
    // Add the ripple to the page container
    this.renderer.appendChild(this.pageContainerEl, ripple);
    
    // Remove the ripple after animation completes
    setTimeout(() => {
      if (this.pageContainerEl && this.pageContainerEl.contains(ripple)) {
        this.renderer.removeChild(this.pageContainerEl, ripple);
      }
    }, 800);
  }
  
  /**
   * Applies visual effects to the page container during transitions
   */
  applyPageEffects(): void {
    if (!this.pageContainerEl) return;
    
    // Apply a subtle pulse effect
    this.renderer.addClass(this.pageContainerEl, 'pulse-effect');
    setTimeout(() => {
      this.renderer.removeClass(this.pageContainerEl, 'pulse-effect');
    }, 1000);
  }
  
  /**
   * Animates background intensity during transitions
   */
  animateBackgroundIntensity(): void {
    // Find the animated background component
    const background = document.querySelector('app-animated-background');
    if (background) {
      this.renderer.addClass(background, 'intensified');
      setTimeout(() => {
        this.renderer.removeClass(background, 'intensified');
      }, 2000);
    }
  }
}
