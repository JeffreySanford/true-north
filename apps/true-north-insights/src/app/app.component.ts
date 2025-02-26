import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, group, animateChild } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  animations: [
    trigger('sectionAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'perspective(1000px) rotateX(0) scale(1)',
        filter: 'blur(0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'perspective(1000px) rotateX(5deg) scale(0.97)',
        filter: 'blur(4px)',
        display: 'none'
      })),
      transition('out => in', [
        style({ 
          display: 'block',
          transformOrigin: 'center bottom'
        }),
        group([
          animate('0.7s cubic-bezier(0.22, 1, 0.36, 1)', style({ 
            opacity: 1, 
            transform: 'perspective(1000px) rotateX(0) scale(1)',
          })),
          animate('0.5s ease-out', style({ 
            filter: 'blur(0)'
          }))
        ]),
        query('.section-icon, .section-title, .section-subtitle, .separator, .section-content, .section-details, .action-button', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(80, [
            animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', style({ 
              opacity: 1, 
              transform: 'translateY(0)'
            }))
          ])
        ], { optional: true })
      ]),
      transition('in => out', [
        group([
          animate('0.4s ease-in', style({ 
            opacity: 0,
            transform: 'perspective(1000px) rotateX(5deg) scale(0.97)'
          })),
          animate('0.3s ease-in', style({ 
            filter: 'blur(4px)'
          }))
        ])
      ])
    ]),
    
    trigger('heroAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('1.2s cubic-bezier(0.165, 0.84, 0.44, 1)', style({ 
          opacity: 1, 
          transform: 'translateY(0)' 
        }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ 
          opacity: 0, 
          transform: 'translateY(-30px)' 
        }))
      ])
    ]),
    
    trigger('pageTransition', [
      transition('* => *', [
        query('.page-container', [
          style({ 
            position: 'relative',
            overflow: 'hidden' 
          }),
          animate('0.8s ease', style({ 
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)' 
          })),
          animate('0.8s ease', style({ 
            background: 'none' 
          }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'True North Insights';
  subtitle = 'A Veteran-Led Technology Firm';
  logo = 'assets/images/true-north-logo.png';
  backgroundImageUrl = 'assets/backgrounds/globe-digital.jpg';
  activeSection = 'Tactical'; // Set default to Tactical to display it first
  
  sections = [
    { 
      name: 'Tactical', // Add the Tactical section to the navigation
      route: '/tactical', 
      description: 'Command and Control Visualization',
      content: `Real-time tactical display showing situational awareness with integrated radar system. 
                Monitor battlefield conditions, track friendly and enemy units, and maintain command and control 
                in a secure environment. Advanced visualization capabilities provide critical intelligence for
                decision makers.`,
      buttonText: 'Tactical Details',
      icon: 'radar',
      details: [
        'Real-time unit tracking and monitoring',
        'Integrated threat detection system',
        'Secure communications interface',
        'Multi-domain operational awareness'
      ]
    },
    { 
      name: 'About Us', 
      route: '/about', 
      description: 'Veteran-Led. American-Made. North Dakota Proud.',
      content: `True North is a veteran-led technology company based in Jamestown, North Dakota. We embody 
                North Dakota's "Be Legendary" spirit in everything we do. Founded by veterans with a passion 
                for technology and service, we're committed to building secure, innovative solutions while 
                creating meaningful career opportunities for those who've served our country. Our team brings 
                military discipline and technical excellence to every project.`,
      buttonText: 'Our Story',
      icon: 'military_tech',
      details: [
        'Founded by veterans in Jamestown, ND',
        'Dedicated to hiring and training veteran developers',
        'Committed to American values and excellence'
      ]
    },
    { 
      name: 'Services', 
      route: '/services', 
      description: 'Secure, Compliant Technology Solutions',
      content: `We specialize in developing custom applications built on Angular, NestJS, and Material Design 
                that meet the highest security and compliance standards. Our solutions range from cloud-based 
                systems to secure on-premise installations. We excel in cybersecurity services aligned with NIST 
                and DoD requirements, advanced data visualization, and blockchain implementations. Our veteran-led 
                teams bring military precision to technology development.`,
      buttonText: 'Our Capabilities',
      icon: 'settings',
      details: [
        'Web application development with Angular & NestJS',
        'Government-grade cybersecurity solutions',
        'Data visualization and intelligence tools',
        'Blockchain and secure ledger implementations'
      ]
    },
    { 
      name: 'Veterans', 
      route: '/veterans', 
      description: 'From Service to Software: Creating Tech Careers',
      content: `At True North, veterans aren't just our employees—they're our foundation. We actively recruit, train, 
                and mentor veterans transitioning to civilian careers in technology. Our hiring preference for veterans
                recognizes the unique skills, leadership, and discipline military service instills. We've developed 
                specialized training programs to help veterans translate their military experience into successful 
                technology careers. When you work with us, you're supporting veteran employment.`,
      buttonText: 'Join Our Team',
      icon: 'stars',
      details: [
        'Veteran hiring preference for all positions',
        'Training and mentorship programs for transitioning service members',
        'Remote work options for veterans nationwide',
        'Career pathways from entry-level to leadership'
      ]
    },
    { 
      name: 'Mission', 
      route: '/mission', 
      description: 'American Values, Technical Excellence, Legendary Service',
      content: `Our mission extends beyond creating outstanding technology. We're committed to supporting American 
                prosperity, strengthening national security through superior technology solutions, and embodying 
                the values of honor, integrity, and excellence in everything we do. We proudly support our military, 
                law enforcement, and first responders. As a North Dakota company, we bring Midwestern work ethic and 
                values to the digital frontier—building legendary software with legendary service.`,
      buttonText: 'Our Values',
      icon: 'flag',
      details: [
        'Supporting American innovation and national security',
        'Promoting veteran entrepreneurship and employment',
        'Delivering reliable, secure, and ethical technology solutions',
        'Strengthening our North Dakota community'
      ]
    },
    { 
      name: 'Projects', 
      route: '/projects', 
      description: 'Excellence in Action: Our Work Speaks for Itself',
      content: `From government agencies to private enterprises, our portfolio demonstrates our commitment to 
                excellence. We've developed secure data systems for federal contracts, created intelligence 
                visualization tools for law enforcement, implemented blockchain solutions for audit trails, 
                and built scalable applications for growing businesses. Every project is delivered with 
                military-grade attention to detail, security, and performance—on time and on budget.`,
      buttonText: 'View Portfolio',
      icon: 'work',
      details: [
        'Federal and state government contracts',
        'Law enforcement technology solutions',
        'Blockchain implementation case studies',
        'Custom software for American enterprises'
      ]
    }
  ];
  
  constructor() {
    console.log('AppComponent is working...');
  }

  ngOnInit() {
    // Add ambient background movement
    this.initAmbientMovement();
    
    // Initialize tactical display elements
    this.initTacticalDisplay();
  }
  
  // Create subtle ambient movement in background
  initAmbientMovement() {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      const compass = document.querySelector('.compass-rose') as HTMLElement;
      if (compass) {
        compass.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${this.getCompassRotation()}deg)`;
      }
    });
  }
  
  // Simulate compass behavior
  getCompassRotation() {
    const now = new Date();
    return (now.getSeconds() + now.getMilliseconds() / 1000) * 6;
  }
  
  // Initialize tactical display elements
  initTacticalDisplay() {
    setInterval(() => {
      // Simulate tactical scan effect
      const tacticalHud = document.querySelector('.tactical-hud') as HTMLElement;
      if (tacticalHud) {
        tacticalHud.classList.add('scanning');
        setTimeout(() => {
          tacticalHud.classList.remove('scanning');
        }, 500);
      }
    }, 5000);
  }

  onLogoClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onSectionClick(section: { name: string, route: string }, event: any) {
    this.createRippleEffect(event);
    
    document.querySelector('.page-container')?.classList.add('transition-effect');
    
    setTimeout(() => {
      this.activeSection = section.name;
      console.log(`Section changed to: ${section.name}`);
      
      setTimeout(() => {
        document.querySelector('.page-container')?.classList.remove('transition-effect');
      }, 800);
    }, 300);

    // Add tactical sound effect
    this.playTacticalSound();
  }
  
  createRippleEffect(event: any) {
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = pageContainer.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size * 2}px`;
    ripple.style.left = `${event.clientX - rect.left - size}px`;
    ripple.style.top = `${event.clientY - rect.top - size}px`;
    
    pageContainer.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }

  // Simple tactical UI sound
  playTacticalSound() {
    try {
      const audio = new Audio('assets/sounds/tactical-click.mp3');
      audio.volume = 0.2;
      audio.play();
    } catch (e) {
      console.log('Audio playback not supported');
    }
  }
}
