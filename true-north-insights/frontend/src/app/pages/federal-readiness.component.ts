import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-federal-readiness',
  templateUrl: './federal-readiness.html',
  styleUrls: ['./federal-readiness.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FederalReadinessComponent {
  codes = [
    {
      label: 'SDVOSB',
      desc: 'Service-Disabled Veteran-Owned Small Business posture',
    },
    { label: 'NAICS 541519', desc: 'Other Computer Related Services' },
    { label: 'NAICS 541611', desc: 'Admin & General Management Consulting' },
  ];
  differentiators = [
    'Dual persistence + lineage instrumentation',
    'Mission-aligned veteran analytics pipeline',
    'Contract-ready pilot acceleration playbook',
  ];
}
