import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, throttleTime, map } from 'rxjs/operators';

export interface ScrollData {
  position: number;
  maxScroll: number;
  percentage: number;
}

export interface RadarData {
  angle: number;      // Angle in degrees (0-360)
  distance: number;   // Normalized distance from center (0-1)
  intensity: number;  // Signal intensity (0-1)
}

export interface TacticalHudData {
  elevation: number;   // Vertical position indicator (-1 to 1)
  velocity: number;    // Scroll speed indicator
  sections: {          // Nearby content sections
    above: string[];
    current: string;
    below: string[];
  };
  progress: number;    // Overall progress through content (0-1)
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new BehaviorSubject<ScrollData>({
    position: 0,
    maxScroll: 0,
    percentage: 0
  });

  private radarDataSubject = new BehaviorSubject<RadarData[]>([]);
  private tacticalHudSubject = new BehaviorSubject<TacticalHudData>(this.getDefaultTacticalData());
  private lastScrollPosition = 0;
  private scrollVelocity = 0;
  
  scrollPosition$ = this.scrollSubject.asObservable();
  radarData$ = this.radarDataSubject.asObservable();
  tacticalHud$ = this.tacticalHudSubject.asObservable();

  constructor(private zone: NgZone) { 
    console.log('ScrollService is active');
    this.initScrollTracking();
  }

  private initScrollTracking(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(50))
        .subscribe(() => {
          const position = window.pageYOffset || document.documentElement.scrollTop;
          const height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
          ) - window.innerHeight;
          
          const scrollData = {
            position: position,
            maxScroll: height,
            percentage: height > 0 ? position / height : 0
          };

          // Calculate velocity for tactical HUD
          this.scrollVelocity = position - this.lastScrollPosition;
          this.lastScrollPosition = position;

          this.zone.run(() => {
            this.scrollSubject.next(scrollData);
            this.updateRadarData(scrollData);
            this.updateTacticalHudData(scrollData);
          });
        });
    });
  }

  private updateRadarData(scrollData: ScrollData): void {
    // Generate radar blips based on content sections and scroll position
    const radarBlips: RadarData[] = [];
    
    // Main position blip
    radarBlips.push({
      angle: scrollData.percentage * 360,
      distance: 0.5,
      intensity: 1.0
    });
    
    // Add "echo" blips representing nearby content
    radarBlips.push({
      angle: (scrollData.percentage * 360 + 30) % 360,
      distance: 0.7,
      intensity: 0.6
    });
    
    radarBlips.push({
      angle: (scrollData.percentage * 360 - 45) % 360,
      distance: 0.85,
      intensity: 0.4
    });
    
    this.radarDataSubject.next(radarBlips);
  }

  private updateTacticalHudData(scrollData: ScrollData): void {
    // Create tactical HUD data based on current position and velocity
    const tacticalData: TacticalHudData = {
      elevation: (scrollData.percentage * 2) - 1, // Convert to -1 to 1 range
      velocity: this.normalizeVelocity(this.scrollVelocity),
      sections: this.getNearbyContentSections(),
      progress: scrollData.percentage
    };
    
    this.tacticalHudSubject.next(tacticalData);
  }

  private normalizeVelocity(velocity: number): number {
    // Cap and normalize velocity to a reasonable range (-1 to 1)
    const maxVelocity = 100;
    return Math.max(-1, Math.min(1, velocity / maxVelocity));
  }

  private getNearbyContentSections(): TacticalHudData['sections'] {
    // In a real implementation, this would detect actual nearby content sections
    return {
      above: ['Previous Section'],
      current: 'Current Content Section',
      below: ['Next Section', 'Future Section']
    };
  }

  private getDefaultTacticalData(): TacticalHudData {
    return {
      elevation: 0,
      velocity: 0,
      sections: {
        above: [],
        current: 'Loading...',
        below: []
      },
      progress: 0
    };
  }

  // Public methods to manually get data
  getRadarData(): RadarData[] {
    return this.radarDataSubject.getValue();
  }

  getTacticalHudData(): TacticalHudData {
    return this.tacticalHudSubject.getValue();
  }

  // Add this public method to update scroll position
  updateScrollPosition(scrollData: ScrollData): void {
    this.scrollSubject.next(scrollData);
    this.updateRadarData(scrollData);
    this.updateTacticalHudData(scrollData);
  }
}
