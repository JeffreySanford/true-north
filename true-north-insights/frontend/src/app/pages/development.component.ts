import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToasterService } from '../shared/ui-services/toaster.service';
import { LoggingService } from '../shared/ui-services/logging.service';

@Component({
  selector: 'app-development',
  templateUrl: './development.html',
  styleUrl: './development.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DevelopmentComponent implements OnInit, OnDestroy {
  public readonly title = 'True North Insights';
  private readonly destroy$ = new Subject<void>();

  private readonly toaster = inject(ToasterService);
  private readonly logger = inject(LoggingService);

  public ngOnInit(): void {
    this.logger.info('DevelopmentComponent initialized', 'COMPONENT_LIFECYCLE');
  }

  public onDemonstrateToaster(): void {
    this.demonstrateTacticalNotifications();
  }

  public onTestDatabaseOperations(): void {
    this.logger.info('Testing database operations', 'DB_TEST');
    timer(500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress(
            'Database Test',
            1,
            3,
            'Connecting to primary data source'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
    timer(1500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress(
            'Database Test',
            2,
            3,
            'Running data integrity checks'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
    timer(2500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showSuccess('Database operations successful')
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
  }

  public onTestAuthenticationFlow(): void {
    this.logger.info('Testing authentication flow', 'AUTH_TEST');
    timer(500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress('Auth Test', 1, 3, 'Generating JWT')
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
    timer(1500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress('Auth Test', 2, 3, 'Validating MFA token')
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
    timer(2500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showSuccess('Authentication flow successful')
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
  }

  private demonstrateTacticalNotifications(): void {
    this.logger.info('Starting tactical notification demonstration', 'DEMO');

    timer(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showTactical(
            'Welcome to True North Insights - Traditional Angular Architecture Active',
            'EXPLORE'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress(
            'System Initialization',
            1,
            4,
            'Loading core services'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(4500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress(
            'System Initialization',
            2,
            4,
            'Establishing database connections'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(6000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress(
            'System Initialization',
            3,
            4,
            'Configuring authentication'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(7500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showStepProgress(
            'System Initialization',
            4,
            4,
            'Ready for tactical operations'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(9000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showSuccess(
            'All systems initialized and running at peak performance',
            'SYSTEM_READY'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(11000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showInfo(
            'Architectural pattern: Traditional Angular with NgModules and Material 3 Expressive',
            'INFO'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(13000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showWarning(
            'Security audit scheduled for 2025-12-01. Ensure all logs are archived.',
            'AUDIT_WARNING'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });

    timer(15000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          .showError(
            'Simulated error: Failed to connect to tertiary backup server. Retrying...',
            'CONNECTION_ERROR'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.logger.info('Development page destroyed', 'DEV_PAGE_DESTROY');
  }
}
