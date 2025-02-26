import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

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
  
  borderState: 'active' | 'inactive' = 'inactive';
  
  constructor() {
    console.log('Section Component is working...');
  }
  
  ngOnInit() {
    // Set border state based on active input
    this.borderState = this.active ? 'active' : 'inactive';
  }
  
  getThemeClass(): string {
    return `theme-${this.theme}`;
  }
  
  getBranchClass(): string {
    return this.militaryBranch !== 'none' ? `branch-${this.militaryBranch}` : '';
  }
  
  onMouseEnter() {
    this.borderState = 'active';
  }
  
  onMouseLeave() {
    if (!this.active) {
      this.borderState = 'inactive';
    }
  }
}
