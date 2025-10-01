import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, Input, Renderer2 } from '@angular/core';
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
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  // Add separate contexts for each canvas
  private tacticalCtx!: CanvasRenderingContext2D;
  private compassCtx!: CanvasRenderingContext2D;
  
  private animationFrameId: number = 0;
  private gridSize: number = 16; // Reduced from 20
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

  @Input() size: number = 300;
  @Input() brightness: number = 1.5; // Increased brightness
  @Input() zIndex: number = 5; // Higher z-index
  @Input() parallaxRatio: number = 0.2;
  
  private animationFrame: number = 0;
  private rotation: number = 0;

  constructor(private renderer: Renderer2) {
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
    // Get canvas contexts using Renderer2
    this.setupTacticalCanvas();
    this.setupMainCanvas(); // This method had the error
    
    // Simulate boot sequence
    this.runBootSequence();
    
    // Start animation
    this.animate();
    
    // Set up resize listener with Renderer2
    this.setupResizeListener();
  }
  
  /**
   * Set up the tactical canvas with Renderer2
   */
  private setupTacticalCanvas(): void {
    if (!this.tacticalCanvas) {
      console.warn('Tactical canvas not found');
      return;
    }
    
    const canvasElement = this.tacticalCanvas.nativeElement;
    const context = canvasElement.getContext('2d');
    
    if (!context) {
      console.error('Could not get tactical canvas context');
      return;
    }
    
    this.tacticalCtx = context;
    
    // Set initial canvas dimensions
    this.resizeCanvas();
  }
  
  /**
   * Set up the compass canvas with Renderer2 - Add null checks
   */
  private setupMainCanvas(): void {
    if (!this.canvasRef) {
      console.warn('Compass canvas not found');
      return; // Return early if canvas reference is missing
    }
    
    const canvasElement = this.canvasRef.nativeElement;
    const context = canvasElement.getContext('2d');
    
    if (!context) {
      console.error('Could not get compass canvas context');
      return;
    }
    
    this.compassCtx = context;
    
    // Set canvas dimensions
    this.renderer.setAttribute(canvasElement, 'width', this.size.toString());
    this.renderer.setAttribute(canvasElement, 'height', this.size.toString());
    
    // Set canvas styles
    this.renderer.setStyle(canvasElement, 'position', 'absolute');
    this.renderer.setStyle(canvasElement, 'z-index', this.zIndex.toString());
  }
  
  /**
   * Set up window resize event listener with Renderer2
   */
  private setupResizeListener(): void {
    // Use Renderer2 to listen for window resize events
    const window = this.renderer.listen('window', 'resize', () => {
      this.resizeCanvas();
    });
  }

  /**
   * Resize the tactical canvas using Renderer2
   */
  resizeCanvas(): void {
    if (!this.tacticalCanvas) return;
    
    const canvasElement = this.tacticalCanvas.nativeElement;
    const parentElement = this.renderer.parentNode(canvasElement);
    
    if (!parentElement) return;
    
    const width = parentElement.clientWidth;
    const height = parentElement.clientHeight;
    
    // Set canvas dimensions using Renderer2
    this.renderer.setAttribute(canvasElement, 'width', width.toString());
    this.renderer.setAttribute(canvasElement, 'height', height.toString());
  }

  animate(): void {
    // Clear tactical canvas
    if (this.tacticalCtx && this.tacticalCanvas) {
      const canvasElement = this.tacticalCanvas.nativeElement;
      this.tacticalCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
      // Draw grid and entities on tactical canvas
      this.drawGrid();
      this.drawEntities();
    }
    
    // Update rotation
    this.rotation += 0.005;
    
    // Draw compass on the compass canvas if available
    this.drawCompass();
    
    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  drawGrid(): void {
    if (!this.tacticalCtx || !this.tacticalCanvas) return;
    
    const canvasElement = this.tacticalCanvas.nativeElement;
    const width = canvasElement.width;
    const height = canvasElement.height;
    
    // Dynamically adjust grid size based on container dimensions
    const containerSize = Math.min(width, height);
    const adaptiveGridSize = Math.max(10, Math.floor(containerSize / 20));
    this.gridSize = adaptiveGridSize;
    
    // Use teal color for grid but more translucent
    this.tacticalCtx.strokeStyle = 'rgba(0, 216, 216, 0.15)'; // Even more translucent grid
    this.tacticalCtx.lineWidth = 0.5; // Thin lines
    
    // Draw fewer vertical lines for a cleaner look
    for (let x = 0; x <= width; x += this.gridSize * 2) {
      this.tacticalCtx.beginPath();
      this.tacticalCtx.moveTo(x, 0);
      this.tacticalCtx.lineTo(x, height);
      this.tacticalCtx.stroke();
    }
    
    // Draw fewer horizontal lines for a cleaner look
    for (let y = 0; y <= height; y += this.gridSize * 2) {
      this.tacticalCtx.beginPath();
      this.tacticalCtx.moveTo(0, y);
      this.tacticalCtx.lineTo(width, y);
      this.tacticalCtx.stroke();
    }
    
    // Draw main axes
    this.tacticalCtx.strokeStyle = 'rgba(0, 216, 216, 0.3)'; // Slightly more translucent axes
    this.tacticalCtx.lineWidth = 0.7; // Thinner lines
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // X-axis
    this.tacticalCtx.beginPath();
    this.tacticalCtx.moveTo(0, centerY);
    this.tacticalCtx.lineTo(width, centerY);
    this.tacticalCtx.stroke();
    
    // Y-axis
    this.tacticalCtx.beginPath();
    this.tacticalCtx.moveTo(centerX, 0);
    this.tacticalCtx.lineTo(centerX, height);
    this.tacticalCtx.stroke();
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
    if (!this.tacticalCtx || !this.tacticalCanvas) return;
    
    const canvasElement = this.tacticalCanvas.nativeElement;
    const width = canvasElement.width;
    const height = canvasElement.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Get container dimensions to scale entities appropriately
    const containerSize = Math.min(width, height);
    const entityBaseSize = containerSize / 50; // Dynamic scaling based on container size
    
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
      
      // Calculate entity size based on container dimensions
      const entitySize = entityBaseSize * (entity.size / 8);
      
      // Draw entity
      this.tacticalCtx.fillStyle = entity.color;
      this.tacticalCtx.beginPath();
      
      if (entity.type === 'friendly') {
        // Draw friendly unit as square
        this.tacticalCtx.rect(screenX - entitySize/2, screenY - entitySize/2, entitySize, entitySize);
      } else if (entity.type === 'enemy') {
        // Draw enemy unit as triangle
        this.tacticalCtx.moveTo(screenX, screenY - entitySize/2);
        this.tacticalCtx.lineTo(screenX + entitySize/2, screenY + entitySize/2);
        this.tacticalCtx.lineTo(screenX - entitySize/2, screenY + entitySize/2);
        this.tacticalCtx.closePath();
      } else {
        // Draw neutral unit as circle
        this.tacticalCtx.arc(screenX, screenY, entitySize/2, 0, Math.PI * 2);
      }
      
      this.tacticalCtx.fill();
      
      // Draw entity ID with smaller font size appropriate to container size
      const fontSize = Math.max(8, Math.floor(containerSize / 50));
      this.tacticalCtx.font = `${fontSize}px monospace`;
      this.tacticalCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.tacticalCtx.fillText(entity.id, screenX + entitySize/2 + 2, screenY + 3);
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
  
  /**
   * Run the boot sequence using Renderer2 to manipulate DOM
   */
  runBootSequence(): void {
    // Query boot elements using document.querySelectorAll (consider using @ViewChildren in a real app)
    const bootElements = document.querySelectorAll('.boot-element');
    
    interval(200).pipe(
      take(bootElements.length)
    ).subscribe((index) => {
      // Add 'active' class using Renderer2
      this.renderer.addClass(bootElements[index], 'active');
    });
  }
  
  /**
   * Toggle expanded view using Renderer2 to manipulate styles
   */
  toggleExpandedView(): void {
    this.isExpanded = !this.isExpanded;
    this.expandedSubject.next(this.isExpanded);
    
    // Use Renderer2 to update body styles
    if (this.isExpanded) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden'); // Prevent scrolling when expanded
    } else {
      this.renderer.removeStyle(document.body, 'overflow'); // Restore scrolling
    }
    
    // If expanded, resize canvas after the animation completes
    if (this.isExpanded) {
      setTimeout(() => {
        this.resizeCanvas();
      }, 400);
    }
  }
  
  /**
   * Close expanded view on backdrop click using Renderer2 to check classes
   */
  closeExpandedView(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    
    // Check if the element has the backdrop class
    if (clickedElement && clickedElement.classList.contains('tactical-expanded-backdrop')) {
      this.toggleExpandedView();
    }
  }
  
  /**
   * Draw the compass rose on the compass canvas
   */
  drawCompass(): void {
    // Only draw if the compass context is available
    if (!this.compassCtx || !this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    this.compassCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Set a higher global composite operation for increased brightness
    this.compassCtx.globalCompositeOperation = 'lighter';
    
    // Draw compass rose with increased brilliance
    this.compassCtx.save();
    this.compassCtx.translate(centerX, centerY);
    this.compassCtx.rotate(this.rotation);
    
    // Draw main circle
    this.compassCtx.beginPath();
    this.compassCtx.arc(0, 0, radius, 0, Math.PI * 2);
    this.compassCtx.strokeStyle = `rgba(255, 255, 255, ${0.7 * this.brightness})`;
    this.compassCtx.lineWidth = 2;
    this.compassCtx.stroke();
    
    // Draw cardinal directions with glow effect
    const directions = ['N', 'E', 'S', 'W'];
    directions.forEach((dir, i) => {
      const angle = (i * Math.PI / 2);
      const x = Math.cos(angle) * (radius - 25);
      const y = Math.sin(angle) * (radius - 25);
      
      // Draw directional line
      this.compassCtx.beginPath();
      this.compassCtx.moveTo(0, 0);
      this.compassCtx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      this.compassCtx.strokeStyle = `rgba(0, 191, 255, ${0.8 * this.brightness})`;
      this.compassCtx.lineWidth = 2;
      this.compassCtx.stroke();
      
      // Add text with glow
      this.compassCtx.font = 'bold 16px Arial';
      this.compassCtx.textAlign = 'center';
      this.compassCtx.textBaseline = 'middle';
      
      // Text glow
      this.compassCtx.shadowColor = `rgba(0, 191, 255, ${this.brightness})`;
      this.compassCtx.shadowBlur = 10;
      this.compassCtx.fillStyle = 'white';
      this.compassCtx.fillText(dir, x, y);
      this.compassCtx.shadowBlur = 0;
    });
    
    // Add cross pattern with glow
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4);
      this.compassCtx.beginPath();
      this.compassCtx.moveTo(0, 0);
      this.compassCtx.lineTo(Math.cos(angle) * (radius - 40), Math.sin(angle) * (radius - 40));
      this.compassCtx.strokeStyle = `rgba(191, 10, 48, ${0.6 * this.brightness})`;
      this.compassCtx.lineWidth = 1;
      this.compassCtx.stroke();
    }
    
    // Draw center point with glow
    this.compassCtx.beginPath();
    this.compassCtx.arc(0, 0, 5, 0, Math.PI * 2);
    this.compassCtx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
    this.compassCtx.shadowColor = 'white';
    this.compassCtx.shadowBlur = 15;
    this.compassCtx.fill();
    this.compassCtx.shadowBlur = 0;
    
    this.compassCtx.restore();
  }
  
  ngOnDestroy(): void {
    // Cancel animation frames
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Restore body overflow style using Renderer2
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
