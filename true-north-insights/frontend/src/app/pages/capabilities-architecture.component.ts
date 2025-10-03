import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-capabilities-architecture',
  templateUrl: './capabilities-architecture.html',
  styleUrls: ['./capabilities-architecture.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CapabilitiesArchitectureComponent {
  capabilities = [
    {
      name: 'Dual Persistence Layer',
      pillars: ['Secure & Transparent', 'Insight Velocity'],
      maturity: 'Alpha',
    },
    {
      name: 'Transformation Lineage Graph',
      pillars: ['Traceable Outcomes', 'Secure & Transparent'],
      maturity: 'Prototype',
    },
    {
      name: 'Contract-First API Surface',
      pillars: ['Insight Velocity', 'Contract-Ready'],
      maturity: 'Alpha',
    },
    {
      name: 'Analytics Template Pack',
      pillars: ['Insight Velocity', 'Traceable Outcomes'],
      maturity: 'Concept',
    },
    {
      name: 'Security Control Matrix',
      pillars: ['Secure & Transparent'],
      maturity: 'Draft',
    },
    {
      name: 'Pilot Success Instrumentation',
      pillars: ['Traceable Outcomes', 'Contract-Ready'],
      maturity: 'Concept',
    },
    {
      name: 'Veteran Cohort Academy Integration',
      pillars: ['Veteran Talent Flywheel'],
      maturity: 'Draft',
    },
  ];
}
