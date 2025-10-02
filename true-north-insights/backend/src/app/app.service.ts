import { Injectable } from '@nestjs/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { shareReplay, auditTime } from 'rxjs/operators';

interface ApiData {
  message: string;
  timestamp: Date;
  requestCount: number;
}

/**
 * @description Core application service providing data operations and real-time streams with federal compliance
 * @author Development Team
 * @since 2025-10-02
 */
@Injectable()
export class AppService {
  private readonly destroy$ = new BehaviorSubject<boolean>(false);
  private requestCountSubject$ = new BehaviorSubject<number>(0);
  
  // Hot observable for tracking request count
  public requestCount$ = this.requestCountSubject$.pipe(
    auditTime(100),
    shareReplay(1)
  );

  /**
   * @description Get main application data with incremented request count
   * @returns {Observable<ApiData>} Observable containing message, timestamp and request count
   */
  getData(): Observable<ApiData> {
    // Increment request count
    const currentCount = this.requestCountSubject$.value + 1;
    this.requestCountSubject$.next(currentCount);

    // Return observable data instead of direct object
    return of({
      message: 'Hello Traditional Angular API with RxJS Observables',
      timestamp: new Date(),
      requestCount: currentCount
    }).pipe(
      shareReplay(1)
    );
  }

  /**
   * @description Get real-time data stream with random values and timestamps
   * @returns {Observable<{value: number; timestamp: Date}>} Observable containing real-time data stream
   */
  getRealtimeData(): Observable<{ value: number; timestamp: Date }> {
    return new Observable<{ value: number; timestamp: Date }>(subscriber => {
      const interval = setInterval(() => {
        subscriber.next({
          value: Math.random() * 100,
          timestamp: new Date()
        });
      }, 1000);

      return () => clearInterval(interval);
    }).pipe(
      shareReplay(1)
    );
  }
}
