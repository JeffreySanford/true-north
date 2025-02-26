import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CORE_SERVICES, CASE_STUDIES, ServiceOffering } from '../../services'; // Import from the barrel files';
import { PatrioticThemeService } from '../../services/patriotic-theme.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.7s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  standalone: false
})
export class ServiceDetailComponent implements OnInit {
  service: ServiceOffering | undefined;
  relatedServices: ServiceOffering[] = [];
  relatedCaseStudies: any[] = [];
  serviceId: string = '';
  isLoading: boolean = true;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: PatrioticThemeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serviceId = params['id'];
      this.isLoading = true;
      this.loadServiceDetails();
      setTimeout(() => {
        this.isLoading = false;
      }, 800); // Simulated loading to show the spinner
    });
  }

  loadServiceDetails() {
    this.service = CORE_SERVICES.find(service => service.id === this.serviceId);
    
    if (!this.service) {
      this.notFound = true;
      console.error(`Service with ID ${this.serviceId} not found`);
      return;
    }
    
    this.loadRelatedContent();
  }

  loadRelatedContent() {
    if (this.service) {
      // Load related services
      this.relatedServices = CORE_SERVICES.filter(
        s => this.service?.relatedServices.includes(s.id)
      );

      // Load related case studies
      this.relatedCaseStudies = CASE_STUDIES.filter(
        cs => cs.serviceIds.includes(this.serviceId)
      );
    }
  }

  getThemeClass() {
    return this.themeService.getThemeClass('section');
  }

  getContextIcon(context: string) {
    return this.themeService.getContextIcon(context as any);
  }
  
  requestConsultation() {
    this.router.navigate(['/contact'], { 
      queryParams: { 
        service: this.service?.id,
        subject: `Consultation for ${this.service?.title}`
      }
    });
  }
  
  downloadInfoSheet() {
    // Implement download functionality or modal
    alert(`Downloading info sheet for ${this.service?.title}`);
    // In a real implementation, you might redirect to a PDF or trigger a download
  }
  
  backToServices() {
    this.router.navigate(['/services']);
  }
}
