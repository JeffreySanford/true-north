import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PatrioticThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  iconSet: 'military' | 'patriotic' | 'standard';
  intensity: 'subtle' | 'medium' | 'bold';
  animationsEnabled: boolean;
  starCount: number;
  enableTacticalEffects: boolean;
  showMilitaryBranches: boolean;
  selectedBranch?: 'army' | 'navy' | 'airforce' | 'marines' | 'coastguard' | 'none';
}

export type ThemeMode = 'light' | 'dark' | 'tactical';
export type PatrioticColor = 'red' | 'white' | 'blue';

@Injectable({
  providedIn: 'root'
})
export class PatrioticThemeService {
  // Default theme configuration
  private defaultConfig: PatrioticThemeConfig = {
    primaryColor: '#002868', // Navy Blue
    accentColor: '#BF0A30', // Red
    backgroundColor: '#FFFFFF', // White
    textColor: '#333333', // Dark Gray
    iconSet: 'patriotic',
    intensity: 'medium',
    animationsEnabled: true,
    starCount: 50,
    enableTacticalEffects: true,
    showMilitaryBranches: true,
    selectedBranch: 'none'
  };

  // Current theme configuration
  private themeConfig = new BehaviorSubject<PatrioticThemeConfig>(this.defaultConfig);

  // Current theme mode
  private themeModeSubject = new BehaviorSubject<ThemeMode>('light');

  // Active color
  private activeColorSubject = new BehaviorSubject<PatrioticColor>('blue');

  constructor() {
    console.log('PatrioticThemeService initialized');
    this.loadSavedTheme();
  }

  /**
   * Load any saved theme from localStorage
   */
  private loadSavedTheme(): void {
    try {
      const savedTheme = localStorage.getItem('patriotic-theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        this.themeConfig.next(parsedTheme);
      }
      
      const savedMode = localStorage.getItem('patriotic-theme-mode') as ThemeMode | null;
      if (savedMode) {
        this.themeModeSubject.next(savedMode);
      }
      
      const savedColor = localStorage.getItem('patriotic-active-color') as PatrioticColor | null;
      if (savedColor) {
        this.activeColorSubject.next(savedColor);
      }
    } catch (error) {
      console.error('Error loading saved theme', error);
      this.resetToDefault();
    }
  }

  /**
   * Save current theme to localStorage
   */
  private saveTheme(): void {
    try {
      localStorage.setItem('patriotic-theme', JSON.stringify(this.themeConfig.value));
      localStorage.setItem('patriotic-theme-mode', this.themeModeSubject.value);
      localStorage.setItem('patriotic-active-color', this.activeColorSubject.value);
    } catch (error) {
      console.error('Error saving theme', error);
    }
  }

  /**
   * Reset theme to default
   */
  resetToDefault(): void {
    this.themeConfig.next(this.defaultConfig);
    this.themeModeSubject.next('light');
    this.activeColorSubject.next('blue');
    this.saveTheme();
  }

  /**
   * Update theme configuration
   */
  updateTheme(config: Partial<PatrioticThemeConfig>): void {
    this.themeConfig.next({
      ...this.themeConfig.value,
      ...config
    });
    this.saveTheme();
  }

  /**
   * Get current theme configuration
   */
  getThemeConfig(): Observable<PatrioticThemeConfig> {
    return this.themeConfig.asObservable();
  }

  /**
   * Get current theme mode
   */
  getThemeMode(): Observable<ThemeMode> {
    return this.themeModeSubject.asObservable();
  }

  /**
   * Set theme mode
   */
  setThemeMode(mode: ThemeMode): void {
    this.themeModeSubject.next(mode);
    
    // Update colors based on theme mode
    if (mode === 'dark') {
      this.updateTheme({
        backgroundColor: '#121212',
        textColor: '#FFFFFF'
      });
    } else if (mode === 'tactical') {
      this.updateTheme({
        primaryColor: '#1B3022', // Military green
        backgroundColor: '#0A0E14',
        textColor: '#7CFC00', // Bright green for tactical display
        iconSet: 'military',
        enableTacticalEffects: true
      });
    } else {
      // Light mode
      this.updateTheme({
        backgroundColor: '#FFFFFF',
        textColor: '#333333'
      });
    }
    
    this.saveTheme();
  }

  /**
   * Toggle theme mode between light/dark
   */
  toggleThemeMode(): void {
    const currentMode = this.themeModeSubject.value;
    if (currentMode === 'light') {
      this.setThemeMode('dark');
    } else if (currentMode === 'dark') {
      this.setThemeMode('tactical');
    } else {
      this.setThemeMode('light');
    }
  }

  /**
   * Get active color
   */
  getActiveColor(): Observable<PatrioticColor> {
    return this.activeColorSubject.asObservable();
  }

  /**
   * Set active color
   */
  setActiveColor(color: PatrioticColor): void {
    this.activeColorSubject.next(color);
    
    // Update primary/accent based on selected patriotic color
    switch (color) {
      case 'red':
        this.updateTheme({ 
          primaryColor: '#BF0A30',
          accentColor: '#002868'
        });
        break;
      case 'white':
        this.updateTheme({ 
          primaryColor: '#FFFFFF',
          accentColor: '#BF0A30',
          textColor: '#002868' 
        });
        break;
      case 'blue':
      default:
        this.updateTheme({ 
          primaryColor: '#002868',
          accentColor: '#BF0A30'
        });
        break;
    }
    
    this.saveTheme();
  }

