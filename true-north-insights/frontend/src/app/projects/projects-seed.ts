export interface ProjectSeed {
  id: string;
  name: string;
  description: string;
  categories: string[];
  tasks: TaskSeed[];
  owner?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskSeed {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  startedAt?: string;
  completedAt?: string;
  impeededAt?: string;
  blockedBy?: string[];
  timeExpected?: number; // hours
  timeUsed?: number; // hours
  timeRemaining?: number; // hours
  showInfo?: boolean;
}

export const PROJECTS: ProjectSeed[] = [
  {
    id: 'true-north-insights',
    name: 'True North Insights',
    description: 'Veteran-led data intelligence dashboards and MD3 site.',
    categories: ['backlog', 'active', 'completed'],
    tasks: [
      {
        id: 'tni-20251004-ui',
        title: 'UI/Planning View Overhaul',
        description:
          'Kanban containers, impeded status, table selector, animated category tables, full width tables.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-04',
        completedAt: '2025-10-04',
        timeExpected: 8,
        timeUsed: 8,
        timeRemaining: 0,
      },
      {
        id: 'tni-backlog-1',
        title: 'Draft 1–3–5 Year Plan',
        description:
          'Outlined veteran hiring pipeline, Jamestown community partnerships, and cohort model.',
        category: 'backlog',
        status: 'impeded',
        startedAt: '2025-02-28',
        completedAt: '2025-03-05',
        impeededAt: '2025-10-04',
        blockedBy: ['tni-active-1', 'tni-active-2'],
        timeExpected: 10,
        timeUsed: 4,
        timeRemaining: 6,
      },
      {
        id: 'tni-backlog-2',
        title: 'MD3 Theme + Parallax Concept',
        description:
          'Defined patriotic red/white/blue MD3 aesthetic with layered parallax sections.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-11-02',
        completedAt: '2025-11-05',
        timeExpected: 6,
        timeUsed: 6,
        timeRemaining: 0,
      },
      {
        id: 'tni-backlog-3',
        title: 'Veteran Programs Landscape',
        description:
          'Mapped Elks/Lions/Masons/Sierra Club tie-ins and veteran-friendly partners for outreach docs.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-03',
        completedAt: '2025-10-03',
        timeExpected: 4,
        timeUsed: 4,
        timeRemaining: 0,
      },
      {
        id: 'tni-active-1',
        title: 'Define MVP Scope',
        description:
          'Lock minimal features: hero, cohorts page, intake form, metrics teaser.',
        category: 'active',
        status: 'active',
        startedAt: '2025-10-01',
        timeExpected: 12,
        timeUsed: 3,
        timeRemaining: 9,
      },
      {
        id: 'tni-active-2',
        title: 'Cohort Outreach Docs',
        description:
          'Produce Jamestown relocation + work-housing program one-pagers.',
        category: 'active',
        status: 'active',
        startedAt: '2025-10-03',
        timeExpected: 8,
        timeUsed: 2,
        timeRemaining: 6,
      },
      {
        id: 'tni-backlog-4',
        title: 'Publish Veteran Cohort Portal',
        description: 'MD3 portal with mentor matching and onboarding steps.',
        category: 'backlog',
        status: 'backlog',
        startedAt: '2025-10-15',
        timeExpected: 10,
        timeUsed: 0,
        timeRemaining: 10,
      },
      {
        id: 'tni-backlog-5',
        title: 'Integrate AI Writing Tool',
        description:
          'Embed AI-assisted editor for proposals and case studies (Angular 19/MD3).',
        category: 'backlog',
        status: 'backlog',
        startedAt: '2025-11-01',
        timeExpected: 6,
        timeUsed: 0,
        timeRemaining: 6,
      },
    ],
    owner: 'JeffreySanford',
    tags: ['analytics', 'veteran', 'dashboard', 'patriotic'],
    createdAt: '2025-02-01',
    updatedAt: '2025-10-04',
  },
  {
    id: 'forge-board',
    name: 'ForgeBoard',
    description:
      'Real-time Kanban and metrics dashboard using RxJS hots and WebSockets.',
    categories: [
      'past',
      'present',
      'future',
      'metrics',
      'security',
      'performance',
    ],
    tasks: [
      {
        id: 'tni-20251004-ui',
        title: 'UI/Planning View Overhaul',
        description:
          'Kanban containers, impeded status, table selector, animated category tables, full width tables.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-04',
        completedAt: '2025-10-04',
        timeExpected: 8,
        timeUsed: 8,
        timeRemaining: 0,
      },
      {
        id: 'fb-past-1',
        title: 'Logger Gateway Plan',
        description:
          'Planned centralized WebSocket logger with DTO-based in-memory storage.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-04-09',
        completedAt: '2025-04-11',
      },
      {
        id: 'fb-past-2',
        title: 'Metrics Tile Spec',
        description:
          'Specified refresh slider and sparkline for CPU/network spikes.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-04-20',
        completedAt: '2025-04-20',
      },
      {
        id: 'fb-present-1',
        title: 'Implement WebSocket Logger',
        description:
          'Gateway streams auth, connection, and route logs to MD3 console view.',
        category: 'present',
        status: 'active',
        startedAt: '2025-10-02',
      },
      {
        id: 'fb-present-2',
        title: 'Kanban (SAFe Layering)',
        description:
          'DTO-driven board with initiatives/epics/traits for stakeholders.',
        category: 'present',
        status: 'active',
        startedAt: '2025-04-20',
      },
      {
        id: 'fb-future-1',
        title: 'Security Dashboard (FedRAMP 20x)',
        description: 'Integrate SCA/SBOM readings and risk heatmap cards.',
        category: 'future',
        status: 'planned',
        startedAt: '2025-11-05',
      },
    ],
    owner: 'JeffreySanford',
    tags: ['kanban', 'metrics', 'websocket', 'safe-agile', 'fedramp'],
    createdAt: '2025-04-09',
    updatedAt: '2025-10-04',
  },
  {
    id: 'buffalo-city-popcorn',
    name: 'Buffalo City Popcorn',
    description: 'Local ERP-style dashboard with RBAC and real-time logging.',
    categories: [
      'past',
      'present',
      'future',
      'rbac',
      'planning',
      'supply-chain',
    ],
    tasks: [
      {
        id: 'bcp-20251004-ui',
        title: 'UI/Planning View Overhaul',
        description:
          'Kanban containers, impeded status, table selector, animated category tables, full width tables.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-04',
        completedAt: '2025-10-04',
      },
      {
        id: 'bcp-past-1',
        title: 'RBAC Gateway Architecture',
        description:
          'Outlined roles, WebSocket auth handshake, and logger DTOs.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-04-18',
        completedAt: '2025-04-20',
      },
      {
        id: 'bcp-past-2',
        title: 'Kanban Service Plan',
        description:
          'Committed to in-memory DTO-driven Kanban as long-term layer.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-04-20',
        completedAt: '2025-04-20',
      },
      {
        id: 'bcp-present-1',
        title: 'Implement Auth Handshake',
        description:
          'JWT after initial WS connect; retry policy with 5 attempts.',
        category: 'present',
        status: 'active',
        startedAt: '2025-10-01',
      },
      {
        id: 'bcp-future-1',
        title: 'Supply Chain Tiles',
        description:
          'Tiles for label printing, picking, fulfillment, shipping with live status.',
        category: 'future',
        status: 'planned',
        startedAt: '2025-11-18',
      },
    ],
    owner: 'JeffreySanford',
    tags: ['rbac', 'logger', 'supply-chain', 'dto'],
    createdAt: '2025-04-18',
    updatedAt: '2025-10-04',
  },
  {
    id: 'craft-fusion',
    name: 'Craft Fusion',
    description:
      'Master NX monorepo: Angular 20, NestJS, Go, Rust, and AI services.',
    categories: ['past', 'present', 'future', 'devops', 'ai', 'architecture'],
    tasks: [
      {
        id: 'cf-20251004-ui',
        title: 'UI/Planning View Overhaul',
        description:
          'Kanban containers, impeded status, table selector, animated category tables, full width tables.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-04',
        completedAt: '2025-10-04',
      },
      {
        id: 'cf-past-1',
        title: 'Workspace Stabilization',
        description:
          'Resolved Angular + NX + Material + Nest dependency issues and presets.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-04-06',
        completedAt: '2025-04-07',
      },
      {
        id: 'cf-past-2',
        title: 'Deploy Scripts & System Prep',
        description:
          'Initial deploy-all.sh/system-prep.sh; fixed DO server path issue.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-09-13',
        completedAt: '2025-09-14',
      },
      {
        id: 'cf-present-1',
        title: 'craft-nest-ai App Scaffolding',
        description:
          'Add NestJS AI service for editor assistance and dataset formatting.',
        category: 'present',
        status: 'active',
        startedAt: '2025-10-04',
      },
      {
        id: 'cf-future-1',
        title: 'PM2 Ecosystem',
        description:
          'Process manager config for FE/BE with graceful reloads and logs.',
        category: 'future',
        status: 'planned',
        startedAt: '2025-10-20',
      },
    ],
    owner: 'JeffreySanford',
    tags: ['nx', 'angular', 'nest', 'go', 'rust', 'pm2'],
    createdAt: '2025-04-06',
    updatedAt: '2025-10-04',
  },
  {
    id: 'sumerian-research',
    name: 'Sumerian Research',
    description:
      'ETCSL/CDLI cross-referencing, translations, and book manuscript.',
    categories: ['past', 'present', 'future', 'writing', 'translation', 'ai'],
    tasks: [
      {
        id: 'sr-20251004-ui',
        title: 'UI/Planning View Overhaul',
        description:
          'Kanban containers, impeded status, table selector, animated category tables, full width tables.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-04',
        completedAt: '2025-10-04',
      },
      {
        id: 'sr-past-1',
        title: 'ETCSL Review + Notes',
        description: 'Indexed major Anuna/Anunnaki stories; refreshed notes.',
        category: 'past',
        status: 'completed',
        startedAt: '2024-10-22',
        completedAt: '2024-10-24',
      },
      {
        id: 'sr-past-2',
        title: 'Dataset Planning',
        description:
          'Planned JSONL training sets for mythology, Kabbalah, and law.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-01-29',
        completedAt: '2025-02-02',
      },
      {
        id: 'sr-present-1',
        title: 'Chapter Drafts (Inanna/Enki)',
        description: 'Drafting chapters and aligning with tablet references.',
        category: 'present',
        status: 'active',
        startedAt: '2025-10-01',
      },
      {
        id: 'sr-future-1',
        title: 'CDLI Cross-Refs',
        description: 'Link ETCSL excerpts to CDLI tablet IDs and images.',
        category: 'future',
        status: 'planned',
        startedAt: '2025-11-12',
      },
    ],
    owner: 'JeffreySanford',
    tags: ['etcsL', 'cdli', 'mythology', 'writing'],
    createdAt: '2024-10-22',
    updatedAt: '2025-10-04',
  },
  {
    id: 'nebula-forge',
    name: 'Nebula Forge / Star Chart',
    description:
      'GPU cluster for AI fine-tuning, LoRA training, and graph-theoretic visualizations.',
    categories: ['past', 'present', 'future', 'gpu', 'ai', 'graph-theory'],
    tasks: [
      {
        id: 'nf-20251004-ui',
        title: 'UI/Planning View Overhaul',
        description:
          'Kanban containers, impeded status, table selector, animated category tables, full width tables.',
        category: 'completed',
        status: 'completed',
        startedAt: '2025-10-04',
        completedAt: '2025-10-04',
      },
      {
        id: 'nf-past-1',
        title: 'LoRA Setup & Model Selector',
        description:
          'Built LoRA pipeline; model switcher wired to DeepSeek and others.',
        category: 'past',
        status: 'completed',
        startedAt: '2025-01-29',
        completedAt: '2025-02-06',
      },
      {
        id: 'nf-present-1',
        title: 'GPU Node Config',
        description:
          'Finalize compute node baseline images and storage planning.',
        category: 'present',
        status: 'active',
        startedAt: '2025-09-30',
      },
      {
        id: 'nf-future-1',
        title: 'D3 Graph View',
        description: 'Graph theory demo with dataset toggles and legends.',
        category: 'future',
        status: 'planned',
        startedAt: '2025-11-22',
      },
    ],
    owner: 'JeffreySanford',
    tags: ['gpu', 'lora', 'd3', 'graph'],
    createdAt: '2025-01-29',
    updatedAt: '2025-10-04',
  },
];
