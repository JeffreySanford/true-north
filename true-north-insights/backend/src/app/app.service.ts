import { Injectable } from '@nestjs/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { shareReplay, auditTime } from 'rxjs/operators';

interface ApiData {
  message: string;
  timestamp: Date;
  requestCount: number;
}

@Injectable()
export class AppService {
  private requestCountSubject$ = new BehaviorSubject<number>(0);
  
  // Hot observable for tracking request count
  public requestCount$ = this.requestCountSubject$.pipe(
    auditTime(100),
    shareReplay(1)
  );

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

  // Example of hot observable data stream
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
