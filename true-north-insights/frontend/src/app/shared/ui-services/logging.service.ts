import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { shareReplay, takeUntil, map } from 'rxjs/operators';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL' | 'AUDIT';

export interface LogEntry {
  readonly id: string;
  readonly timestamp: Date;
  readonly level: LogLevel;
  readonly message: string;
  readonly category: string;
  readonly metadata?: Record<string, unknown>;
  readonly operation?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly stackTrace?: string;
  // Real-time ETA and completion tracking
  readonly eta?: Date;
  readonly completedAt?: Date;
  readonly duration?: number; // milliseconds
  readonly progress?: number; // 0-100 percentage
  readonly phase?: string; // e.g., "Foundation", "Market Penetration", "Scaling"
  readonly milestone?: string; // e.g., "Tactical Interface", "Navigation System"
}

export interface AuditEntry extends LogEntry {
  readonly action: string;
  readonly resource: string;
  readonly previousValue?: unknown;
  readonly newValue?: unknown;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}

/**
 * @description Traditional Angular logging service with comprehensive audit trails and performance monitoring for federal compliance
 * @author Development Team
 * @since 2025-10-02
 */
@Injectable({
  providedIn: 'root',
})
export class LoggingService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly logsSubject$ = new BehaviorSubject<LogEntry[]>([]);
  private readonly auditSubject$ = new BehaviorSubject<AuditEntry[]>([]);

  // Hot observables for real-time log monitoring
  public readonly logs$ = this.logsSubject$.pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  public readonly auditLogs$ = this.auditSubject$.pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  // Session and user context
  private sessionId: string = this.generateSessionId();
  private userId?: string;

  // Performance monitoring
  private readonly performanceSubject$ = new BehaviorSubject<
    Map<string, number>
  >(new Map());
  public readonly performance$ = this.performanceSubject$.pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  /**
   * @description Constructor for LoggingService - initializes logging with session tracking
   * @param None - No parameters required
   * @returns {void} No return value
   * @author Development Team
   * @since 2025-10-02
   */
  constructor() {
    this.info('LoggingService initialized', 'SYSTEM', {
      sessionId: this.sessionId,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
    });
  }

  /**
   * @description Set user context for all future logs
   * @param {string} userId - The unique identifier for the authenticated user
   * @returns {void} No return value
   */
  public log(
    level: LogLevel,
    message: string,
    category: string,
    metadata?: Record<string, unknown>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateUuid(),
      timestamp: new Date(),
      level,
      message,
      category,
      metadata,
      sessionId: this.sessionId,
      userId: this.userId,
    };
    const currentLogs = this.logsSubject$.getValue();
    this.logsSubject$.next([...currentLogs, logEntry]);
    // Optionally send critical errors to remote server here
  }

  /**
   * @description Logs a debug message
   * @param {string} message - The message to log
   * @param {string} category - The category of the log message
   * @param {Record<string, unknown>} [metadata] - Optional metadata
   * @returns {void} No return value
   */
  public debug(
    message: string,
    category: string,
    metadata?: Record<string, unknown>
  ): void {
    this.log('DEBUG', message, category, metadata);
  }

  /**
   * @description Logs an info message
   * @param {string} message - The message to log
   * @param {string} category - The category of the log message
   * @param {Record<string, unknown>} [metadata] - Optional metadata
   * @returns {void} No return value
   */
  public info(
    message: string,
    category: string,
    metadata?: Record<string, unknown>
  ): void {
    this.log('INFO', message, category, metadata);
  }

  /**
   * @description Logs a warning message
   * @param {string} message - The message to log
   * @param {string} category - The category of the log message
   * @param {Record<string, unknown>} [metadata] - Optional metadata
   * @returns {void} No return value
   */
  public warn(
    message: string,
    category: string,
    metadata?: Record<string, unknown>
  ): void {
    this.log('WARN', message, category, metadata);
  }

  /**
   * @description Logs an error message
   * @param {string} message - The message to log
   * @param {string} category - The category of the log message
   * @param {Error} error - The error object
   * @param {Record<string, unknown>} [metadata] - Optional metadata
   * @returns {void} No return value
   */
  public error(
    message: string,
    category: string,
    error: Error,
    metadata?: Record<string, unknown>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateUuid(),
      timestamp: new Date(),
      level: 'ERROR',
      message,
      category,
      metadata,
      sessionId: this.sessionId,
      userId: this.userId,
      stackTrace: error.stack,
    };

    const currentLogs = this.logsSubject$.getValue();
    this.logsSubject$.next([...currentLogs, logEntry]);

    // this.sendToRemote(logEntry);
    console.error(logEntry);
  }

  /**
   * @description Logs a fatal error message
   * @param {string} message - The message to log
   * @param {string} category - The category of the log message
   * @param {Error} error - The error object
   * @param {Record<string, unknown>} [metadata] - Optional metadata
   * @returns {void} No return value
   */
  public fatal(
    message: string,
    category: string,
    error: Error,
    metadata?: Record<string, unknown>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateUuid(),
      timestamp: new Date(),
      level: 'FATAL',
      message,
      category,
      metadata,
      sessionId: this.sessionId,
      userId: this.userId,
      stackTrace: error.stack,
    };

    const currentLogs = this.logsSubject$.getValue();
    this.logsSubject$.next([...currentLogs, logEntry]);

    // this.sendToRemote(logEntry);
    console.error(logEntry);
  }

  /**
   * @description Logs an audit trail message
   * @param {string} action - The action being audited
   * @param {string} resource - The resource being acted upon
   * @param {unknown} [previousValue] - The previous value of the resource
   * @param {unknown} [newValue] - The new value of the resource
   * @returns {void} No return value
   */
  public audit(
    action: string,
    resource: string,
    previousValue?: unknown,
    newValue?: unknown
  ): void {
    const auditEntry: AuditEntry = {
      id: this.generateUuid(),
      timestamp: new Date(),
      level: 'AUDIT',
      message: `Action: ${action} on ${resource}`,
      category: 'AUDIT',
      action,
      resource,
      previousValue,
      newValue,
      sessionId: this.sessionId,
      userId: this.userId,
      ipAddress: '127.0.0.1', // Placeholder - should be retrieved from request
      userAgent: navigator.userAgent,
    };

    const currentAuditLogs = this.auditSubject$.getValue();
    this.auditSubject$.next([...currentAuditLogs, auditEntry]);
  }

  /**
   * @description Start performance tracking for a specific operation
   * @param {string} operation - The name of the operation to track
   * @returns {void} No return value
   */
  public startPerformanceTracker(operation: string): void {
    this.performanceSubject$.getValue().set(operation, performance.now());
  }

  /**
   * @description Stop performance tracking for a specific operation and log the duration
   * @param {string} operation - The name of the operation to stop tracking
   * @returns {void} No return value
   */
  public stopPerformanceTracker(operation: string): void {
    const startTime = this.performanceSubject$.getValue().get(operation);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.info(
        `Operation '${operation}' completed in ${duration.toFixed(2)}ms`,
        'PERFORMANCE',
        { duration }
      );
      this.performanceSubject$.getValue().delete(operation);
    }
  }

  /**
   * @description Get all logs for a specific category
   * @param {string} category - The category to filter logs by
   * @returns {Observable<LogEntry[]>} An observable of log entries
   */
  public getLogsByCategory(category: string): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs) => logs.filter((log) => log.category === category))
    );
  }

  /**
   * @description Get all logs for a specific log level
   * @param {LogLevel} level - The log level to filter logs by
   * @returns {Observable<LogEntry[]>} An observable of log entries
   */
  public getLogsByLevel(level: LogLevel): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs) => logs.filter((log) => log.level === level))
    );
  }

  /**
   * @description Generate a unique session ID
   * @returns {string} A unique session ID
   */
  private generateSessionId(): string {
    return `session-${this.generateUuid()}`;
  }

  /**
   * @description Generate a UUID
   * @returns {string} A UUID
   */
  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * @description Clean up resources on destroy
   * @returns {void} No return value
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
