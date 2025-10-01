import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getData', () => {
    it('should return API data observable from service', async () => {
      const result = await firstValueFrom(appController.getData());
      
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('requestCount');
      expect(result.message).toContain('Hello Traditional Angular API');
      expect(result.requestCount).toBeGreaterThan(0);
    });
  });

  describe('getRealtimeData', () => {
    it('should return realtime data observable from service', (done) => {
      const subscription = appController.getRealtimeData().subscribe({
        next: (data) => {
          expect(data).toHaveProperty('value');
          expect(data).toHaveProperty('timestamp');
          expect(typeof data.value).toBe('number');
          subscription.unsubscribe();
          done();
        },
        error: done.fail
      });
    });
  });
});
