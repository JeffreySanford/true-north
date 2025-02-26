import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface TransitionEvent {
  fromSection: string;
  toSection: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  private transitionSubject = new Subject<TransitionEvent>();
  private activeSectionSubject = new BehaviorSubject<string>('About Us');
  
  transition$ = this.transitionSubject.asObservable().pipe(
    debounceTime(50) // Prevent rapid firing
  );
  
  activeSection$ = this.activeSectionSubject.asObservable();
  
  constructor() {
    console.log('TransitionService initialized');
  }
  
  triggerTransition(fromSection: string, toSection: string): void {
    if (fromSection === toSection) return;
    
    this.transitionSubject.next({
      fromSection,
      toSection,
      timestamp: Date.now()
    });
    
    this.activeSectionSubject.next(toSection);
  }
  
  applyPageEffects(): void {
    // Add custom visual effects to the page container
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) return;
    
    // Apply a subtle pulse effect
    pageContainer.classList.add('pulse-effect');
    setTimeout(() => {
      pageContainer.classList.remove('pulse-effect');
    }, 1000);
  }
  
  animateBackgroundIntensity(): void {
    // Increase background animation intensity temporarily
    const background = document.querySelector('app-animated-background');
    if (background) {
      background.classList.add('intensified');
      setTimeout(() => {
        background.classList.remove('intensified');
      }, 2000);
    }
  }
}
