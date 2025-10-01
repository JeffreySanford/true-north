import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CORE_SERVICES } from '../../business/core-services';
import { PatrioticThemeService } from '../../services/patriotic-theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  standalone: false
})
export class HomeComponent implements OnInit {
  services = CORE_SERVICES;
  missionStatement = `True North is a veteran-owned technology company dedicated to delivering exceptional data integrity, compliance, and modernization solutions. We bring military discipline and precision to solve complex technical challenges for government agencies and forward-thinking organizations.`;
  companyValues = [
    { title: 'Integrity', description: 'We operate with unwavering ethical standards and transparency in all we do.' },
    { title: 'Excellence', description: 'We pursue the highest quality in our solutions and services, never settling for "good enough".' },
    { title: 'Dedication', description: 'We commit fully to our mission and to the success of our clients and team members.' },
    { title: 'Adaptability', description: 'We embrace change and evolve our approaches to meet emerging challenges.' }
  ];

  constructor(private themeService: PatrioticThemeService) {}

  ngOnInit() {
    // Initialize home component
  }

  getThemeClass() {
    return this.themeService.getThemeClass('section');
  }

  getContextIcon(context: string) {
    return this.themeService.getContextIcon(context as any);
  }
}
