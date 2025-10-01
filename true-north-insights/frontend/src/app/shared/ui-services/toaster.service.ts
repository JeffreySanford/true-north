import { Injectable, OnDestroy, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

export interface ToasterMessage {
  readonly id: string;
  readonly message: string;
  readonly type: ToasterType;
  readonly timestamp: Date;
  readonly duration?: number;
  readonly action?: string;
  readonly persistent?: boolean;
}

export type ToasterType = 'success' | 'error' | 'warning' | 'info' | 'progress' | 'tactical';

export interface ToasterConfig extends MatSnackBarConfig {
  readonly type?: ToasterType;
  readonly persistent?: boolean;
  readonly showTimestamp?: boolean;
  readonly action?: string;
}

/**
 * TRADITIONAL ANGULAR TOASTER SERVICE
 * 
 * Material 3 Expressive design with tactical color schemes
 * Observable-driven notifications for enterprise UX
 * Hot observable patterns with auditTime for performance
 */
@Injectable({
  providedIn: 'root'
})
export class ToasterService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly messagesSubject$ = new BehaviorSubject<ToasterMessage[]>([]);
  
  // Hot observable for message history
  public readonly messages$ = this.messagesSubject$.pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );
  
  // Tactical color scheme for Material 3 Expressive
  private readonly tacticalColors = {
    success: 'tactical-success',
    error: 'tactical-error', 
    warning: 'tactical-warning',
    info: 'tactical-info',
    progress: 'tactical-progress',
    tactical: 'tactical-primary'
  };

  private readonly snackBar = inject(MatSnackBar);

  /**
   * Display success notification with tactical green theme
   */
  public showSuccess(message: string, action?: string, duration = 4000): Observable<ToasterMessage> {
    return this.show(message, 'success', { action, duration });
  }

  /**
   * Display error notification with tactical red theme  
   */
  public showError(message: string, action?: string, persistent = false): Observable<ToasterMessage> {
    return this.show(message, 'error', { 
      action, 
      persistent, 
      duration: persistent ? 0 : 8000 
    });
  }

  /**
   * Display warning notification with tactical amber theme
   */
  public showWarning(message: string, action?: string, duration = 6000): Observable<ToasterMessage> {
    return this.show(message, 'warning', { action, duration });
  }

  /**
   * Display info notification with tactical blue theme
   */
  public showInfo(message: string, action?: string, duration = 4000): Observable<ToasterMessage> {
    return this.show(message, 'info', { action, duration });
  }

  /**
   * Display progress notification for long-running operations
   */
  public showProgress(message: string, persistent = true): Observable<ToasterMessage> {
    return this.show(message, 'progress', { persistent, duration: 0 });
  }

  /**
   * Display tactical notification with special military-grade styling
   */
  public showTactical(message: string, action?: string, duration = 5000): Observable<ToasterMessage> {
    return this.show(message, 'tactical', { action, duration });
  }

  /**
   * Step-by-step operation notifications with audit logging
   */
  public showStepProgress(
    operationName: string, 
    currentStep: number, 
    totalSteps: number, 
    stepDescription: string
  ): Observable<ToasterMessage> {
    const progressMessage = `${operationName}: Step ${currentStep}/${totalSteps} - ${stepDescription}`;
    
    return this.show(progressMessage, 'progress', {
      persistent: currentStep < totalSteps,
      duration: currentStep === totalSteps ? 3000 : 0,
      showTimestamp: true
    }).pipe(
      tap((message: ToasterMessage) => {
        // Audit logging integration point
        console.log('STEP_PROGRESS:', {
          operation: operationName,
          step: currentStep,
          total: totalSteps,
          description: stepDescription,
          messageId: message.id,
          timestamp: message.timestamp
        });
      })
    );
  }

  /**
   * Database operation notifications
   */
  public showDatabaseOperation(
    operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE',
    entity: string,
    status: 'START' | 'SUCCESS' | 'ERROR',
    details?: string
  ): Observable<ToasterMessage> {
    const message = `${operation} ${entity}: ${status}${details ? ` - ${details}` : ''}`;
    
    switch (status) {
      case 'START':
        return this.showProgress(`Starting ${operation.toLowerCase()} operation on ${entity}...`);
      case 'SUCCESS':
        return this.showSuccess(`${operation} ${entity} completed successfully`);
      case 'ERROR':
        return this.showError(`${operation} ${entity} failed${details ? `: ${details}` : ''}`, 'RETRY', true);
      default:
        return this.showInfo(message);
    }
  }

  /**
   * Authentication flow notifications
   */
  public showAuthFlow(
    step: 'LOGIN' | 'MFA' | 'REFRESH' | 'LOGOUT',
    status: 'START' | 'SUCCESS' | 'ERROR',
    details?: string
  ): Observable<ToasterMessage> {
    const stepNames = {
      'LOGIN': 'Login',
      'MFA': 'Multi-Factor Authentication',
      'REFRESH': 'Token Refresh', 
      'LOGOUT': 'Logout'
    };
    
    const stepName = stepNames[step];
    const message = `${stepName}: ${status}${details ? ` - ${details}` : ''}`;
    
    switch (status) {
      case 'START':
        return this.showProgress(`${stepName} in progress...`);
      case 'SUCCESS':
        return this.showTactical(`${stepName} successful`, 'CONTINUE');
      case 'ERROR':
        return this.showError(`${stepName} failed${details ? `: ${details}` : ''}`, 'RETRY', true);
      default:
        return this.showInfo(message);
    }
  }

  /**
   * Clear all notifications
   */
  public clearAll(): void {
    this.snackBar.dismiss();
    this.messagesSubject$.next([]);
  }

  /**
   * Get notification history
   */
  public getHistory(): Observable<ToasterMessage[]> {
    return this.messages$;
  }

  /**
   * Core notification display method with Material 3 Expressive styling
   */
  private show(
    message: string, 
    type: ToasterType, 
    options: Partial<ToasterConfig> = {}
  ): Observable<ToasterMessage> {
    const toasterMessage: ToasterMessage = {
      id: this.generateId(),
      message,
      type,
      timestamp: new Date(),
      duration: options.duration,
      action: options.action,
      persistent: options.persistent
    };

    // Add to message history
    const currentMessages = this.messagesSubject$.value;
    this.messagesSubject$.next([...currentMessages, toasterMessage]);

    // Configure Material 3 Expressive styling
    const config: MatSnackBarConfig = {
      duration: options.persistent ? 0 : (options.duration || 4000),
      panelClass: [
        'tactical-toaster',
        this.tacticalColors[type],
        options.showTimestamp ? 'with-timestamp' : ''
      ].filter(Boolean),
      verticalPosition: 'top',
      horizontalPosition: 'right',
      ...options
    };

    // Display with Material 3 Expressive design
    const snackBarRef: MatSnackBarRef<unknown> = this.snackBar.open(
      options.showTimestamp 
        ? `[${toasterMessage.timestamp.toLocaleTimeString()}] ${message}`
        : message,
      options.action,
      config
    );

    // Handle action clicks
    if (options.action) {
      snackBarRef.onAction().pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        console.log('TOASTER_ACTION:', {
          messageId: toasterMessage.id,
          action: options.action,
          timestamp: new Date()
        });
      });
    }

    return new BehaviorSubject(toasterMessage).pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  private generateId(): string {
    return `toaster_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public onModuleDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.snackBar.dismiss();
  }

  public ngOnDestroy(): void {
    this.onModuleDestroy();
  }
}