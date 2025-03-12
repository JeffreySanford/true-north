import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, group, animateChild } from '@angular/animations';
import { TransitionService } from './common/services/transition.service';
import { PatrioticThemeService, ThemeMode } from './services/patriotic-theme.service';
import { OverlayService } from './services/overlay.service';
import { CORE_SERVICES, CASE_STUDIES, ServiceOffering, CaseStudy } from './services/core-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    ]),
    trigger('pageTransition', [
      transition('* => *', [
        style({ opacity: 0.8 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('sectionAnimation', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0.3, transform: 'translateY(20px)' })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('600ms ease-in-out'))
    ]),
    trigger('heroAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('800ms 300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  standalone: false
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'True North Insights';
  subtitle = 'Creating Secure and Compliant Solutions for Enterprises and Government Agencies';
  logo = 'assets/images/true-north-logo.png';
  backgroundImageUrl = 'assets/backgrounds/globe-digital.jpg';
  activeSection = 'About Us';
  
  sections = [
    {
      "name": "Tactical",
      "route": "/tactical",
      "description": "Command and Control Visualization",
      "content": "Real-time tactical display providing comprehensive situational awareness with integrated sensor and radar data. Monitor battlefield conditions, track friendly and enemy units, and maintain command and control in a secure, compliant environment. Advanced visualization capabilities deliver critical intelligence for decision-makers, enhancing operational efficiency.",
      "buttonText": "Tactical Details",
      "icon": "radar",
      "details": [
        "Real-time unit tracking and monitoring",
        "Integrated threat detection system",
        "Secure communications interface",
        "Multi-domain operational awareness"
      ]
    },
    {
      "name": "About Us",
      "route": "/about",
      "description": "Veteran-Led. American-Made. North Dakota Proud.",
      "content": "True North is a veteran-led technology company based in Jamestown, North Dakota, embodying the state's \"Be Legendary\" spirit in everything we do. Founded by veterans with a passion for technology and service, we deliver security-first solutions that modernize government operations and improve efficiency. We're committed to building innovative systems while creating meaningful career opportunities for those who've served our country. Our team brings military discipline and technical excellence to every project.",
      "buttonText": "Our Story",
      "icon": "military_tech",
      "details": [
        "Founded by veterans in Jamestown, ND",
        "Dedicated to hiring and training veteran developers",
        "Committed to American values and excellence"
      ]
    },
    {
      "name": "Services",
      "route": "/services",
      "description": "Secure, Compliant Technology Solutions",
      "content": "We specialize in developing custom applications for government agencies and businesses, leveraging a diverse technology stack and modern design principles to meet the highest security and compliance standards. Our solutions range from cloud-based systems to secure on-premise installations. We excel in cybersecurity services aligned with NIST and DoD standards (including NIST RMF), deliver advanced data visualization, and implement blockchain solutions for audit trails and data provenance. We design our systems with FedRAMP compliance in mind and provide real-time auditing capabilities. Our veteran-led teams bring military precision and a security-first mindset to every project.",
      "buttonText": "Our Capabilities",
      "icon": "settings",
      "details": [
        "Full-stack web development with modern frameworks",
        "Government-grade cybersecurity & compliance solutions",
        "Data visualization and intelligence tools",
        "Blockchain and secure ledger implementations"
      ]
    },
    {
      "name": "Join the Team",
      "route": "/join-the-team",
      "description": "From Service to Software: Creating Tech Careers",
      "content": "At True North, veterans aren't just our employees\u2014they're our foundation. We actively recruit, train, and mentor veterans transitioning to civilian careers in technology. Starting lean, we've built a core team that delivers with agility and excellence, setting the stage for deliberate growth. Our hiring roadmap prioritizes veteran talent and outlines a phased expansion: after early successes, we'll scale our team strategically to take on larger federal contracts and more complex projects. This mission-driven growth ensures we maintain our security-first culture and technical excellence as we expand. When you join True North, you're not just taking a job\u2014you're becoming part of a long-term vision to modernize government technology while supporting those who served.",
      "buttonText": "Join Our Team",
      "icon": "stars",
      "details": [
        "Veteran hiring preference for all positions",
        "Training and mentorship programs for transitioning service members",
        "Remote work options for veterans nationwide",
        "Career pathways from entry-level to leadership",
        "Phased growth strategy for larger federal contracts"
      ]
    },
    {
      "name": "Mission",
      "route": "/mission",
      "description": "American Values, Technical Excellence, Legendary Service",
      "content": "Our mission extends beyond creating outstanding technology. We're committed to supporting American prosperity, strengthening national security, and modernizing government operations for greater efficiency through superior technology solutions, all while embodying the values of honor, integrity, and excellence in everything we do. We proudly support our military, law enforcement, and first responders. As a North Dakota company, we bring Midwestern work ethic and values to the digital frontier\u2014building legendary software with legendary service.",
      "buttonText": "Our Values",
      "icon": "flag",
      "details": [
        "Supporting American innovation and national security",
        "Promoting veteran entrepreneurship and employment",
        "Delivering reliable, secure, and ethical technology solutions",
        "Strengthening our North Dakota community"
      ]
    },
    {
      "name": "Projects",
      "route": "/projects",
      "description": "Excellence in Action: Our Work Speaks for Itself",
      "content": "From government agencies to private enterprises, our portfolio demonstrates our commitment to excellence and innovation. We've modernized legacy systems with FedRAMP-compliant cloud solutions for federal agencies, created intelligence visualization tools for law enforcement, implemented blockchain solutions for audit trails and data provenance, and built scalable applications that drive operational efficiency for growing businesses. Every project is delivered with military-grade attention to detail, security, and performance\u2014on time and on budget.",
      "buttonText": "View Portfolio",
      "icon": "work",
      "details": [
        "Federal and state government contracts",
        "Law enforcement technology solutions",
        "Blockchain implementation case studies",
        "Custom software for American enterprises"
      ]
    }
  ];
  
  // Add core services and case studies data
  coreServices: ServiceOffering[] = CORE_SERVICES;
  caseStudies: CaseStudy[] = CASE_STUDIES;
  
  @ViewChild('pageContainer', { static: false }) pageContainerRef!: ElementRef;
  private sectionInitialized = false; // Flag to prevent multiple initializations
  
  // Current theme mode and branch
  private currentThemeMode: ThemeMode = 'light';
  private currentBranch: string = 'none';
  
  constructor(
    private transitionService: TransitionService,
    private themeService: PatrioticThemeService,
    private overlayService: OverlayService
  ) {
    console.log('AppComponent is working...');
  }

  ngOnInit() {
    // Apply theme to document
    this.themeService.applyThemeToDocument();
    
    // Initialize tactical display elements
    this.initTacticalDisplay();
    
    // Set up parallax scroll effect
    this.initParallaxScrolling();
    
    // Listen for theme changes
    this.themeService.getThemeConfig().subscribe(() => {
      this.themeService.applyThemeToDocument();
      this.updateSectionBackgrounds();
    });
    
    // Listen for theme mode changes
    this.themeService.getThemeMode().subscribe(mode => {
      this.currentThemeMode = mode;
      this.updateSectionBackgrounds();
    });
    
    // Listen for overlay changes
    this.overlayService.overlayConfig$.subscribe(config => {
      if (config.isOpen) {
        if (config.type === 'tactical' || config.type === 'both') {
          this.displayTacticalOverlay();
        }
        if (config.type === 'radar' || config.type === 'both') {
          this.displayRadarOverlay();
        }
      } else {
        this.hideOverlays();
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Set page container reference in transition service
    if (this.pageContainerRef) {
      // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.transitionService.setPageContainer(this.pageContainerRef);
        
        // Only initialize section once
        if (!this.sectionInitialized) {
          this.sectionInitialized = true;
          this.initializeActiveSection();
        }
        
        // Set initial section backgrounds
        this.updateSectionBackgrounds();
      });
    }
  }
  
  // Update section backgrounds based on current theme
  updateSectionBackgrounds() {
    // Get current theme config
    this.themeService.getThemeConfig().subscribe(config => {
      this.currentBranch = config.selectedBranch || 'none';
      
      this.sections.forEach((section, index) => {
        const sectionElement = document.getElementById(section.name.toLowerCase().replace(/\s+/g, '-'));
        if (sectionElement) {
          // Remove all existing theme classes
          sectionElement.classList.remove('theme-light', 'theme-dark', 'theme-tactical');
          sectionElement.classList.remove('branch-army', 'branch-navy', 'branch-airforce', 'branch-marines', 'branch-coastguard');
          
          // Add current theme class
          sectionElement.classList.add(`theme-${this.currentThemeMode}`);
          
          // Add branch class if applicable
          if (this.currentBranch !== 'none') {
            sectionElement.classList.add(`branch-${this.currentBranch}`);
          }
          
          // Add section-specific background based on theme
          let bgUrl = this.getBackgroundForSection(section.name, this.currentThemeMode, this.currentBranch);
          sectionElement.style.backgroundImage = `url(${bgUrl})`;
          
          // Set opacity as a class instead of directly on style
          sectionElement.classList.remove('opacity-tactical', 'opacity-standard');
          if (this.currentThemeMode === 'tactical') {
            sectionElement.classList.add('opacity-tactical');
          } else {
            sectionElement.classList.add('opacity-standard');
          }
        }
      });
    });
  }
  
  // Get appropriate background image based on section, theme mode, and military branch
  getBackgroundForSection(sectionName: string, themeMode: ThemeMode, branch?: string): string {
    const baseFolder = 'assets/backgrounds/';
    
    // Default backgrounds by section
    const sectionBackgrounds: {[key: string]: {[key: string]: string}} = {
      'Tactical': {
        'light': `${baseFolder}tactical-light.jpg`,
        'dark': `${baseFolder}tactical-dark.jpg`,
        'tactical': `${baseFolder}tactical-green.jpg`
      },
      'About Us': {
        'light': `${baseFolder}about-us-light.jpg`,
        'dark': `${baseFolder}about-us-dark.jpg`,
        'tactical': `${baseFolder}about-us-tactical.jpg`
      },
      'Services': {
        'light': `${baseFolder}services-light.jpg`,
        'dark': `${baseFolder}services-dark.jpg`,
        'tactical': `${baseFolder}services-tactical.jpg`
      },
      'Veterans': {
        'light': `${baseFolder}veterans-light.jpg`,
        'dark': `${baseFolder}veterans-dark.jpg`,
        'tactical': `${baseFolder}veterans-tactical.jpg`
      },
      'Mission': {
        'light': `${baseFolder}mission-light.jpg`,
        'dark': `${baseFolder}mission-dark.jpg`,
        'tactical': `${baseFolder}mission-tactical.jpg`
      },
      'Projects': {
        'light': `${baseFolder}projects-light.jpg`,
        'dark': `${baseFolder}projects-dark.jpg`,
        'tactical': `${baseFolder}projects-tactical.jpg`
      }
    };
    
    // Branch-specific backgrounds (if available)
    if (branch && branch !== 'none') {
      const branchBg = `${baseFolder}${sectionName.toLowerCase().replace(/\s+/g, '-')}-${branch}.jpg`;
      // This would require having branch-specific images for each section
      // For now, fall back to theme-based backgrounds
      
      // Return branch background if it exists, otherwise use theme background
      return this.imageExists(branchBg) ? 
        branchBg : 
        sectionBackgrounds[sectionName][themeMode] || `${baseFolder}default-${themeMode}.jpg`;
    }
    
    // Return theme-based background
    return sectionBackgrounds[sectionName][themeMode] || `${baseFolder}default-${themeMode}.jpg`;
  }
  
  // Check if an image exists (for branch-specific backgrounds)
  imageExists(url: string): boolean {
    // This is a simplified check, you might want to implement a more robust solution
    const img = new Image();
    img.src = url;
    return img.complete;
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

  // Initialize parallax scrolling effects
  initParallaxScrolling() {
    const parallaxContainer = document.querySelector('.parallax-container');
    if (parallaxContainer) {
      parallaxContainer.addEventListener('scroll', () => {
        this.handleParallaxScroll();
      });
    }
  }
  
  // Handle parallax scrolling effects
  handleParallaxScroll() {
    const scrollPosition = window.scrollY;
    
    // Adjust background opacity based on scroll position
    document.querySelectorAll('.section').forEach((element: Element) => {
      // Properly cast Element to HTMLElement
      const section = element as HTMLElement;
      
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate distance from viewport center
      const distanceFromCenter = Math.abs(sectionTop + sectionHeight / 2 - window.innerHeight / 2);
      
      // Apply opacity based on visibility in viewport
      const opacity = 1 - Math.min(distanceFromCenter / (window.innerHeight / 1.5), 1);
      section.style.opacity = opacity.toString();
      
      // Parallax effect for section content
      const translateY = (rect.top * 0.2);
      const content = section.querySelector('.content') as HTMLElement;
      if (content) {
        content.style.transform = `translateY(${translateY}px)`;
      }
      
      // If section is centered in viewport, activate tactical overlay for Tactical section
      if (Math.abs(distanceFromCenter) < 100) {
        const sectionId = section.id;
        if (sectionId === 'tactical') {
          this.overlayService.openTactical();
        } else {
          this.overlayService.closeOverlay();
        }
      }
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateActiveSection();
  }
  
  // Update active section based on scroll position
  updateActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    let currentSection = this.sections[0].name;
    document.querySelectorAll('.section').forEach((element: Element) => {
      // Properly cast Element to HTMLElement
      const section = element as HTMLElement;
      
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        const sectionId = section.id;
        const matchingSection = this.sections.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === sectionId);
        if (matchingSection) {
          currentSection = matchingSection.name;
        }
      }
    });
    
    if (this.activeSection !== currentSection) {
      this.activeSection = currentSection;
      this.playTacticalSound();
      
      // Update theme based on section
      this.updateThemeForSection(currentSection);
    }
  }
  
  // Update theme based on active section
  updateThemeForSection(sectionName: string) {
    // Special cases for section-specific themes
    if (sectionName === 'Tactical') {
      this.themeService.setThemeMode('tactical');
      this.overlayService.openTactical();
    } else if (sectionName === 'Veterans') {
      // Check the current branch setting by subscribing to the theme config
      this.themeService.getThemeConfig().subscribe(config => {
        if (config.selectedBranch === 'none') {
          this.themeService.setMilitaryBranch('army'); // Default to army for Veterans section
        }
      });
    } else if (sectionName === 'Mission') {
      this.themeService.setActiveColor('red'); // Use patriotic red for Mission section
    } else {
      // Keep current theme mode but close tactical overlays for other sections
      this.overlayService.closeOverlay();
    }
  }

  // Display tactical overlay elements
  displayTacticalOverlay() {
    const overlay = document.querySelector('.tactical-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
    } else {
      this.createTacticalOverlay();
    }
  }
  
  // Display radar overlay elements
  displayRadarOverlay() {
    const overlay = document.querySelector('.radar-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
    } else {
      this.createRadarOverlay();
    }
  }
  
  // Hide all overlays
  hideOverlays() {
    const overlays = document.querySelectorAll('.tactical-overlay, .radar-overlay');
    overlays.forEach((overlay: Element) => {
      const overlayEl = overlay as HTMLElement;
      overlayEl.style.opacity = '0';
      setTimeout(() => {
        overlayEl.style.display = 'none';
      }, 500);
    });
  }
  
  // Create tactical overlay elements dynamically
  createTacticalOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'tactical-overlay';
    overlay.innerHTML = `
      <div class="tactical-grid"></div>
      <div class="tactical-crosshair"></div>
      <div class="tactical-scanner"></div>
      <div class="tactical-status">STATUS: OPERATIONAL</div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  }
  
  // Create radar overlay elements dynamically
  createRadarOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'radar-overlay';
    overlay.innerHTML = `
      <div class="radar-sweep"></div>
      <div class="radar-grid"></div>
      <div class="radar-blips"></div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.opacity = '1';
      this.animateRadarBlips(overlay);
    }, 10);
  }
  
  // Animate radar blips
  animateRadarBlips(radarOverlay: HTMLElement) {
    const blipsContainer = radarOverlay.querySelector('.radar-blips') as HTMLElement;
    if (!blipsContainer) return;
    
    // Create some random blips
    for (let i = 0; i < 5; i++) {
      const blip = document.createElement('div');
      blip.className = 'radar-blip';
      
      // Random position within the radar
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 80; // Between 20-100% from center
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      blip.style.left = `calc(50% + ${x}px)`;
      blip.style.top = `calc(50% + ${y}px)`;
      
      // Random size
      const size = 4 + Math.random() * 8; // 4-12px
      blip.style.width = `${size}px`;
      blip.style.height = `${size}px`;
      
      // Random pulse rate
      const pulseRate = 1 + Math.random() * 2; // 1-3s
      blip.style.animation = `pulse ${pulseRate}s infinite`;
      
      blipsContainer.appendChild(blip);
    }
  }

  onLogoClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onSectionClick(section: { name: string, route: string }, event: any) {
    event.preventDefault();
    
    // Only proceed if changing to a different section
    if (this.activeSection === section.name) return;
    
    const previousSection = this.activeSection;
    this.activeSection = section.name;
    
    // Use transition service
    this.transitionService.triggerTransition(previousSection, section.name);
    
    this.createRippleEffect(event);
    
    document.querySelector('.page-container')?.classList.add('transition-effect');
    
    // Find the section element and scroll to it
    const sectionId = section.name.toLowerCase().replace(/\s+/g, '-');
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    setTimeout(() => {
      this.activeSection = section.name;
      console.log(`Section changed to: ${section.name}`);
      
      setTimeout(() => {
        document.querySelector('.page-container')?.classList.remove('transition-effect');
      }, 800);
    }, 300);

    // Add tactical sound effect
    this.playTacticalSound();
    
    // Update the theme based on the newly selected section
    this.updateThemeForSection(section.name);
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
  
  // Initialize active section without causing circular updates
  initializeActiveSection(): void {
    if (this.activeSection) {
      console.log("Initializing active section:", this.activeSection);
      const section = this.sections.find(s => s.name === this.activeSection);
      if (section) {
        this.transitionService.triggerTransition('', this.activeSection);
      }
    }
  }
}
