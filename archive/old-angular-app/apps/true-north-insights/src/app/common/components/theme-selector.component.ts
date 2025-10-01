import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PatrioticThemeService, ThemeMode, PatrioticColor } from '../../services/patriotic-theme.service';

@Component({
  selector: 'app-theme-selector',
  template: `
    <div class="theme-selector-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Theme Settings</mat-card-title>
          <mat-card-subtitle>Customize your patriotic experience</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="theme-section">
            <h3>Color Theme</h3>
            <div class="color-selector">
              <button mat-icon-button 
                      class="color-button red-button" 
                      [class.active]="activeColor === 'red'"
                      (click)="setColor('red')">
                <mat-icon>format_color_fill</mat-icon>
              </button>
              <button mat-icon-button 
                      class="color-button white-button" 
                      [class.active]="activeColor === 'white'"
                      (click)="setColor('white')">
                <mat-icon>format_color_fill</mat-icon>
              </button>
              <button mat-icon-button 
                      class="color-button blue-button" 
                      [class.active]="activeColor === 'blue'"
                      (click)="setColor('blue')">
                <mat-icon>format_color_fill</mat-icon>
              </button>
            </div>
          </div>
          
          <div class="theme-section">
            <h3>Display Mode</h3>
            <div class="mode-selector">
              <button mat-button 
                      [class.active]="activeMode === 'light'"
                      (click)="setMode('light')">
                <mat-icon>light_mode</mat-icon> Light
              </button>
              <button mat-button 
                      [class.active]="activeMode === 'dark'"
                      (click)="setMode('dark')">
                <mat-icon>dark_mode</mat-icon> Dark
              </button>
              <button mat-button 
                      [class.active]="activeMode === 'tactical'"
                      (click)="setMode('tactical')">
                <mat-icon>radar</mat-icon> Tactical
              </button>
            </div>
          </div>
          
          <div class="theme-section">
            <h3>Military Branch</h3>
            <div class="branch-selector">
              <button mat-button 
                      [class.active]="selectedBranch === 'none'"
                      (click)="setBranch('none')">
                <mat-icon>flag</mat-icon> Standard
              </button>
              <button mat-button 
                      [class.active]="selectedBranch === 'army'"
                      (click)="setBranch('army')">
                <mat-icon>military_tech</mat-icon> Army
              </button>
              <button mat-button 
                      [class.active]="selectedBranch === 'navy'"
                      (click)="setBranch('navy')">
                <mat-icon>sailing</mat-icon> Navy
              </button>
              <button mat-button 
                      [class.active]="selectedBranch === 'airforce'"
                      (click)="setBranch('airforce')">
                <mat-icon>flight_takeoff</mat-icon> Air Force
              </button>
              <button mat-button 
                      [class.active]="selectedBranch === 'marines'"
                      (click)="setBranch('marines')">
                <mat-icon>whatshot</mat-icon> Marines
              </button>
              <button mat-button 
                      [class.active]="selectedBranch === 'coastguard'"
                      (click)="setBranch('coastguard')">
                <mat-icon>anchor</mat-icon> Coast Guard
              </button>
            </div>
          </div>
          
          <div class="theme-section">
            <h3>Effects</h3>
            <div class="effects-controls">
              <mat-slide-toggle [checked]="animationsEnabled" 
                               (change)="toggleAnimations()">
                Enable Animations
              </mat-slide-toggle>
              
              <mat-slide-toggle [checked]="tacticalEffectsEnabled" 
                               (change)="toggleTacticalEffects()">
                Tactical UI Elements
              </mat-slide-toggle>
            </div>
            
            <div class="intensity-controls">
              <button mat-icon-button 
                      [disabled]="themeIntensity === 'subtle'"
                      (click)="decreaseIntensity()">
                <mat-icon>remove</mat-icon>
              </button>
              <span>Theme Intensity</span>
              <button mat-icon-button 
                      [disabled]="themeIntensity === 'bold'"
                      (click)="increaseIntensity()">
                <mat-icon>add</mat-icon>
              </button>
            </div>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-button (click)="resetToDefault()">Reset to Default</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .theme-selector-container {
      padding: 20px;
    }
    
    .theme-section {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      
      h3 {
        margin-bottom: 10px;
      }
    }
    
    .color-selector, .mode-selector, .branch-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .color-button {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      
      &.active {
        border: 2px solid black;
      }
    }
    
    .red-button {
      background-color: #BF0A30;
      color: white;
    }
    
    .white-button {
      background-color: #FFFFFF;
      color: #002868;
      border: 1px solid #ccc;
    }
    
    .blue-button {
      background-color: #002868;
      color: white;
    }
    
    .active {
      font-weight: bold;
      background-color: rgba(0,0,0,0.1);
    }
    
    .effects-controls, .intensity-controls {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      gap: 10px;
    }
    
    .intensity-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
    }
  `],
    standalone: false
})
export class ThemeSelectorComponent implements OnInit {
  activeMode: ThemeMode = 'light';
  activeColor: PatrioticColor = 'blue';
  selectedBranch: 'army' | 'navy' | 'airforce' | 'marines' | 'coastguard' | 'none' = 'none';
  animationsEnabled = true;
  tacticalEffectsEnabled = true;
  themeIntensity: 'subtle' | 'medium' | 'bold' = 'medium';
  
  constructor(private themeService: PatrioticThemeService) {}
  
  ngOnInit(): void {
    this.themeService.getThemeMode().subscribe(mode => {
      this.activeMode = mode;
    });
    
    this.themeService.getActiveColor().subscribe(color => {
      this.activeColor = color;
    });
    
    this.themeService.getThemeConfig().subscribe(config => {
      this.selectedBranch = config.selectedBranch || 'none';
      this.animationsEnabled = config.animationsEnabled;
      this.tacticalEffectsEnabled = config.enableTacticalEffects;
      this.themeIntensity = config.intensity;
    });
  }
  
  setMode(mode: ThemeMode): void {
    this.themeService.setThemeMode(mode);
  }
  
  setColor(color: PatrioticColor): void {
    this.themeService.setActiveColor(color);
  }
  
  setBranch(branch: 'army' | 'navy' | 'airforce' | 'marines' | 'coastguard' | 'none'): void {
    this.themeService.setMilitaryBranch(branch);
  }
  
  toggleAnimations(): void {
    this.themeService.toggleAnimations();
  }
  
  toggleTacticalEffects(): void {
    this.themeService.toggleTacticalEffects();
  }
  
  increaseIntensity(): void {
    this.themeService.increaseIntensity();
  }
  
  decreaseIntensity(): void {
    this.themeService.decreaseIntensity();
  }
  
  resetToDefault(): void {
    this.themeService.resetToDefault();
  }
}
