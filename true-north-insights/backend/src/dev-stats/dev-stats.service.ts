import { Injectable } from '@nestjs/common';

interface InternalStatsState {
  runCount: number;
  lastRunAt: string | null;
}

@Injectable()
export class DevStatsService {
  private state: InternalStatsState = { runCount: 0, lastRunAt: null };

  increment(runAt: Date = new Date()) {
    this.state.runCount += 1;
    this.state.lastRunAt = runAt.toISOString();
  }

  async getStats(userRoles: string[]) {
    return {
      runCount: this.state.runCount,
      lastRunAt: this.state.lastRunAt,
      roles: userRoles,
      placeholder: 'Projection + quality metrics will appear here.',
    };
  }
}
