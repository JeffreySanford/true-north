import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { BehaviorSubject, interval } from 'rxjs';

@Component({
  selector: 'app-radar-display',
  templateUrl: './radar-display.component.html',
  styleUrls: ['./radar-display.component.scss'],
  standalone: false
})
export class RadarDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }
  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;
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

  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
    // Generate random radar contacts
    this.generateRandomContacts();
    
    // Update radar stats periodically
    setInterval(() => {
      this.updateRadarStatus();
    }, 5000);
  }

  ngAfterViewInit(): void {
    const canvas = this.radarCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set canvas dimensions
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    
    // Start animation
    this.animate();
  }
  
  resizeCanvas(): void {
    const canvas = this.radarCanvas.nativeElement;
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;
  }
  
  animate(): void {
    this.ctx.clearRect(0, 0, this.radarCanvas.nativeElement.width, this.radarCanvas.nativeElement.height);
    
    // Draw radar background
    this.drawRadarBackground();
    
    // Draw radar sweep
    this.drawRadarSweep();
    
    // Draw blips
    this.drawBlips();
    
    // Update sweep angle
    this.angle += 0.02;
    if (this.angle > Math.PI * 2) {
      this.angle = 0;
    }
    
    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  drawRadarBackground(): void {
    const { width, height } = this.radarCanvas.nativeElement;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.9;
    
    // Draw radar circles with translucent color
    this.ctx.strokeStyle = 'rgba(0, 128, 0, 0.4)'; // More translucent grid
    this.ctx.lineWidth = 0.5; // Thinner lines
    
    for (let i = 1; i <= 5; i++) {
      const radius = maxRadius * (i / 5);
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    
    // Draw crosshairs
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY - maxRadius);
    this.ctx.lineTo(centerX, centerY + maxRadius);
    this.ctx.moveTo(centerX - maxRadius, centerY);
    this.ctx.lineTo(centerX + maxRadius, centerY);
    this.ctx.stroke();
    
    // Draw range markers
    this.ctx.font = '6px monospace'; // Smaller font
    this.ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
    this.ctx.textAlign = 'left';
    
    for (let i = 1; i <= 5; i++) {
      if (i % 2 === 0) { // Only show every other range marker
        const range = (this.radarStatus.range * i) / 5;
        this.ctx.fillText(`${range}`, centerX + 3, centerY - maxRadius * (i / 5));
      }
    }
  }
  
  drawRadarSweep(): void {
    const { width, height } = this.radarCanvas.nativeElement;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;
    
    // Create radial gradient for sweep
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
    
    // Draw sweep
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.arc(centerX, centerY, radius, this.angle - 0.1, this.angle);
    this.ctx.closePath();
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Draw sweep line
    this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.lineTo(
      centerX + Math.cos(this.angle) * radius,
      centerY + Math.sin(this.angle) * radius
    );
    this.ctx.stroke();
  }
  
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
        size: Math.random() * 4 + 3,
        fadeTime: 50 + Math.random() * 50,
        lastSeen: 0
      });
    }
  }
  
  drawBlips(): void {
    const { width, height } = this.radarCanvas.nativeElement;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.9;
    
    for (const blip of this.blips) {
      // Calculate screen position
      const screenX = centerX + blip.x * maxRadius;
      const screenY = centerY + blip.y * maxRadius;
      
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
        
        this.ctx.beginPath();
        this.ctx.arc(screenX, screenY, blip.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add ripple effect for recently detected blips
        if (blip.lastSeen < 10) {
          const rippleSize = blip.size + blip.lastSeen;
          const rippleOpacity = (10 - blip.lastSeen) / 10 * 0.5;
          
          this.ctx.strokeStyle = `rgba(0, 255, 0, ${rippleOpacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.arc(screenX, screenY, rippleSize, 0, Math.PI * 2);
          this.ctx.stroke();
        }
      }
    }
  }
  
  updateRadarStatus(): void {
    // Randomly update radar stats
    const scanRates = ['SLOW', 'NORMAL', 'FAST'];
    const signalStrengths = ['WEAK', 'NORMAL', 'OPTIMAL'];
    const modes = ['ACTIVE', 'PASSIVE', 'STEALTH'];
    
    this.radarStatus.scanRate = scanRates[Math.floor(Math.random() * 3)];
    this.radarStatus.signalStrength = signalStrengths[Math.floor(Math.random() * 3)];
    this.radarStatus.mode = modes[Math.floor(Math.random() * 3)];
    
    // Occasionally regenerate contacts
    if (Math.random() > 0.7) {
      this.generateRandomContacts();
    }
  }

  openDetailedView(): void {
    this.overlayService.openRadar();
  }
}