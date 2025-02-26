import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollService } from '../../common/services/scroll.service';

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
export class ModernizationComponent implements AfterViewInit {
  initialScrollY: number = 0;
  isVisible = false;
  buttonState = 'default';
  sectionHeight = window.innerHeight;
  zoomFactor = (DESIRED_MAX_ZOOM - 1) / this.sectionHeight;
  title = 'Modernization';
  description = 'Innovating to keep America ahead';
  backgroundImageUrl = 'assets/backgrounds/globe-digital.jpg';

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit(): void {
    this.initialScrollY = window.scrollY;
    this.scrollService.scrollPosition$.next(this.initialScrollY);
    this.scrollService.scrollPosition$.subscribe((scrollY: number) => {
      const sectionTop = this.initialScrollY;
      const sectionBottom = sectionTop + this.sectionHeight;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + window.innerHeight;
      this.isVisible = sectionTop < viewportBottom && sectionBottom > viewportTop;
    });
  }
}