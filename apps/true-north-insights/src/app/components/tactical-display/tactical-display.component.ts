import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tactical-display',
  templateUrl: './tactical-display.component.html',
  styleUrls: ['./tactical-display.component.scss'],
  standalone: false
})
export class TacticalDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tacticalCanvas') tacticalCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  private gridSize: number = 20;
  private entities: any[] = [];
  date: Date = new Date();
  
  // State for expanded view
  isExpanded = false;
  private expandedSubject = new BehaviorSubject<boolean>(false);
  expanded$ = this.expandedSubject.asObservable();

  // Tactical data
  tacticalInfo = {
    status: 'OPERATIONAL',
    coordinates: { lat: 38.8951, lng: -77.0364 },
    threatLevel: 'LOW',
    systemStatus: 'ONLINE',
    securityLevel: 'ALPHA',
    activePersonnel: 42
  };

  constructor() {
    // Update date every second when in expanded view
    interval(1000).subscribe(() => {
      if (this.isExpanded) {
        this.date = new Date();
      }
    });
  }

  ngOnInit(): void {
    // Initialize tactical entities
    this.generateRandomEntities();
    
    // Simulate incoming tactical data
    interval(5000).subscribe(() => {
      this.updateTacticalData();
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.tacticalCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set canvas dimensions
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    
    // Start animation
    this.animate();
    
    // Simulate boot sequence
    this.runBootSequence();
  }

  resizeCanvas(): void {
    const canvas = this.tacticalCanvas.nativeElement;
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;
  }

  animate(): void {
    this.ctx.clearRect(0, 0, this.tacticalCanvas.nativeElement.width, this.tacticalCanvas.nativeElement.height);
    
    // Draw grid
    this.drawGrid();
    
    // Draw entities
    this.drawEntities();
    
    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  drawGrid(): void {
    const { width, height } = this.tacticalCanvas.nativeElement;
    
    // Use teal color for grid but more translucent
    this.ctx.strokeStyle = 'rgba(0, 216, 216, 0.2)'; // More translucent grid
    this.ctx.lineWidth = 0.5; // Thinner lines
    
    // Draw fewer vertical lines for a cleaner look
    for (let x = 0; x <= width; x += this.gridSize * 2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }
    
    // Draw fewer horizontal lines for a cleaner look
    for (let y = 0; y <= height; y += this.gridSize * 2) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }
    
    // Draw main axes
    this.ctx.strokeStyle = 'rgba(0, 216, 216, 0.4)'; // More translucent axes
    this.ctx.lineWidth = 0.8; // Thinner lines
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // X-axis
    this.ctx.beginPath();
    this.ctx.moveTo(0, centerY);
    this.ctx.lineTo(width, centerY);
    this.ctx.stroke();
    
    // Y-axis
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, 0);
    this.ctx.lineTo(centerX, height);
    this.ctx.stroke();
  }
  
  generateRandomEntities(): void {
    this.entities = [];
    
    // Generate friendly units (blue)
    for (let i = 0; i < 8; i++) {
      this.entities.push({
        x: Math.random() * 0.8 - 0.4, // -0.4 to 0.4
        y: Math.random() * 0.8 - 0.4, // -0.4 to 0.4
        size: 8,
        type: 'friendly',
        color: '#0055BB',
        speed: Math.random() * 0.002,
        angle: Math.random() * Math.PI * 2,
        id: `F-${i+1}`,
        status: 'Active'
      });
    }
    
    // Generate enemy units (red)
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 0.6 + Math.random() * 0.3; // Place enemies at the edges
      this.entities.push({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 8,
        type: 'enemy',
        color: '#BB0000',
        speed: Math.random() * 0.001,
        angle: Math.random() * Math.PI * 2,
        id: `E-${i+1}`,
        status: 'Tracking'
      });
    }
    
    // Generate neutral units (yellow)
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 0.4 + Math.random() * 0.5;
      this.entities.push({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 7,
        type: 'neutral',
        color: '#BBBB00',
        speed: Math.random() * 0.0005,
        angle: Math.random() * Math.PI * 2,
        id: `N-${i+1}`,
        status: 'Monitoring'
      });
    }
  }
  
  drawEntities(): void {
    const { width, height } = this.tacticalCanvas.nativeElement;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Update entity positions
    for (const entity of this.entities) {
      // Update position based on angle and speed
      entity.x += Math.cos(entity.angle) * entity.speed;
      entity.y += Math.sin(entity.angle) * entity.speed;
      
      // Slightly change angle for natural movement
      entity.angle += (Math.random() - 0.5) * 0.05;
      
      // Wrap around edges
      if (entity.x < -1) entity.x = 1;
      if (entity.x > 1) entity.x = -1;
      if (entity.y < -1) entity.y = 1;
      if (entity.y > 1) entity.y = -1;
      
      // Calculate screen position
      const screenX = centerX + entity.x * (width / 2 * 0.9);
      const screenY = centerY + entity.y * (height / 2 * 0.9);
      
      // Draw entity
      this.ctx.fillStyle = entity.color;
      this.ctx.beginPath();
      
      if (entity.type === 'friendly') {
        // Draw friendly unit as square
        this.ctx.rect(screenX - entity.size/2, screenY - entity.size/2, entity.size, entity.size);
      } else if (entity.type === 'enemy') {
        // Draw enemy unit as triangle
        this.ctx.moveTo(screenX, screenY - entity.size/2);
        this.ctx.lineTo(screenX + entity.size/2, screenY + entity.size/2);
        this.ctx.lineTo(screenX - entity.size/2, screenY + entity.size/2);
        this.ctx.closePath();
      } else {
        // Draw neutral unit as circle
        this.ctx.arc(screenX, screenY, entity.size/2, 0, Math.PI * 2);
      }
      
      this.ctx.fill();
      
      // Draw entity ID
      this.ctx.font = '10px monospace';
      this.ctx.fillText(entity.id, screenX + entity.size/2 + 2, screenY + 3);
      
      // Draw selection circle for mouseover (future feature)
    }
  }
  
  updateTacticalData(): void {
    // Simulate changing tactical data
    this.tacticalInfo.threatLevel = ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)];
    this.tacticalInfo.activePersonnel = 40 + Math.floor(Math.random() * 12);
    this.tacticalInfo.coordinates.lat = 38.8951 + (Math.random() - 0.5) * 0.01;
    this.tacticalInfo.coordinates.lng = -77.0364 + (Math.random() - 0.5) * 0.01;
    
    // Occasionally change an entity's status
    if (Math.random() > 0.7) {
      const randomEntity = this.entities[Math.floor(Math.random() * this.entities.length)];
      randomEntity.status = ['Active', 'Tracking', 'Monitoring', 'Alert'][Math.floor(Math.random() * 4)];
    }
  }
  
  runBootSequence(): void {
    const bootElements = document.querySelectorAll('.boot-element');
    
    interval(200).pipe(
      take(bootElements.length)
    ).subscribe((index) => {
      bootElements[index].classList.add('active');
    });
  }
  
  toggleExpandedView(): void {
    this.isExpanded = !this.isExpanded;
    this.expandedSubject.next(this.isExpanded);
    
    if (this.isExpanded) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when expanded
    } else {
      document.body.style.overflow = ''; // Restore scrolling
    }
    
    // If expanded, resize canvas after the animation completes
    if (this.isExpanded) {
      setTimeout(() => {
        this.resizeCanvas();
      }, 400);
    }
  }
  
  closeExpandedView(event: MouseEvent): void {
    // Only close if clicking the backdrop
    if ((event.target as HTMLElement).classList.contains('tactical-expanded-backdrop')) {
      this.toggleExpandedView();
    }
  }
  
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeCanvas);
    
    // Restore scrolling if component is destroyed while expanded
    document.body.style.overflow = '';
  }
}
