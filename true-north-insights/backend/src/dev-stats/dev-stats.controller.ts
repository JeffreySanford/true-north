import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DevStatsService } from './dev-stats.service';
import { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

interface DevStatsDto {
  runCount: number;
  lastRunAt: string | null;
  roles: string[];
  placeholder: string;
}

@Controller('dev-stats')
export class DevStatsController {
  constructor(private svc: DevStatsService) {}

  @Get()
  async getStats(
    @Req() req: Request & { user?: { roles?: string[] } }
  ): Promise<DevStatsDto> {
    const roles = req.user?.roles ?? [];
    return this.svc.getStats(roles);
  }

  // Secure developer/admin only metrics placeholder
  @Get('secure')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  async getSecure(
    @Req() req: Request & { user?: { roles?: string[] } }
  ): Promise<DevStatsDto & { secure: boolean }> {
    const roles = req.user?.roles ?? [];
    const base = await this.svc.getStats(roles);
    return { ...base, secure: true };
  }
}
