import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { SectionComponent } from './sections/section.component';
import { ParallaxDirective } from './common/directives/parallax.directive';
import { ScrollService } from './common/services/scroll.service';
import { RouterModule } from '@angular/router';
import { AuditComponent } from './sections/audit/audit.component';
import { DataProvedanceComponent } from './sections/data-provedance/data-provedance.component';
import { ModernizationComponent } from './sections/modernization/modernization.component';
import { AppRoutingModule } from './app.routing.module';
import { EfficiencyComponent } from './sections/efficiency/efficiency.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ParallaxMouseDirective } from './common/directives/parallax-mouse.directive';
import { AnimatedBackgroundComponent } from './common/components/animated-background.component';
import { VeteranResourcesComponent } from './sections/veteran-resources/veteran-resources.component';
import { PatrioticThemeService } from './services/patriotic-theme.service';
import { ThemeSelectorComponent } from './common/components/theme-selector.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './sections/home/home.component';
import { ServiceDetailComponent } from './sections/service-detail/service-detail.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TacticalDisplayComponent } from './components/tactical-display/tactical-display.component';
import { RadarDisplayComponent } from './components/radar-display/radar-display.component';
import { OverlayService } from './services/overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    ParallaxDirective,
    ModernizationComponent,
    AuditComponent,
    DataProvedanceComponent,
    EfficiencyComponent,
    ParallaxMouseDirective,
    AnimatedBackgroundComponent,
    VeteranResourcesComponent,
    ThemeSelectorComponent,
    HomeComponent,
    ServiceDetailComponent,
    TacticalDisplayComponent,
    RadarDisplayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    LazyLoadImageModule,
    AppRoutingModule,
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
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [ScrollService, provideAnimationsAsync(), PatrioticThemeService, DatePipe, OverlayService],
  bootstrap: [AppComponent],
  exports: [ParallaxDirective, ParallaxMouseDirective, TacticalDisplayComponent]
})
export class AppModule {
  constructor(private patrioticThemeService: PatrioticThemeService) {
    // Apply theme on app initialization
    this.patrioticThemeService.applyThemeToDocument();
  }
}
