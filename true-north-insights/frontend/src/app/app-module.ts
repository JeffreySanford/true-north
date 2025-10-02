import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { appRoutes } from './app.routes';
import { UIServicesModuleService } from './shared/ui-services/ui-services-module';

/**
 * @description Traditional Angular root module with Material 3 Expressive UI services
 * @author True North Development Team
 * @since October 2, 2025
 * 
 * Root NgModule with Material 3 Expressive UI services
 * Observable-driven architecture with enterprise logging
 * Tactical notification system integrated
 */
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    UIServicesModuleService
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],
})
/**
 * @description Root application module that bootstraps the Angular application with essential configurations and providers
 * @author Development Team
 * @since 2025-10-02
 */
export class AppModule {}
