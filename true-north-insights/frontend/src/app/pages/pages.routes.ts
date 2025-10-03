import { Route } from '@angular/router';

export const pagesRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'mission' },
  {
    path: 'mission',
    loadChildren: () =>
      import('./mission-platform.module').then((m) => m.MissionPlatformModule),
    data: { title: 'Mission & Platform' },
  },
  {
    path: 'capabilities',
    loadChildren: () =>
      import('./capabilities-architecture.module').then(
        (m) => m.CapabilitiesArchitectureModule
      ),
    data: { title: 'Capabilities & Architecture' },
  },
  {
    path: 'readiness',
    loadChildren: () =>
      import('./federal-readiness.module').then(
        (m) => m.FederalReadinessModule
      ),
    data: { title: 'Federal Readiness & Compliance' },
  },
  {
    path: 'talent',
    loadChildren: () =>
      import('./veteran-talent.module').then((m) => m.VeteranTalentModule),
    data: { title: 'Veteran Talent & Impact' },
  },
  {
    path: 'engagement',
    loadChildren: () =>
      import('./engagement-funnel.module').then(
        (m) => m.EngagementFunnelModule
      ),
    data: { title: 'Engagement & Funnel' },
  },
  {
    path: 'briefing',
    loadChildren: () =>
      import('./contact-briefing.module').then((m) => m.ContactBriefingModule),
    data: { title: 'Contact & Briefing Request' },
  },
  {
    path: 'home',
    loadChildren: () => import('./home.module').then((m) => m.HomeModule),
    data: { title: 'Home' },
  },
  {
    path: 'about',
    loadChildren: () => import('./about.module').then((m) => m.AboutModule),
    data: { title: 'About' },
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./services.module').then((m) => m.ServicesModule),
    data: { title: 'Services' },
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('../projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact.module').then((m) => m.ContactModule),
    data: { title: 'Contact' },
  },
  {
    path: 'development',
    loadChildren: () =>
      import('./development.module').then((m) => m.DevelopmentModule),
    data: { title: 'Development' },
  },
];
