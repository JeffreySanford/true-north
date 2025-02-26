import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veteran-resources',
  templateUrl: './veteran-resources.component.html',
  styleUrls: ['./veteran-resources.component.scss'],
  standalone: false
})
export class VeteranResourcesComponent {
  resources = [
    {
      title: 'Transition Assistance',
      description: 'Resources to help veterans transition from military to tech careers',
      links: [
        { name: 'VA Employment Services', url: 'https://www.va.gov/careers-employment/' },
        { name: 'True North Training Program', url: '#training' },
        { name: 'GI Bill Benefits for Coding Bootcamps', url: '#gi-bill' }
      ]
    },
    {
      title: 'Career Opportunities',
      description: 'Current openings at True North specifically for veterans',
      links: [
        { name: 'Software Developer Positions', url: '#jobs-dev' },
        { name: 'Cybersecurity Roles', url: '#jobs-security' },
        { name: 'Project Management', url: '#jobs-pm' },
        { name: 'Apprenticeship Programs', url: '#apprentice' }
      ]
    },
    {
      title: 'Technical Training',
      description: 'Resources to build your skills in technology and software',
      links: [
        { name: 'Angular Fundamentals for Veterans', url: '#angular' },
        { name: 'Cybersecurity Certification Paths', url: '#cyber-cert' },
        { name: 'Leadership in Tech', url: '#leadership' }
      ]
    }
  ];

  testimonials = [
    {
      quote: "True North gave me the opportunity to continue serving my country through technology. Their veteran-first approach made my transition to civilian life much smoother.",
      name: "John D.",
      rank: "Former Army Sergeant",
      position: "Senior Developer"
    },
    {
      quote: "After 12 years in the Marines, I wasn't sure how my skills would translate to tech. True North saw my potential and invested in my training. Now I lead our cybersecurity team.",
      name: "Sarah M.",
      rank: "Former Marine Captain",
      position: "Security Operations Lead"
    },
    {
      quote: "The discipline and attention to detail I learned in the Navy perfectly prepared me for software quality assurance. True North recognized this before I did.",
      name: "Michael R.",
      rank: "Navy Veteran",
      position: "QA Engineer"
    }
  ];
  
  constructor(private router: Router) {}
  
  applyNow() {
    // Navigate to application form or open modal
    this.router.navigate(['/careers/apply'], { queryParams: { source: 'veteran-resources' } });
    // Alternatively, you could trigger a modal dialog here
  }
}
