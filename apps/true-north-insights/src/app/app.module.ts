import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';

// Third-party imports
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// App imports
import { AppComponent } from './app.component';
import { SectionComponent } from './sections/section.component';
import { ScrollService } from './common/services/scroll.service';
import { AuditComponent } from './sections/audit/audit.component';
import { DataProvedanceComponent } from './sections/data-provedance/data-provedance.component';
import { ModernizationComponent } from './sections/modernization/modernization.component';
import { AppRoutingModule } from './app.routing.module';
import { EfficiencyComponent } from './sections/efficiency/efficiency.component';
import { AnimatedBackgroundComponent } from './common/components/animated-background.component';
import { VeteranResourcesComponent } from './sections/veteran-resources/veteran-resources.component';
import { PatrioticThemeService } from './services/patriotic-theme.service';
import { ThemeSelectorComponent } from './common/components/theme-selector.component';
import { HomeComponent } from './sections/home/home.component';
import { ServiceDetailComponent } from './sections/service-detail/service-detail.component';
import { DatePipe } from '@angular/common';
import { TacticalDisplayComponent } from './components/tactical-display/tactical-display.component';
import { RadarDisplayComponent } from './components/radar-display/radar-display.component';
import { OverlayService } from './services/overlay.service';
import { SharedModule } from './shared/shared.module';
import { ParallaxDirective } from './shared/directives/parallax.directive';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    ModernizationComponent,
    AuditComponent,
    DataProvedanceComponent,
    EfficiencyComponent,
    AnimatedBackgroundComponent,
    VeteranResourcesComponent,
    ThemeSelectorComponent,
    HomeComponent,
    ServiceDetailComponent,
    TacticalDisplayComponent,
    RadarDisplayComponent
  ],
  imports: [
    // Angular core modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Material modules
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    
    // App modules
    LazyLoadImageModule,
    AppRoutingModule,
    SharedModule,
    
    // Standalone directives
    ParallaxDirective
  ],
  providers: [
    ScrollService, 
    provideAnimationsAsync(), 
    PatrioticThemeService, 
    DatePipe, 
    OverlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private patrioticThemeService: PatrioticThemeService) {
    // Apply theme on app initialization
    this.patrioticThemeService.applyThemeToDocument();
  }
}
