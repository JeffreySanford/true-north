import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToasterService } from '../../shared/ui-services/toaster.service';
import { LoggingService } from '../../shared/ui-services/logging.service';

@Component({
  selector: 'app-development',
  templateUrl: './development.html',
  styleUrls: ['./development.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent implements OnInit, OnDestroy {
  public readonly title = 'True North Insights';
  private readonly destroy$ = new Subject<void>();
  private readonly toaster = inject(ToasterService);
  private readonly logger = inject(LoggingService);

  public ngOnInit(): void {
    this.logger.info?.(
      'DevelopmentComponent initialized',
      'COMPONENT_LIFECYCLE'
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onDemonstrateToaster(): void {
    // Placeholder for demonstration logic
  }

  public onTestDatabaseOperations(): void {
    this.logger.info?.('Testing database operations', 'DB_TEST');
    timer(500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          ?.showStepProgress?.(
            'Database Test',
            1,
            3,
            'Connecting to primary data source'
          )
          ?.pipe(takeUntil(this.destroy$))
          ?.subscribe?.();
      });
    timer(1500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toaster
          ?.showStepProgress?.(
            'Database Test',
            2,
            3,
            'Running data integrity checks'
          )
          ?.pipe(takeUntil(this.destroy$))
          ?.subscribe?.();
      });
    timer(2500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // Placeholder for completion logic
      });
  }

  public onTestAuthenticationFlow(): void {
    // Placeholder for authentication flow test logic
  }
}