  /**
   * Set military branch theme
   */
  setMilitaryBranch(branch: 'army' | 'navy' | 'airforce' | 'marines' | 'coastguard' | 'none'): void {
    this.updateTheme({ selectedBranch: branch });
    
    // Update colors based on military branch
    switch (branch) {
      case 'army':
        this.updateTheme({ 
          primaryColor: '#4B5320', // Army green
          accentColor: '#FFC000'  // Gold
        });
        break;
      case 'navy':
        this.updateTheme({ 
          primaryColor: '#000080', // Navy blue
          accentColor: '#D4AF37'  // Gold
        });
        break;
      case 'airforce':
        this.updateTheme({ 
          primaryColor: '#0078D7', // Air Force blue
          accentColor: '#FFFFFF'  // White
        });
        break;
      case 'marines':
        this.updateTheme({ 
          primaryColor: '#8B0000', // Marine red
          accentColor: '#FFCC00'  // Gold
        });
        break;
      case 'coastguard':
        this.updateTheme({ 
          primaryColor: '#003366', // Coast Guard blue
          accentColor: '#F9A602'  // Gold
        });
        break;
      case 'none':
      default:
        // Reset to standard patriotic colors
        this.setActiveColor('blue');
        break;
    }
    
    this.saveTheme();
  }
  
  /**
   * Get CSS variables for current theme
   */
  getThemeCssVariables(): { [key: string]: string } {
    const config = this.themeConfig.value;
    
    return {
      '--primary-color': config.primaryColor,
      '--accent-color': config.accentColor,
      '--background-color': config.backgroundColor,
      '--text-color': config.textColor,
      '--patriotic-red': '#BF0A30',
      '--patriotic-white': '#FFFFFF',
      '--patriotic-blue': '#002868',
      '--theme-intensity': config.intensity === 'subtle' ? '0.7' : 
                          config.intensity === 'medium' ? '1.0' : '1.3',
      '--animation-speed': config.animationsEnabled ? '1' : '0',
    };
  }
  
  /**
   * Apply theme to document
   */
  applyThemeToDocument(): void {
    const cssVars = this.getThemeCssVariables();
    const root = document.documentElement;
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // Add appropriate body class
    document.body.className = '';
    document.body.classList.add(`theme-mode-${this.themeModeSubject.value}`);
    
    if (this.themeConfig.value.selectedBranch !== 'none') {
      document.body.classList.add(`branch-${this.themeConfig.value.selectedBranch}`);
    }
    
    document.body.classList.add(`color-${this.activeColorSubject.value}`);
  }
  
  /**
   * Increase theme intensity
   */
  increaseIntensity(): void {
    const current = this.themeConfig.value.intensity;
    if (current === 'subtle') {
      this.updateTheme({ intensity: 'medium' });
    } else if (current === 'medium') {
      this.updateTheme({ intensity: 'bold' });
    }
    this.applyThemeToDocument();
  }
  
  /**
   * Decrease theme intensity
   */
  decreaseIntensity(): void {
    const current = this.themeConfig.value.intensity;
    if (current === 'bold') {
      this.updateTheme({ intensity: 'medium' });
    } else if (current === 'medium') {
      this.updateTheme({ intensity: 'subtle' });
    }
    this.applyThemeToDocument();
  }
  
  /**
   * Toggle animations
   */
  toggleAnimations(): void {
    this.updateTheme({ 
      animationsEnabled: !this.themeConfig.value.animationsEnabled 
    });
    this.applyThemeToDocument();
  }
  
  /**
   * Toggle tactical effects
   */
  toggleTacticalEffects(): void {
    this.updateTheme({ 
      enableTacticalEffects: !this.themeConfig.value.enableTacticalEffects 
    });
  }
  
  /**
   * Get class for element based on current theme
   */
  getThemeClass(element: 'button' | 'section' | 'card' | 'header'): string {
    const mode = this.themeModeSubject.value;
    const color = this.activeColorSubject.value;
    const branch = this.themeConfig.value.selectedBranch;
    
    let classes = `${element}-${color} ${element}-mode-${mode}`;
    
    if (branch !== 'none') {
      classes += ` ${element}-branch-${branch}`;
    }
    
    return classes;
  }

  /**
   * Get appropriate icon for a specific context based on current theme
   */
  getContextIcon(context: 'mission' | 'veterans' | 'technology' | 'history' | 'contact'): string {
    const iconSet = this.themeConfig.value.iconSet;
    
    if (iconSet === 'military') {
      // Military-themed icons
      switch (context) {
        case 'mission': return 'military_tech';
        case 'veterans': return 'stars';
        case 'technology': return 'radar';
        case 'history': return 'history_edu';
        case 'contact': return 'connect_without_contact';
      }
    } else if (iconSet === 'patriotic') {
      // Patriotic-themed icons
      switch (context) {
        case 'mission': return 'flag';
        case 'veterans': return 'military_tech';
        case 'technology': return 'shield';
        case 'history': return 'location_city';
        case 'contact': return 'location_on';
      }
    } else {
      // Standard icons
      switch (context) {
        case 'mission': return 'task_alt';
        case 'veterans': return 'people';
        case 'technology': return 'devices';
        case 'history': return 'history';
        case 'contact': return 'email';
      }
    }
  }
}