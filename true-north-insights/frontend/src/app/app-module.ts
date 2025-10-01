import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { appRoutes } from './app.routes';
import { NxWelcome } from './nx-welcome';
import { UiServicesModule } from './shared/ui-services/ui-services-module';

/**
 * TRADITIONAL ANGULAR APP MODULE
 * 
 * Root NgModule with Material 3 Expressive UI services
 * Observable-driven architecture with enterprise logging
 * Tactical notification system integrated
 */
@NgModule({
  declarations: [App, NxWelcome],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    UiServicesModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],
})
export class AppModule {}
