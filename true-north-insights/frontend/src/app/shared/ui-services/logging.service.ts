import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { shareReplay, takeUntil, tap, auditTime, filter, map } from 'rxjs/operators';

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
 * TRADITIONAL ANGULAR LOGGING SERVICE
 * 
 * Observable-driven comprehensive logging with audit trails
 * Hot observable patterns for enterprise monitoring
 * Step-by-step operation tracking with detailed metadata
 */
@Injectable({
  providedIn: 'root'
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
  private readonly performanceSubject$ = new BehaviorSubject<Map<string, number>>(new Map());
  public readonly performance$ = this.performanceSubject$.pipe(
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  constructor() {
    this.info('LoggingService initialized', 'SYSTEM', {
      sessionId: this.sessionId,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    });
  }

  /**
   * Set user context for all future logs
   */
  public setUserContext(userId: string): void {
    this.userId = userId;
    this.info('User context set', 'AUTH', { userId });
  }

  /**
   * Clear user context (logout)
   */
  public clearUserContext(): void {
    const previousUserId = this.userId;
    this.userId = undefined;
    this.info('User context cleared', 'AUTH', { previousUserId });
  }

  /**
   * Debug level logging - development and troubleshooting
   */
  public debug(message: string, category: string = 'GENERAL', metadata?: Record<string, unknown>): Observable<LogEntry> {
    return this.logBasic('DEBUG', message, category, metadata);
  }

  /**
   * Info level logging - general information
   */
  public info(message: string, category: string = 'GENERAL', metadata?: Record<string, unknown>): Observable<LogEntry> {
    return this.logBasic('INFO', message, category, metadata);
  }

  /**
   * Warning level logging - potential issues
   */
  public warn(message: string, category: string = 'GENERAL', metadata?: Record<string, unknown>): Observable<LogEntry> {
    return this.logBasic('WARN', message, category, metadata);
  }

  /**
   * Error level logging - errors and exceptions
   */
  public error(message: string, category: string = 'GENERAL', error?: Error, metadata?: Record<string, unknown>): Observable<LogEntry> {
    const errorMetadata = {
      ...metadata,
      error: error?.message,
      stack: error?.stack
    };
    
    return this.logBasic('ERROR', message, category, errorMetadata, undefined, error?.stack);
  }

  /**
   * Fatal level logging - critical system failures
   */
  public fatal(message: string, category: string = 'SYSTEM', error?: Error, metadata?: Record<string, unknown>): Observable<LogEntry> {
    const fatalMetadata = {
      ...metadata,
      error: error?.message,
      stack: error?.stack,
      critical: true
    };
    
    return this.logBasic('FATAL', message, category, fatalMetadata, undefined, error?.stack);
  }

  /**
   * Step-by-step operation logging
   */
  public logStep(
    operationName: string,
    stepNumber: number,
    totalSteps: number,
    stepDescription: string,
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const stepMetadata = {
      ...metadata,
      operation: operationName,
      step: stepNumber,
      totalSteps,
      stepDescription,
      progress: Math.round((stepNumber / totalSteps) * 100)
    };

    return this.info(
      `Operation: ${operationName} - Step ${stepNumber}/${totalSteps}: ${stepDescription}`,
      'OPERATION',
      stepMetadata
    );
  }

  /**
   * Database operation logging
   */
  public logDatabaseOperation(
    operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE',
    entity: string,
    status: 'START' | 'SUCCESS' | 'ERROR',
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const dbMetadata = {
      ...metadata,
      dbOperation: operation,
      entity,
      status
    };

    const message = `Database ${operation} on ${entity}: ${status}`;
    
    switch (status) {
      case 'START':
        return this.info(message, 'DATABASE', dbMetadata);
      case 'SUCCESS':
        return this.info(message, 'DATABASE', dbMetadata);
      case 'ERROR':
        return this.error(message, 'DATABASE', undefined, dbMetadata);
      default:
        return this.info(message, 'DATABASE', dbMetadata);
    }
  }

  /**
   * Authentication flow logging
   */
  public logAuthFlow(
    action: 'LOGIN' | 'LOGOUT' | 'MFA' | 'REFRESH',
    status: 'START' | 'SUCCESS' | 'FAILURE',
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const authMetadata = {
      ...metadata,
      authAction: action,
      status,
      sessionId: this.sessionId
    };

    const message = `Authentication ${action}: ${status}`;
    
    switch (status) {
      case 'START':
        return this.info(message, 'AUTH', authMetadata);
      case 'SUCCESS':
        return this.info(message, 'AUTH', authMetadata);
      case 'FAILURE':
        return this.warn(message, 'AUTH', authMetadata);
      default:
        return this.info(message, 'AUTH', authMetadata);
    }
  }

  /**
   * Audit logging for compliance and security
   */
  public audit(
    action: string,
    resource: string,
    previousValue?: unknown,
    newValue?: unknown,
    metadata?: Record<string, unknown>
  ): Observable<AuditEntry> {
    const auditEntry: AuditEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'AUDIT',
      message: `AUDIT: ${action} on ${resource}`,
      category: 'AUDIT',
      operation: action,
      userId: this.userId,
      sessionId: this.sessionId,
      action,
      resource,
      previousValue,
      newValue,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      metadata
    };

    // Add to audit log
    const currentAuditLogs = this.auditSubject$.value;
    this.auditSubject$.next([...currentAuditLogs, auditEntry]);

    // Also add to regular logs
    this.addToLogs(auditEntry);

    console.log('AUDIT:', auditEntry);

    return new BehaviorSubject(auditEntry).pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  /**
   * Performance timing - start tracking
   */
  public startTiming(operationName: string): void {
    const currentPerf = this.performanceSubject$.value;
    currentPerf.set(`${operationName}_start`, Date.now());
    this.performanceSubject$.next(new Map(currentPerf));
    
    this.debug(`Started timing: ${operationName}`, 'PERFORMANCE');
  }

  /**
   * Performance timing - end tracking and log duration
   */
  public endTiming(operationName: string): Observable<LogEntry> {
    const currentPerf = this.performanceSubject$.value;
    const startTime = currentPerf.get(`${operationName}_start`);
    
    if (startTime) {
      const duration = Date.now() - startTime;
      currentPerf.delete(`${operationName}_start`);
      this.performanceSubject$.next(new Map(currentPerf));
      
      return this.info(
        `Operation completed: ${operationName}`,
        'PERFORMANCE',
        { duration, operationName }
      );
    }
    
    return this.warn(
      `Timing not found for operation: ${operationName}`,
      'PERFORMANCE'
    );
  }

  /**
   * Get logs by level
   */
  public getLogsByLevel(level: LogLevel): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs: LogEntry[]) => logs.filter(log => log.level === level))
    );
  }

  /**
   * Get logs by category
   */
  public getLogsByCategory(category: string): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs: LogEntry[]) => logs.filter(log => log.category === category))
    );
  }

  /**
   * Export logs for external analysis
   */
  public exportLogs(startDate?: Date, endDate?: Date): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs: LogEntry[]) => {
        if (!startDate && !endDate) return logs;
        
        return logs.filter(log => {
          const logTime = log.timestamp.getTime();
          const afterStart = !startDate || logTime >= startDate.getTime();
          const beforeEnd = !endDate || logTime <= endDate.getTime();
          return afterStart && beforeEnd;
        });
      })
    );
  }

  /**
   * Clear logs (retain audit logs)
   */
  public clearLogs(): void {
    this.logsSubject$.next([]);
    this.info('Logs cleared', 'SYSTEM');
  }

  /**
   * Core logging method (basic version for backward compatibility)
   */
  private logBasic(
    level: LogLevel,
    message: string,
    category: string,
    metadata?: Record<string, unknown>,
    operation?: string,
    stackTrace?: string
  ): Observable<LogEntry> {
    return this.log(level, message, category, metadata, operation, stackTrace);
  }

  private addToLogs(entry: LogEntry): void {
    const currentLogs = this.logsSubject$.value;
    // Keep only last 1000 entries for performance
    const newLogs = [...currentLogs, entry].slice(-1000);
    this.logsSubject$.next(newLogs);
    
    // Console output with color coding
    this.outputToConsole(entry);
  }

  private outputToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const prefix = `[${timestamp}] [${entry.level}] [${entry.category}]`;
    
    switch (entry.level) {
      case 'DEBUG':
        console.debug(prefix, entry.message, entry.metadata);
        break;
      case 'INFO':
        console.info(prefix, entry.message, entry.metadata);
        break;
      case 'WARN':
        console.warn(prefix, entry.message, entry.metadata);
        break;
      case 'ERROR':
      case 'FATAL':
        console.error(prefix, entry.message, entry.metadata, entry.stackTrace);
        break;
      case 'AUDIT':
        console.log('%c' + prefix, 'color: purple; font-weight: bold;', entry.message, entry.metadata);
        break;
    }
  }

  private generateId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getClientIP(): string {
    // In a real application, this would be provided by the backend
    return 'unknown';
  }

  /**
   * REAL-TIME ETA & COMPLETION TRACKING
   * Perfect for federal contracting accountability and transparency
   */

  /**
   * Start a tracked operation with ETA calculation
   */
  public startTrackedOperation(
    operationName: string,
    estimatedDurationMs: number,
    phase?: string,
    milestone?: string,
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const startTime = new Date();
    const eta = new Date(startTime.getTime() + estimatedDurationMs);
    
    const trackingMetadata = {
      ...metadata,
      startTime: startTime.toISOString(),
      estimatedDuration: estimatedDurationMs,
      operationType: 'START_TRACKED'
    };

    return this.log('INFO', `Starting tracked operation: ${operationName}`, 'TRACKING', trackingMetadata, operationName, undefined, eta, undefined, undefined, 0, phase, milestone);
  }

  /**
   * Update progress of a tracked operation
   */
  public updateProgress(
    operationName: string,
    progress: number,
    message?: string,
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const progressMetadata = {
      ...metadata,
      operationType: 'PROGRESS_UPDATE',
      progressPercentage: progress
    };

    const logMessage = message || `Progress update for ${operationName}: ${progress}%`;
    
    return this.log('INFO', logMessage, 'TRACKING', progressMetadata, operationName, undefined, undefined, undefined, undefined, progress);
  }

  /**
   * Complete a tracked operation with actual completion time and duration
   */
  public completeTrackedOperation(
    operationName: string,
    startTime: Date,
    success: boolean = true,
    actualResults?: string,
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const completedAt = new Date();
    const duration = completedAt.getTime() - startTime.getTime();
    
    const completionMetadata = {
      ...metadata,
      operationType: 'COMPLETION',
      success,
      actualResults,
      plannedVsActual: {
        duration: `${duration}ms`,
        completedAt: completedAt.toISOString()
      }
    };

    const logMessage = success 
      ? `✅ Successfully completed: ${operationName} (${duration}ms)`
      : `❌ Failed to complete: ${operationName} (${duration}ms)`;
    
    return this.log(success ? 'INFO' : 'ERROR', logMessage, 'TRACKING', completionMetadata, operationName, undefined, undefined, completedAt, duration, 100);
  }

  /**
   * Log phase completion (e.g., Phase 1 Foundation Complete)
   */
  public logPhaseCompletion(
    phaseName: string,
    startDate: Date,
    achievements: string[],
    nextPhase?: string,
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const completedAt = new Date();
    const duration = completedAt.getTime() - startDate.getTime();
    
    const phaseMetadata = {
      ...metadata,
      phaseType: 'COMPLETION',
      achievements,
      nextPhase,
      phaseDuration: `${Math.round(duration / (1000 * 60 * 60 * 24))} days`,
      completedAt: completedAt.toISOString()
    };

    return this.log('AUDIT', `🎯 PHASE COMPLETE: ${phaseName}`, 'PHASE_TRACKING', phaseMetadata, `PHASE_${phaseName.toUpperCase()}`, undefined, undefined, completedAt, duration, 100, phaseName);
  }

  /**
   * Enhanced log method with ETA and completion tracking
   */
  private log(
    level: LogLevel,
    message: string,
    category: string,
    metadata?: Record<string, unknown>,
    operation?: string,
    stackTrace?: string,
    eta?: Date,
    completedAt?: Date,
    duration?: number,
    progress?: number,
    phase?: string,
    milestone?: string
  ): Observable<LogEntry> {
    const entry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      level,
      message,
      category,
      metadata,
      operation,
      userId: this.userId,
      sessionId: this.sessionId,
      stackTrace,
      eta,
      completedAt,
      duration,
      progress,
      phase,
      milestone
    };

    this.addToLogs(entry);
    
    return new BehaviorSubject(entry).pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  public ngOnDestroy(): void {
    this.info('LoggingService shutting down', 'SYSTEM');
    this.destroy$.next();
    this.destroy$.complete();
  }
}