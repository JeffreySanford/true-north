import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToasterService } from './toaster.service';
import { LoggingService } from './logging.service';

/**
 * @description Traditional Angular UI services module providing enterprise-grade notification and logging services with Material 3 Expressive design and tactical color schemes using observable-driven patterns throughout
 * @author True North Development Team
 * @since October 2, 2025
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
/**
 * @description UI services module providing shared Material Design components and notification services for federal applications
 * @author Development Team
 * @since 2025-10-02
 */
export class UIServicesModule { }
