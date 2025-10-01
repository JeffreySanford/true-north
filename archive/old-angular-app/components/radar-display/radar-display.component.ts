import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { BehaviorSubject, interval } from 'rxjs';

@Component({
  selector: 'app-radar-display',
  templateUrl: './radar-display.component.html',
  styleUrls: ['./radar-display.component.scss'],
  standalone: false
})
export class RadarDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() size: number = 300;
  @Input() brightness: number = 1.5; // Increased brightness
  @Input() zIndex: number = 6; // Higher z-index than tactical display
  @Input() parallaxRatio: number = -0.15; // Moving in opposite direction for depth

  @ViewChild('radarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  private angle: number = 0;
  private blips: any[] = [];
  
  // State for expanded view
  isExpanded = false;
  private expandedSubject = new BehaviorSubject<boolean>(this.isExpanded);
  
  radarStatus = {
    range: 100,
    scanRate: 'NORMAL',
    contacts: 0,
    signalStrength: 'OPTIMAL',
    mode: 'ACTIVE'
  };

  constructor(private renderer: Renderer2, private overlayService: OverlayService) {}

  ngOnInit(): void {
    // Generate random radar contacts
    this.generateRandomContacts();
    
    // Update radar stats periodically
    setInterval(() => {
      this.updateRadarStatus();
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.setupRadarCanvas();
    this.setupResizeListener();
  }
  
  /**
   * Set up the radar canvas with Renderer2
   */
  private setupRadarCanvas(): void {
    if (!this.canvasRef) {
      console.warn('Radar canvas not found');
      return;
    }
    
    const canvasElement = this.canvasRef.nativeElement;
    const context = canvasElement.getContext('2d');
    
    if (!context) {
      console.error('Could not get radar canvas context');
      return;
    }
    
    this.ctx = context;
    
    // Set initial canvas dimensions
    this.resizeCanvas();
    
    // Set canvas element styles for z-index using Renderer2
    this.renderer.setStyle(canvasElement, 'position', 'relative'); 
    this.renderer.setStyle(canvasElement, 'z-index', this.zIndex.toString());

    // Start animation
    this.animate();
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
   * Resize the radar canvas using Renderer2
   */
  resizeCanvas(): void {
    if (!this.canvasRef) return;
    
    const canvasElement = this.canvasRef.nativeElement;
    const parentElement = this.renderer.parentNode(canvasElement);
    
    if (!parentElement) return;
    
    const width = parentElement.clientWidth;
    const height = parentElement.clientHeight;
    
    // Set canvas dimensions using Renderer2
    this.renderer.setAttribute(canvasElement, 'width', width.toString());
    this.renderer.setAttribute(canvasElement, 'height', height.toString());
  }
  
  /**
   * Main animation loop
   */
  animate(): void {
    if (!this.ctx || !this.canvasRef) {
      this.animationFrameId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.angle += 0.01;
    if (this.angle > Math.PI * 2) {
      this.angle = 0;
    }
    
    this.updateBlips();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Draw the radar
   */
  draw(): void {
    if (!this.ctx || !this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Set a higher global composite operation for increased brightness
    this.ctx.globalCompositeOperation = 'lighter';
    
    // Draw radar background
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    
    // Draw radar circles
    for (let i = 1; i <= 4; i++) {
      const circleRadius = radius * (i / 4);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 255, 0, ${0.15 * this.brightness * (i / 4)})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
    
    // Draw radar sweep
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.arc(0, 0, radius, -Math.PI / 2, this.angle - Math.PI / 2, false);
    this.ctx.lineTo(0, 0);
    this.ctx.closePath();
    
    // Create gradient for sweep
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, `rgba(0, 255, 0, ${0.1 * this.brightness})`);
    gradient.addColorStop(0.5, `rgba(0, 255, 0, ${0.05 * this.brightness})`);
    gradient.addColorStop(1, `rgba(0, 255, 0, ${0.01 * this.brightness})`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Draw directional lines
    for (let i = 0; i < 8; i++) {
      const lineAngle = (i * Math.PI / 4);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(Math.cos(lineAngle) * radius, Math.sin(lineAngle) * radius);
      this.ctx.strokeStyle = `rgba(0, 255, 0, ${0.3 * this.brightness})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
    
    // Draw blips
    this.drawBlips();
    
    // Draw center point with glow
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 3, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(0, 255, 0, ${this.brightness})`;
    this.ctx.shadowColor = 'rgba(0, 255, 0, 1)';
    this.ctx.shadowBlur = 10;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
    
    this.ctx.restore();
  }
  
  /**
   * Generate random radar contacts
   */
  generateRandomContacts(): void {
    this.blips = [];
    
    // Generate number of contacts between 5-15
    const numContacts = Math.floor(Math.random() * 11) + 5;
    this.radarStatus.contacts = numContacts;
    
    for (let i = 0; i < numContacts; i++) {
      // Random position in polar coordinates
      const distance = Math.random() * 0.9 + 0.1; // 10% - 100% of radius
      const angle = Math.random() * Math.PI * 2;
      
      // Convert to cartesian for easier rendering
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      // Determine blip type
      const types = ['friendly', 'unknown', 'hostile'];
      const typeIndex = Math.floor(Math.random() * 3);
      
      this.blips.push({
        x,
        y,
        distance,
        angle,
        type: types[typeIndex],
        size: Math.random() * 4 + 2, // Smaller size
        fadeTime: 50 + Math.random() * 50,
        lastSeen: 0,
        blinking: Math.random() > 0.7 // Some blips will blink
      });
    }
  }
  
  /**
   * Update blip positions and states
   */
  updateBlips(): void {
    const now = Date.now();
    
    // Occasionally add/remove blips
    if (Math.random() < 0.01) {
      if (this.blips.length > 15 || Math.random() < 0.3) {
        // Remove a random blip
        if (this.blips.length > 0) {
          const indexToRemove = Math.floor(Math.random() * this.blips.length);
          this.blips.splice(indexToRemove, 1);
          this.radarStatus.contacts = this.blips.length;
        }
      } else {
        // Add a new blip
        this.addRandomBlip();
        this.radarStatus.contacts = this.blips.length;
      }
    }
    
    // Update existing blips
    for (let i = 0; i < this.blips.length; i++) {
      const blip = this.blips[i];
      
      // Calculate angle difference to determine visibility
      let angleDiff = Math.abs(this.angle - blip.angle);
      if (angleDiff > Math.PI) {
        angleDiff = Math.PI * 2 - angleDiff;
      }
      
      // If the sweep has passed this blip recently, it should be visible
      if (angleDiff < 0.1 || this.angle < blip.angle) {
        blip.lastSeen = 0;
      } else {
        blip.lastSeen++;
      }
      
      // Slightly move some blips
      if (Math.random() < 0.05) {
        const moveDistance = 0.002;
        const moveAngle = Math.random() * Math.PI * 2;
        blip.x += Math.cos(moveAngle) * moveDistance;
        blip.y += Math.sin(moveAngle) * moveDistance;
        
        // Recalculate polar coordinates
        blip.distance = Math.sqrt(blip.x * blip.x + blip.y * blip.y);
        blip.angle = Math.atan2(blip.y, blip.x);
        
        // Keep blips within bounds
        if (blip.distance > 0.95) {
          blip.x *= 0.95 / blip.distance;
          blip.y *= 0.95 / blip.distance;
          blip.distance = 0.95;
          blip.angle = Math.atan2(blip.y, blip.x);
        }
      }
      
      // Toggle blinking state
      if (blip.blinking && Math.random() < 0.05) {
        blip.visible = !blip.visible;
      } else {
        blip.visible = true;
      }
    }
  }

  /**
   * Add a random blip to the radar
   */
  addRandomBlip(): void {
    const distance = Math.random() * 0.9 + 0.1; // 10% - 100% of radius
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const types = ['friendly', 'unknown', 'hostile'];
    const typeIndex = Math.floor(Math.random() * 3);

    this.blips.push({
      x,
      y,
      distance,
      angle,
      type: types[typeIndex],
      size: Math.random() * 3 + 2, // Smaller size
      fadeTime: 50 + Math.random() * 50,
      lastSeen: 0,
      visible: true,
      blinking: Math.random() > 0.7
    });
  }
  
  /**
   * Draw radar blips
   */
  drawBlips(): void {
    if (!this.ctx || !this.canvasRef) return;
    
    const { width, height } = this.canvasRef.nativeElement;
    const maxRadius = Math.min(width, height) / 2 * 0.9;
    
    for (const blip of this.blips) {
      // Only process visible blips
      if (!blip.visible) continue;
      
      // Only show blips that have been "seen" recently
      if (blip.lastSeen < blip.fadeTime) {
        const opacity = 1 - (blip.lastSeen / blip.fadeTime);
        
        // Draw blip with appropriate color based on type
        switch (blip.type) {
          case 'friendly':
            this.ctx.fillStyle = `rgba(0, 100, 255, ${opacity})`;
            break;
          case 'hostile':
            this.ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
            break;
          default: // unknown
            this.ctx.fillStyle = `rgba(255, 255, 0, ${opacity})`;
        }
        
        // Calculate screen position
        const screenX = blip.x * maxRadius;
        const screenY = blip.y * maxRadius;
        
        this.ctx.beginPath();
        this.ctx.arc(screenX, screenY, blip.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add ripple effect for recently detected blips
        if (blip.lastSeen < 10) {
          const rippleSize = blip.size + blip.lastSeen / 2;
          const rippleOpacity = (10 - blip.lastSeen) / 10 * 0.5;
          
          this.ctx.strokeStyle = `rgba(0, 255, 0, ${rippleOpacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.arc(screenX, screenY, rippleSize, 0, Math.PI * 2);
          this.ctx.stroke();
        }
      }
    }
  }
  
  /**
   * Update radar status information
   */
  updateRadarStatus(): void {
    // Randomly update radar stats
    const scanRates = ['SLOW', 'NORMAL', 'FAST'];
    const signalStrengths = ['WEAK', 'NORMAL', 'OPTIMAL'];
    const modes = ['ACTIVE', 'PASSIVE', 'STEALTH'];
    
    this.radarStatus.scanRate = scanRates[Math.floor(Math.random() * 3)];
    this.radarStatus.signalStrength = signalStrengths[Math.floor(Math.random() * 3)];
    this.radarStatus.mode = modes[Math.floor(Math.random() * 3)];
    
    // Adjust range occasionally
    if (Math.random() > 0.7) {
      const ranges = [50, 100, 150, 200];
      this.radarStatus.range = ranges[Math.floor(Math.random() * ranges.length)];
    }
  }

  /**
   * Open detailed view (will be implemented in future)
   */
  openDetailedView(): void {
    this.isExpanded = !this.isExpanded;
    this.expandedSubject.next(this.isExpanded);
    
    // Use Renderer2 to update body styles
    if (this.isExpanded) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden'); // Prevent scrolling when expanded
    } else {
      this.renderer.removeStyle(document.body, 'overflow'); // Restore scrolling
    }
  }
  
  /**
   * Close expanded view on backdrop click
   */
  closeExpandedView(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    
    // Check if the element has the backdrop class using Renderer2
    if (clickedElement && clickedElement.classList.contains('radar-expanded-backdrop')) {
      this.openDetailedView(); // Toggle view
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Restore body overflow style using Renderer2 if needed
    if (this.isExpanded) {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
}