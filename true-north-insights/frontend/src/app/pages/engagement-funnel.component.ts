import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-engagement-funnel',
  templateUrl: './engagement-funnel.html',
  styleUrls: ['./engagement-funnel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EngagementFunnelComponent {
  funnel = [
    { stage: 'Awareness', kpi: 'Content CTR', target: '↑ 12%' },
    { stage: 'Engaged Lead', kpi: 'Discovery Scheduled Rate', target: '↑ 40%' },
    { stage: 'Qualified Opportunity', kpi: 'Positioned %', target: '↑ 60%' },
    { stage: 'Positioned Opportunity', kpi: 'Pilot Conversion', target: '↑ 35%' },
    { stage: 'Pilot / Evaluation', kpi: 'Award Rate', target: '↑ 55%' },
    { stage: 'Award / Expansion', kpi: 'Expansion 6mo', target: '↑ 30%' },
  ];
  cadence = [
    { day: 'Mon', action: 'Program Exec Reach-outs', metric: 'Replies ≥30%' },
    { day: 'Tue', action: 'Prime Introductions', metric: 'Meetings booked' },
    { day: 'Wed', action: 'Talent Cohort Touch', metric: 'Click-through' },
    { day: 'Thu', action: 'Capability Briefing / Demo', metric: 'Stage advancement' },
    { day: 'Fri', action: 'Metrics Review + Atomization', metric: 'Derived assets count' },
  ];
}
