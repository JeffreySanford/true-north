import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { AuthGuard } from './core/auth.guard';
import { LandingModule } from './landing/landing.module';
import { AboutModule } from './about/about.module';

// ...existing code...
/**
 * The root Angular module for the True North Apparel frontend app.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LandingModule,
    AboutModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
      { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
      { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
      { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
      { path: '**', redirectTo: '' },
    ], { useHash: true, scrollPositionRestoration: 'enabled' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
