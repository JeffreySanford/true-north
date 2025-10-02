import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToasterService } from './shared/ui-services/toaster.service';
import { LoggingService } from './shared/ui-services/logging.service';

/**
 * TRADITIONAL ANGULAR ROOT COMPONENT
 * 
 * Demonstrates Material 3 Expressive toaster notifications
 * Observable-driven logging and step-by-step user feedback
 * Legendary tactical UI/UX patterns
 */
/**
 * @description Main application component with tactical UI and enterprise logging
 * @author True North Development Team
 * @since October 2, 2025
 */
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * @description Root application component providing tactical dashboard framework with enterprise logging and notification systems
 * @author Development Team
 * @since 2025-10-02
 */
export class App implements OnInit, OnDestroy {
  public readonly title = 'True North Insights';
  private readonly destroy$ = new Subject<void>();

  /**
   * @description Constructor for App component - initializes services for tactical notifications and logging
   * @param {ToasterService} toaster - Injected toaster service for displaying notifications
   * @param {LoggingService} logger - Injected logging service for application audit trails
   * @author True North Development Team
   * @since October 2, 2025
   */
  constructor(
    private readonly toaster: ToasterService,
    private readonly logger: LoggingService
  ) {}

  /**
   * @description Initialize application and demonstrate tactical notifications
   * @returns {void}
   */
  public ngOnInit(): void {
    this.logger.info('Application initialized', 'APP_STARTUP', {
      title: this.title,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    });

    // Demonstrate legendary tactical notifications
    this.demonstrateTacticalNotifications();
  }

  /**
   * Demonstrate our legendary Material 3 Expressive toaster system
   */
  private demonstrateTacticalNotifications(): void {
    this.logger.info('Starting tactical notification demonstration', 'DEMO');

    // Welcome notification
    timer(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showTactical(
        'Welcome to True North Insights - Traditional Angular Architecture Active',
        'EXPLORE'
      ).pipe(takeUntil(this.destroy$)).subscribe();
    });

    // System status notifications
    timer(3000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showStepProgress('System Initialization', 1, 4, 'Loading core services')
        .pipe(takeUntil(this.destroy$)).subscribe();
    });

    timer(4500).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showStepProgress('System Initialization', 2, 4, 'Establishing database connections')
        .pipe(takeUntil(this.destroy$)).subscribe();
    });

    timer(6000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showStepProgress('System Initialization', 3, 4, 'Configuring authentication')
        .pipe(takeUntil(this.destroy$)).subscribe();
    });

    timer(7500).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showStepProgress('System Initialization', 4, 4, 'Ready for tactical operations')
        .pipe(takeUntil(this.destroy$)).subscribe();
    });

    // Success notification
    timer(9000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showSuccess(
        'Traditional NgModule architecture fully operational - Zero standalone components detected',
        'CONTINUE'
      ).pipe(takeUntil(this.destroy$)).subscribe();
    });

    // Information about next steps
    timer(12000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showInfo(
        'Ready for Phase 2: Dual Persistence Implementation - Observable patterns enforced',
        'BEGIN'
      ).pipe(takeUntil(this.destroy$)).subscribe();
    });
  }

  /**
   * @description Manually trigger toaster notification demonstrations
   * @returns {void}
   */
  public onDemonstrateToaster(): void {
    this.logger.info('Manual toaster demonstration triggered', 'USER_ACTION');

    // Show all tactical notification types
    this.toaster.showSuccess('Database operation completed successfully', 'VIEW').pipe(
      takeUntil(this.destroy$)
    ).subscribe();

    timer(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showWarning('High CPU usage detected - monitoring performance', 'OPTIMIZE').pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });

    timer(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showError('Authentication token expired - please refresh', 'REFRESH', true).pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });

    timer(3000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toaster.showTactical('Tactical display mode activated - All systems green', 'ENGAGE').pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  /**
   * @description Test database operations with logging and notifications
   * @returns {void}
   */
  public onTestDatabaseOperations(): void {
    this.logger.logStep('Database Testing', 1, 3, 'Starting MongoDB connection test');
    
    this.toaster.showDatabaseOperation('CREATE', 'User', 'START').pipe(
      takeUntil(this.destroy$)
    ).subscribe();

    timer(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.logger.logStep('Database Testing', 2, 3, 'Creating test user record');
      this.toaster.showDatabaseOperation('CREATE', 'User', 'SUCCESS').pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });

    timer(4000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.logger.logStep('Database Testing', 3, 3, 'Validating dual persistence sync');
      this.toaster.showDatabaseOperation('READ', 'User', 'SUCCESS', 'Dual persistence validated').pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  /**
   * @description Test authentication flow with comprehensive logging
   * @returns {void}
   */
  public onTestAuthenticationFlow(): void {
    this.logger.logAuthFlow('LOGIN', 'START', { component: 'AppComponent' });
    
    this.toaster.showAuthFlow('LOGIN', 'START').pipe(
      takeUntil(this.destroy$)
    ).subscribe();

    timer(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.logger.logAuthFlow('MFA', 'START');
      this.toaster.showAuthFlow('MFA', 'START').pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });

    timer(4000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.logger.logAuthFlow('LOGIN', 'SUCCESS', { userId: 'demo-user-123' });
      this.toaster.showAuthFlow('LOGIN', 'SUCCESS', 'Welcome back, Commander').pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  /**
   * @description Clean up subscriptions and log application shutdown
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.logger.info('Application shutting down', 'APP_SHUTDOWN');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
