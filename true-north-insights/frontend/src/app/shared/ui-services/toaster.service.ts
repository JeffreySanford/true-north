import { Injectable, OnDestroy, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';

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
 * @description Traditional Angular toaster service with Material 3 Expressive design and tactical color schemes for federal compliance notifications
 * @author Development Team
 * @since 2025-10-02
 */
@Injectable({
  providedIn: 'root'
})
export class ToasterService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly messagesSubject$ = new BehaviorSubject<ToasterMessage[]>([]);
  private readonly snackBar = inject(MatSnackBar);
  
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

  /**
   * @description Display success notification with tactical green theme
   * @param {string} message - The message to display in the success notification
   * @param {string} [action] - Optional action button text for the notification
   * @param {number} [duration] - Duration in milliseconds before auto-dismiss (default: 4000)
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
   */
  public showSuccess(message: string, action?: string, duration = 4000): Observable<ToasterMessage> {
    return this.show(message, 'success', { action, duration });
  }

  /**
   * @description Display error notification with tactical red theme
   * @param {string} message - The error message to display in the notification
   * @param {string} [action] - Optional action button text for the notification
   * @param {boolean} [persistent] - Whether the notification should persist until manually dismissed (default: false)
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
   */
  public showError(message: string, action?: string, persistent = false): Observable<ToasterMessage> {
    return this.show(message, 'error', { 
      action, 
      persistent, 
      duration: persistent ? 0 : 8000 
    });
  }

  /**
   * @description Display warning notification with tactical amber theme
   * @param {string} message - The warning message to display in the notification
   * @param {string} [action] - Optional action button text for the notification
   * @param {number} [duration] - Duration in milliseconds before auto-dismiss (default: 6000)
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
   */
  public showWarning(message: string, action?: string, duration = 6000): Observable<ToasterMessage> {
    return this.show(message, 'warning', { action, duration });
  }

  /**
   * @description Display info notification with tactical blue theme
   * @param {string} message - The informational message to display in the notification
   * @param {string} [action] - Optional action button text for the notification
   * @param {number} [duration] - Duration in milliseconds before auto-dismiss (default: 4000)
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
   */
  public showInfo(message: string, action?: string, duration = 4000): Observable<ToasterMessage> {
    return this.show(message, 'info', { action, duration });
  }

  /**
   * @description Display progress notification for long-running operations
   * @param {string} message - The progress message to display in the notification
   * @param {boolean} [persistent] - Whether the notification should persist until manually dismissed (default: true)
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
   */
  public showProgress(message: string, persistent = true): Observable<ToasterMessage> {
    return this.show(message, 'progress', { persistent, duration: 0 });
  }

  /**
   * @description Display tactical notification with special military-grade styling
   * @param {string} message - The tactical message to display in the notification
   * @param {string} [action] - Optional action button text for the notification
   * @param {number} [duration] - Duration in milliseconds before auto-dismiss (default: 5000)
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
   */
  public showTactical(message: string, action?: string, duration = 5000): Observable<ToasterMessage> {
    return this.show(message, 'tactical', { action, duration });
  }

  /**
   * @description Step-by-step operation notifications with audit logging
   * @param {string} operationName - The name of the operation being tracked
   * @param {number} currentStep - The current step number in the operation
   * @param {number} totalSteps - The total number of steps in the operation
   * @param {string} stepDescription - Description of the current step being performed
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
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
   * @description Database operation notifications for CRUD operations
   * @param {string} operation - The database operation type (CREATE, READ, UPDATE, DELETE)
   * @param {string} entity - The name of the entity being operated on
   * @param {string} status - The current status of the operation (START, SUCCESS, ERROR)
   * @param {string} [details] - Optional additional details about the operation
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
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
   * @description Authentication flow notifications for login, MFA, refresh, and logout operations
   * @param {string} step - The authentication step being performed (LOGIN, MFA, REFRESH, LOGOUT)
   * @param {string} status - The current status of the authentication step (START, SUCCESS, ERROR)
   * @param {string} [details] - Optional additional details about the authentication operation
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
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
   * @description Clear all notifications and dismiss any active snackbar
   * @returns {void} No return value
   */
  public clearAll(): void {
    this.snackBar.dismiss();
    this.messagesSubject$.next([]);
  }

  /**
   * @description Get notification history as an observable stream
   * @returns {Observable<ToasterMessage[]>} Observable containing array of all toaster messages
   */
  public getHistory(): Observable<ToasterMessage[]> {
    return this.messages$;
  }

  /**
   * @description Core notification display method with Material 3 Expressive styling
   * @param {string} message - The message text to display in the notification
   * @param {ToasterType} type - The type of notification (success, error, warning, info, progress, tactical)
   * @param {Partial<ToasterConfig>} [options] - Optional configuration options for the notification
   * @returns {Observable<ToasterMessage>} Observable containing the created toaster message
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
      // Updated default placement to bottom-right per UX request
      verticalPosition: 'bottom',
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

  /**
   * @description Generate unique identifier for toaster messages
   * @returns {string} Unique string identifier with timestamp and random suffix
   */
  private generateId(): string {
    return `toaster_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * @description Module destroy lifecycle hook - cleanup resources and dismiss notifications
   * @returns {void} No return value
   */
  public onModuleDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.snackBar.dismiss();
  }

  /**
   * @description Angular OnDestroy lifecycle hook - delegates to onModuleDestroy
   * @returns {void} No return value
   */
  public ngOnDestroy(): void {
    this.onModuleDestroy();
  }
}