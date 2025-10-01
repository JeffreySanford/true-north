import { Component, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: false,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.7s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('highlightBorder', [
      state('inactive', style({
        borderLeftWidth: '5px'
      })),
      state('active', style({
        borderLeftWidth: '10px',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ]),
    trigger('scrollAnimation', [
      transition('void => *', [
        query('.animated-element', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SectionComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() content: string = '';
  @Input() imagePath: string = '';
  @Input() buttonText: string = 'Learn More';
  @Input() theme: 'red' | 'white' | 'blue' = 'blue';
  @Input() icon: string = '';
  @Input() showStars: boolean = true;
  @Input() militaryBranch: 'army' | 'navy' | 'airforce' | 'marines' | 'coastguard' | 'none' = 'none';
  @Input() active: boolean = false;
  @Input() parallaxRatio: number = 0.5;
  @Input() parallaxEnabled: boolean = true;
  @Input() backgroundImage: string = '';
  
  // Add tactical and radar display options
  @Input() showTacticalDisplay: boolean = false;
  @Input() showRadarDisplay: boolean = false;
  @Input() displaySize: number = 200;
  @Input() displayBrightness: number = 1.5;
  
  borderState: 'active' | 'inactive' = 'inactive';
  isVisible: boolean = false;
  
  constructor(private elementRef: ElementRef) {
    console.log('Section Component is working...');
  }
  
  ngOnInit() {
    // Set border state based on active input
    this.borderState = this.active ? 'active' : 'inactive';
    
    // Check initial visibility
    this.checkVisibility();
  }
  
  @HostListener('window:scroll', ['$event'])
  checkVisibility() {
    const elementPosition = this.elementRef.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Element comes into view (hits one-quarter mark)
    if (elementPosition.top < windowHeight * 0.75) {
      this.isVisible = true;
    } else if (elementPosition.bottom < 0 || elementPosition.top > windowHeight) {
      // Element has left the viewport
      this.isVisible = false;
    }
  }
  
  getThemeClass(): string {
    return `theme-${this.theme}`;
  }
  
  getBranchClass(): string {
    return this.militaryBranch !== 'none' ? `branch-${this.militaryBranch}` : '';
  }
  
  getParallaxStyle() {
    if (!this.parallaxEnabled) return {};
    
    const scrollPosition = window.pageYOffset;
    const offset = this.elementRef.nativeElement.offsetTop;
    const distance = scrollPosition - offset;
    const translateY = distance * this.parallaxRatio * -1;
    
    return { 
      'background-image': this.backgroundImage ? `url(${this.backgroundImage})` : '',
      'background-position': `center ${translateY}px`
    };
  }
  
  onMouseEnter() {
    this.borderState = 'active';
  }
  
  onMouseLeave() {
    if (!this.active) {
      this.borderState = 'inactive';
    }
  }
  
  // Calculate tactical display position
  getTacticalDisplayPosition() {
    return { 'right': '30px', 'top': '70px' };
  }
  
  // Calculate radar display position
  getRadarDisplayPosition() {
    return { 'left': '30px', 'bottom': '70px' };
  }
  
  // Calculate parallax ratio for each element - creates more dynamic effect
  getSeparatorParallax(): number {
    return 0.2;
  }
  
  getContentParallax(): number {
    return -0.1;
  }
  
  getStripeParallax(): number {
    return 0.3;
  }
}
