import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OverlayConfig {
  type: 'tactical' | 'radar' | 'both';
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayConfigSubject = new BehaviorSubject<OverlayConfig>({
    type: 'both',
    isOpen: false
  });

  overlayConfig$ = this.overlayConfigSubject.asObservable();

  constructor() { }

  openTactical(): void {
    this.overlayConfigSubject.next({
      type: 'tactical',
      isOpen: true
    });
  }

  openRadar(): void {
    this.overlayConfigSubject.next({
      type: 'radar',
      isOpen: true
    });
  }

  openBoth(): void {
    this.overlayConfigSubject.next({
      type: 'both',
      isOpen: true
    });
  }

  closeOverlay(): void {
    this.overlayConfigSubject.next({
      ...this.overlayConfigSubject.value,
      isOpen: false
    });
  }
}
