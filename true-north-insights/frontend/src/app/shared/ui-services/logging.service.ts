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
      userAgent: navigator.userAgent
    });
  }

  /**
   * @description Set user context for all future logs
   * @param {string} userId - The unique identifier for the authenticated user
   * @returns {void} No return value
   */
  public setUserContext(userId: string): void {
    this.userId = userId;
    this.info('User context set', 'AUTH', { userId });
  }

  /**
   * @description Clear user context (logout) and remove user tracking from future logs
   * @returns {void} No return value
   */
  public clearUserContext(): void {
    const previousUserId = this.userId;
    this.userId = undefined;
    this.info('User context cleared', 'AUTH', { previousUserId });
  }

  /**
   * @description Debug level logging for development and troubleshooting
   * @param {string} message - The debug message to log
   * @param {string} category - Log category for filtering (defaults to 'GENERAL')
   * @param {Record<string, unknown>} metadata - Additional metadata for the log entry
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   */
  public debug(message: string, category = 'GENERAL', metadata?: Record<string, unknown>): Observable<LogEntry> {
    return this.logBasic('DEBUG', message, category, metadata);
  }

  /**
   * @description Info level logging - general information
   * @param {string} message - The info message to log
   * @param {string} [category] - Log category for filtering (defaults to 'GENERAL')
   * @param {Record<string, unknown>} [metadata] - Additional metadata for the log entry
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   */
  public info(message: string, category = 'GENERAL', metadata?: Record<string, unknown>): Observable<LogEntry> {
    return this.logBasic('INFO', message, category, metadata);
  }

  /**
   * @description Warning level logging - potential issues
   * @param {string} message - The warning message to log
   * @param {string} [category] - Log category for filtering (defaults to 'GENERAL')
   * @param {Record<string, unknown>} [metadata] - Additional metadata for the log entry
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   */
  public warn(message: string, category = 'GENERAL', metadata?: Record<string, unknown>): Observable<LogEntry> {
    return this.logBasic('WARN', message, category, metadata);
  }

  /**
   * @description Error level logging - errors and exceptions
   * @param {string} message - The error message to log
   * @param {string} [category] - Log category for filtering (defaults to 'GENERAL')
   * @param {Error} [error] - Optional Error object for additional details
   * @param {Record<string, unknown>} [metadata] - Additional metadata for the log entry
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   */
  public error(message: string, category = 'GENERAL', error?: Error, metadata?: Record<string, unknown>): Observable<LogEntry> {
    const errorMetadata = {
      ...metadata,
      error: error ? error.message : undefined,
      stack: error ? error.stack : undefined
    };
    
    return this.logBasic('ERROR', message, category, errorMetadata, undefined, error ? error.stack : undefined);
  }

  /**
   * @description Fatal level logging - critical system failures
   * @param {string} message - The fatal error message to log
   * @param {string} [category] - Log category for filtering (defaults to 'SYSTEM')
   * @param {Error} [error] - Optional Error object for additional details
   * @param {Record<string, unknown>} [metadata] - Additional metadata for the log entry
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   */
  public fatal(message: string, category = 'SYSTEM', error?: Error, metadata?: Record<string, unknown>): Observable<LogEntry> {
    const fatalMetadata = {
      ...metadata,
      error: error ? error.message : undefined,
      stack: error ? error.stack : undefined,
      critical: true
    };
    
    return this.logBasic('FATAL', message, category, fatalMetadata, undefined, error ? error.stack : undefined);
  }

  /**
   * @description Step-by-step operation logging for tracking multi-step processes
   * @param {string} operationName - The name of the operation being tracked
   * @param {number} stepNumber - The current step number
   * @param {number} totalSteps - The total number of steps in the operation
   * @param {string} stepDescription - Description of the current step
   * @param {Record<string, unknown>} [metadata] - Additional metadata for the log entry
   * @returns {Observable<LogEntry>} Observable containing the created log entry
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
   * @description Database operation logging for CRUD operations with audit trail
   * @param {string} operation - The database operation type (CREATE, READ, UPDATE, DELETE)
   * @param {string} entity - The database entity or table being operated on
   * @param {string} status - The operation status (START, SUCCESS, ERROR)
   * @param {Record<string, unknown>} [metadata] - Additional metadata for the database operation
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   * @since October 2, 2025
   * @lastModified October 2, 2025
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
   * @description Authentication flow logging for security audit trail
   * @param {string} action - The authentication action (LOGIN, LOGOUT, MFA, REFRESH)
   * @param {string} status - The operation status (START, SUCCESS, FAILURE)
   * @param {Record<string, unknown>} [metadata] - Additional security-related metadata
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   * @since October 2, 2025
   * @lastModified October 2, 2025
   * @federalCompliance Required for security audit trails
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
   * @description Audit logging for compliance and security with comprehensive tracking of resource changes
   * @param {string} action - The action being performed (CREATE, UPDATE, DELETE, ACCESS, etc.)
   * @param {string} resource - The resource being acted upon (user, document, configuration, etc.)
   * @param {unknown} previousValue - Optional previous value before the change
   * @param {unknown} newValue - Optional new value after the change
   * @param {Record<string, unknown>} metadata - Optional additional metadata for the audit entry
   * @returns {Observable<AuditEntry>} Observable containing the created audit entry
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for audit trail documentation
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
   * @description Performance timing - start tracking an operation for performance monitoring
   * @param {string} operationName - The unique name of the operation being timed
   * @returns {void} No return value
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for performance monitoring documentation
   */
  public startTiming(operationName: string): void {
    const currentPerf = this.performanceSubject$.value;
    currentPerf.set(`${operationName}_start`, Date.now());
    this.performanceSubject$.next(new Map(currentPerf));
    
    this.debug(`Started timing: ${operationName}`, 'PERFORMANCE');
  }

  /**
   * @description Performance timing - end tracking and log duration for comprehensive performance analysis
   * @param {string} operationName - The unique name of the operation being timed (must match startTiming call)
   * @returns {Observable<LogEntry>} Observable containing the performance log entry with duration metrics
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for performance monitoring documentation
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
   * @description Get logs filtered by specific severity level for targeted log analysis
   * @param {LogLevel} level - The log level to filter by (DEBUG, INFO, WARN, ERROR, FATAL)
   * @returns {Observable<LogEntry[]>} Observable array of log entries matching the specified level
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for log filtering documentation
   */
  public getLogsByLevel(level: LogLevel): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs: LogEntry[]) => logs.filter(log => log.level === level))
    );
  }

  /**
   * @description Get logs filtered by specific category for targeted operational analysis
   * @param {string} category - The log category to filter by (GENERAL, AUTH, PERFORMANCE, SYSTEM, etc.)
   * @returns {Observable<LogEntry[]>} Observable array of log entries matching the specified category
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for log categorization documentation
   */
  public getLogsByCategory(category: string): Observable<LogEntry[]> {
    return this.logs$.pipe(
      map((logs: LogEntry[]) => logs.filter(log => log.category === category))
    );
  }

  /**
   * @description Export logs for external analysis and compliance reporting with optional date range filtering
   * @param {Date} startDate - Optional start date for log filtering (inclusive)
   * @param {Date} endDate - Optional end date for log filtering (inclusive)
   * @returns {Observable<LogEntry[]>} Observable array of log entries within the specified date range
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for log export and audit documentation
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
   * @description Clear logs for maintenance purposes while retaining audit logs for compliance
   * @returns {void} No return value
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for log maintenance documentation
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
   * @description Start a tracked operation with ETA calculation and comprehensive performance monitoring
   * @param {string} operationName - The unique name of the operation being tracked
   * @param {number} estimatedDurationMs - Expected duration in milliseconds for completion time estimation
   * @param {string} phase - Optional phase identifier for multi-phase operations
   * @param {string} milestone - Optional milestone marker for progress tracking
   * @param {Record<string, unknown>} metadata - Optional additional metadata for the tracked operation
   * @returns {Observable<LogEntry>} Observable containing the operation start log entry
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for operation tracking documentation
   */
  public startTrackedOperation(
    operationName: string,
    estimatedDurationMs: number,
    phase?: string,
    milestone?: string,
    metadata?: Record<string, unknown>
  ): Observable<LogEntry> {
    const startTime = new Date();
    const estimatedCompletionTime = new Date(startTime.getTime() + estimatedDurationMs);
    
    const trackingMetadata = {
      ...metadata,
      startTime: startTime.toISOString(),
      estimatedDuration: estimatedDurationMs,
      operationType: 'START_TRACKED'
    };

    return this.log('INFO', `Starting tracked operation: ${operationName}`, 'TRACKING', trackingMetadata, operationName, undefined, estimatedCompletionTime, undefined, undefined, 0, phase, milestone);
  }

  /**
   * @description Update progress of a tracked operation with percentage completion and status messaging
   * @param {string} operationName - The unique name of the operation being tracked
   * @param {number} progress - Progress percentage (0-100) indicating completion status
   * @param {string} message - Optional progress message for detailed status reporting
   * @param {Record<string, unknown>} metadata - Optional additional metadata for the progress update
   * @returns {Observable<LogEntry>} Observable containing the progress update log entry
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for progress tracking documentation
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
   * @description Complete a tracked operation with actual completion time and duration analysis for performance metrics
   * @param {string} operationName - The unique name of the operation being completed
   * @param {Date} startTime - The original start time of the operation for duration calculation
   * @param {boolean} success - Whether the operation completed successfully (default: true)
   * @param {string} actualResults - Optional description of the actual operation results
   * @param {Record<string, unknown>} metadata - Optional additional metadata for the completion record
   * @returns {Observable<LogEntry>} Observable containing the operation completion log entry
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for operation completion documentation
   */
  public completeTrackedOperation(
    operationName: string,
    startTime: Date,
    success = true,
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
   * @description Log phase completion with achievements tracking and next phase preparation for project milestone documentation
   * @param {string} phaseName - The name of the completed phase (e.g., "Phase 1 Foundation")
   * @param {Date} startDate - The original start date of the phase for duration calculation
   * @param {string[]} achievements - Array of key achievements accomplished in this phase
   * @param {string} nextPhase - Optional name of the next phase to be started
   * @param {Record<string, unknown>} metadata - Optional additional metadata for the phase completion
   * @returns {Observable<LogEntry>} Observable containing the phase completion log entry
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for phase milestone documentation
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
   * @description Enhanced log method with ETA and completion tracking for comprehensive audit trail creation
   * @param {LogLevel} level - The severity level of the log entry (DEBUG, INFO, WARN, ERROR, FATAL)
   * @param {string} message - The log message content
   * @param {string} category - The category classification for the log entry
   * @param {Record<string, unknown>} metadata - Optional additional metadata for the log entry
   * @param {string} operation - Optional operation identifier for tracking
   * @param {string} stackTrace - Optional stack trace for error logging
   * @param {Date} eta - Optional estimated time of arrival for completion
   * @param {Date} completedAt - Optional completion timestamp for finished operations
   * @param {number} duration - Optional operation duration in milliseconds
   * @param {number} progress - Optional progress percentage (0-100)
   * @param {string} phase - Optional phase identifier for multi-phase operations
   * @param {string} milestone - Optional milestone marker for progress tracking
   * @returns {Observable<LogEntry>} Observable containing the created log entry
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for comprehensive logging documentation
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

  /**
   * @description Angular lifecycle hook for component destruction - performs cleanup and resource deallocation
   * @returns {void} No return value
   * @author Development Team
   * @since 2025-10-02
   * @lastModified 2025-10-02
   * @federalCompliance Meets federal contracting standards for lifecycle management documentation
   */
  public ngOnDestroy(): void {
    this.info('LoggingService shutting down', 'SYSTEM');
    this.destroy$.next();
    this.destroy$.complete();
  }
}