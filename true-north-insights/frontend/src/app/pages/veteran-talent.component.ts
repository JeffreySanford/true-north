import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-veteran-talent',
  templateUrl: './veteran-talent.html',
  styleUrls: ['./veteran-talent.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VeteranTalentComponent {
  lifecycle = [
    'Recruit',
    'Assess',
    'Onboard',
    'Core Curriculum',
    'Applied Project',
    'Deployment',
    'Advancement',
  ];
  metrics = [
    { label: 'Ramp Time Target', value: 24, suffix: 'd' },
    { label: 'Completion Target', value: 92, suffix: '%' },
    { label: 'Promotion Target', value: 25, suffix: '%' },
  ];
}
