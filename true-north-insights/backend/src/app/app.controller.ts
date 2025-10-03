import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

interface ApiData {
  message: string;
  timestamp: Date;
  requestCount: number;
}

/**
 * @description Main application controller providing core API endpoints for True North Insights with federal compliance
 * @author Development Team
 * @since 2025-10-02
 */
@ApiTags('root')
@Controller()
export class AppController {
  /**
   * @description Constructor for AppController - initializes the controller with required services
   * @param {AppService} appService - The injected application service for handling business logic
   * @author True North Development Team
   * @since October 2, 2025
   */
  constructor(private readonly appService: AppService) {}

  /**
   * @description Get main application data with message, timestamp and request count
   * @returns {Observable<ApiData>} Observable containing application data
   */
  @Get()
  @ApiOperation({ summary: 'Get main application data' })
  @ApiOkResponse({
    description: 'Application greeting with timestamp and request count',
  })
  getData(): Observable<ApiData> {
    // Return observable instead of direct data
    return this.appService.getData();
  }

  /**
   * @description Get real-time data stream with current value and timestamp
   * @returns {Observable<{value: number; timestamp: Date}>} Observable containing real-time data
   */
  @Get('realtime')
  @ApiOperation({ summary: 'Get realtime data emission (demo)' })
  getRealtimeData(): Observable<{ value: number; timestamp: Date }> {
    return this.appService.getRealtimeData();
  }

  /**
   * @description Get application statistics including total request count
   * @returns {Observable<{requestCount: number}>} Observable containing statistics data
   */
  @Get('stats')
  @ApiOperation({ summary: 'Get application statistics' })
  @ApiOkResponse({ description: 'Current request count total' })
  getStats(): Observable<{ requestCount: number }> {
    return this.appService.requestCount$.pipe(
      map((count: number) => ({ requestCount: count }))
    );
  }
}
