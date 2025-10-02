import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = testingModule.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return API data with message, timestamp, and request count', async () => {
      const result = await firstValueFrom(service.getData());
      
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('requestCount');
      expect(result.message).toContain('Hello Traditional Angular API');
      expect(result.requestCount).toBeGreaterThan(0);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should increment request count with each call', async () => {
      const firstCall = await firstValueFrom(service.getData());
      const secondCall = await firstValueFrom(service.getData());
      
      expect(secondCall.requestCount).toBe(firstCall.requestCount + 1);
    });
  });

  describe('getRealtimeData', () => {
    it('should emit realtime data with value and timestamp', (done) => {
      const subscription = service.getRealtimeData().subscribe({
        next: (data) => {
          expect(data).toHaveProperty('value');
          expect(data).toHaveProperty('timestamp');
          expect(typeof data.value).toBe('number');
          expect(data.timestamp).toBeInstanceOf(Date);
          subscription.unsubscribe();
          done();
        },
        error: done.fail
      });
    });
  });
});
