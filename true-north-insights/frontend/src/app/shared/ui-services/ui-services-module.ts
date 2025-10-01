import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToasterService } from './toaster.service';
import { LoggingService } from './logging.service';

/**
 * TRADITIONAL ANGULAR UI SERVICES MODULE
 * 
 * Provides enterprise-grade notification and logging services
 * Material 3 Expressive design with tactical color schemes
 * Observable-driven patterns throughout
 */
@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    ToasterService,
    LoggingService
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UiServicesModule { }
