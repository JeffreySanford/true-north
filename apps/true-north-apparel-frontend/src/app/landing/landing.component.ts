import { Component } from '@angular/core';

/**
 *
 */
@Component({
  selector: 'tna-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: false
})
export class LandingComponent {
  activeTile: 'quality' | 'community' | 'sustainability' | null = null;

  openOverlay(tile: 'quality' | 'community' | 'sustainability') {
    this.activeTile = tile;
  }

  closeOverlay() {
    this.activeTile = null;
  }
}
