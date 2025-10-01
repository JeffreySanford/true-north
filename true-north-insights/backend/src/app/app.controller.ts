import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

interface ApiData {
  message: string;
  timestamp: Date;
  requestCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Observable<ApiData> {
    // Return observable instead of direct data
    return this.appService.getData();
  }

  @Get('realtime')
  getRealtimeData(): Observable<{ value: number; timestamp: Date }> {
    return this.appService.getRealtimeData();
  }

  @Get('stats')
  getStats(): Observable<{ requestCount: number }> {
    return this.appService.requestCount$.pipe(
      map((count: number) => ({ requestCount: count }))
    );
  }
}
