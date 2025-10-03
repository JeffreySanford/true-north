import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { DevStatsModule } from '../dev-stats/dev-stats.module';

/**
 * @description Root application module for True North Insights backend services
 * @author True North Development Team
 * @since October 2, 2025
 */
@Module({
  imports: [AuthModule, DevStatsModule],
  controllers: [AppController],
  providers: [AppService],
})
/**
 * @description Root application module for True North Insights backend services with federal compliance
 * @author Development Team
 * @since 2025-10-02
 */
export class AppModule {}
