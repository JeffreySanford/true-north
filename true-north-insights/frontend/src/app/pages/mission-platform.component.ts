import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mission-platform',
  templateUrl: './mission-platform.html',
  styleUrls: ['./mission-platform.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MissionPlatformComponent {
  heroStats = [
    {
      label: 'Insight Velocity',
      value: 5,
      suffix: 'x',
      description: 'Faster cycle vs. legacy baselines (target)',
    },
    {
      label: 'Pilot Time-to-Value',
      value: 45,
      suffix: 'd',
      description: 'Target days to first success metric',
    },
    {
      label: 'Ramp Time Reduction',
      value: 20,
      suffix: '%',
      description: 'Veteran analyst ramp improvement goal',
    },
  ];
}
