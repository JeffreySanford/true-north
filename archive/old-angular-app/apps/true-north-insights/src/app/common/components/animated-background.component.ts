import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-background',
  template: `
    <div class="animated-background" [ngStyle]="backgroundStyle">
      <div
        class="animated-stars"
        *ngFor="let star of stars"
        [ngStyle]="getStarStyle(star)"
      ></div>
    </div>
  `,
  styles: [
    `
      .animated-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
      }

      .animated-stars {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px white;
      }

      @keyframes dataPulse {
        0% {
          opacity: 0.8;
          transform: scale(0);
        }
        100% {
          opacity: 0;
          transform: scale(1);
        }
      }
    `,
  ],
  standalone: false,
})

export class AnimatedBackgroundComponent implements OnInit {
  @Input() theme: 'stars' | 'patriotic' = 'patriotic';
  @Input() starCount = 50;
  @Input() enableTacticalEffects = true;

  stars: { x: number; y: number; size: number; speed: number }[] = [];
  backgroundStyle: any = {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log('AnimatedBackground initialized with theme:', this.theme);

    if (this.theme === 'patriotic') {
      this.backgroundStyle = {
        background:
          'linear-gradient(135deg, rgba(0,40,104,0.7) 0%, rgba(28,28,65,0.8) 50%, rgba(191,10,48,0.7) 100%)',
        opacity: '0.85',
      };

      // For patriotic theme, use stars and stripes
      this.starCount = 25; // Fewer stars for cleaner look
    } else {
      this.backgroundStyle = {
        background:
          'radial-gradient(ellipse at center, #1a2a3d 0%, #0c1423 70%)',
      };
    }

    // Generate stars
    this.generateStars();

    // Animate stars
    this.animateStars();

    if (this.enableTacticalEffects && this.theme === 'patriotic') {
      this.initTacticalEffects();
    }
  }

  generateStars() {
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
      });
    }
  }

  getStarStyle(star: { x: number; y: number; size: number }) {
    return {
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
    };
  }

  animateStars() {
    setInterval(() => {
      this.stars = this.stars.map((star) => {
        return {
          ...star,
          y: (star.y + star.speed) % 100,
        };
      });
    }, 50);
  }

  initTacticalEffects() {
    // Create grid scan lines
    this.createScanLines();

    // Add random data pulses
    setInterval(() => {
      this.createDataPulse();
    }, 3000);
  }

  createScanLines() {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'scan-lines');
    this.renderer.setStyle(container, 'position', 'absolute');
    this.renderer.setStyle(container, 'top', '0');
    this.renderer.setStyle(container, 'left', '0');
    this.renderer.setStyle(container, 'width', '100%');
    this.renderer.setStyle(container, 'height', '100%');
    this.renderer.setStyle(
      container,
      'background',
      'linear-gradient(transparent 50%, rgba(0, 48, 135, 0.03) 50%)'
    );
    this.renderer.setStyle(container, 'backgroundSize', '100% 4px');
    this.renderer.setStyle(container, 'pointerEvents', 'none');
    this.renderer.setStyle(container, 'opacity', '0.2');

    const parentElement = this.elementRef.nativeElement.querySelector(
      '.animated-background'
    );
    if (parentElement) {
      this.renderer.appendChild(parentElement, container);
    }
  }

  createDataPulse() {
    const pulse = this.renderer.createElement('div');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 50 + 30;

    this.renderer.setStyle(pulse, 'position', 'absolute');
    this.renderer.setStyle(pulse, 'left', `${x}%`);
    this.renderer.setStyle(pulse, 'top', `${y}%`);
    this.renderer.setStyle(pulse, 'width', `${size}px`);
    this.renderer.setStyle(pulse, 'height', `${size}px`);
    this.renderer.setStyle(pulse, 'borderRadius', '50%');
    this.renderer.setStyle(
      pulse,
      'background',
      'radial-gradient(circle, rgba(0, 48, 135, 0.7) 0%, rgba(0, 48, 135, 0) 70%)'
    );
    this.renderer.setStyle(pulse, 'opacity', '0');
    this.renderer.setStyle(pulse, 'pointerEvents', 'none');
    this.renderer.setStyle(pulse, 'animation', 'dataPulse 2s ease-out');

    const parentElement = this.elementRef.nativeElement.querySelector(
      '.animated-background'
    );
    if (parentElement) {
      this.renderer.appendChild(parentElement, pulse);

      // Remove after animation completes
      setTimeout(() => {
        this.renderer.removeChild(parentElement, pulse);
      }, 2000);
    }
  }
}
