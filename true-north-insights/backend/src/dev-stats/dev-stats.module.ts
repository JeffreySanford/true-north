import { Module } from '@nestjs/common';
import { DevStatsController } from './dev-stats.controller';
import { DevStatsService } from './dev-stats.service';

@Module({
  imports: [],
  controllers: [DevStatsController],
  providers: [DevStatsService],
  exports: [DevStatsService],
})
export class DevStatsModule {}
