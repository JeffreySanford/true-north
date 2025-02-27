import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollData, ScrollService } from '../../common/services/scroll.service';
import { TransitionService } from '../../common/services/transition.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DESIRED_MAX_ZOOM = 1.1;

@Component({
  selector: 'app-modernization',
  templateUrl: './modernization.component.html',
  styleUrls: ['./modernization.component.scss'],
  standalone: false,
  animations: [
    trigger('visibility', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('500ms 200ms ease-in-out'))
    ]),
    trigger('buttonScale', [
      state('default', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.1)' })),
      transition('default <=> hover', animate('200ms ease-in-out'))
    ])
  ]
})
export class ModernizationComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  initialScrollY: number = 0;
  isVisible = false;
  buttonState = 'default';
  sectionHeight = window.innerHeight;
  zoomFactor = (DESIRED_MAX_ZOOM - 1) / this.sectionHeight;
  title = 'Modernization';
  description = 'Innovating to keep America ahead';
  backgroundImageUrl = 'assets/backgrounds/modern-tech.jpg';
  private backgroundSet = false;

  constructor(
    private scrollService: ScrollService,
    private transitionService: TransitionService
  ) {}

  ngOnInit(): void {
    // Initialization code
  }

  ngAfterViewInit(): void {
    try {
      // Only set background once to prevent infinite updates
      if (!this.backgroundSet) {
        this.backgroundSet = true;
        // Apply the component-specific background using the transition service
        setTimeout(() => {
          this.transitionService.setSpecificBackground('modernization');
        }, 100); // Small delay to ensure component is fully initialized
      }
      
      this.initialScrollY = window.scrollY;
      this.scrollService.updateScrollPosition({
        position: this.initialScrollY,
        maxScroll: document.body.scrollHeight - window.innerHeight,
        percentage: this.initialScrollY / (document.body.scrollHeight - window.innerHeight)
      });
      
      this.scrollService.scrollPosition$
        .pipe(takeUntil(this.destroy$))
        .subscribe((scrollData: ScrollData) => {
          const sectionTop = this.initialScrollY;
          const sectionBottom = sectionTop + this.sectionHeight;
          const viewportTop = scrollData.position;
          const viewportBottom = scrollData.position + window.innerHeight;
          this.isVisible = sectionTop < viewportBottom && sectionBottom > viewportTop;
        });
    } catch (error) {
      console.error('Error in ngAfterViewInit:', error);
    }
  }

  ngOnDestroy(): void {
    // Don't reset the background on destroy to avoid potential circular updates
    // The app component will handle background changes when navigating
    
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  onButtonHover(): void {
    this.buttonState = 'hover';
  }
  
  onButtonLeave(): void {
    this.buttonState = 'default';
  }
}