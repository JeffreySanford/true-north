# True North Insights - Nx Monorepo Scaffolding Plan

## 🏗️ Architecture Overview

Following the documentation requirements for a legendary, professional, and strongly-typed full-stack application.

### Target Structure

``` pseudo
true-north-insights/                 # Root workspace
├── apps/
│   ├── frontend/                   # Angular 20 + Material 3
│   ├── backend/                    # NestJS 11 API
│   └── frontend-e2e/              # Playwright E2E tests
├── libs/
│   ├── shared/
│   │   ├── api-interfaces/         # DTOs, contracts, types
│   │   ├── ui/                     # Material 3 components
│   │   └── util/                   # RxJS operators, guards, helpers
│   ├── frontend/
│   │   ├── feature-auth/          # Authentication features
│   │   ├── feature-dashboard/     # Dashboard with audit logs
│   │   ├── feature-public/        # Public pages
│   │   └── animations/            # Preserved animation components
│   └── backend/
│       ├── data/                  # Repository implementations (Mongo + SQL)
│       ├── security/              # Auth, RBAC, crypto
│       └── core/                  # Business logic, services
├── tools/
│   ├── generators/                # Custom Nx generators
│   └── scripts/                   # Build and deployment scripts
├── docs/                          # Project documentation
└── archive/                       # Preserved old implementation
```

## 🎯 Technology Stack

### Frontend (Angular 20)

- **Framework:** Angular 20.0+ (released May 2025)
- **UI Library:** Angular Material 17+ with Material 3 design
- **State Management:** Angular Signals (modern reactive approach)
- **Testing:** Jest + Cypress/Playwright
- **Build:** Vite (for faster builds)
- **Features:**
  - Zoneless change detection (performance boost)
  - Control flow (@if, @for instead of *ngIf,*ngFor)
  - Signal-based forms (experimental)
  - Vitest support (experimental)

### Backend (NestJS 11)

- **Framework:** NestJS 11+ (latest with better logging)
- **API Types:** GraphQL + REST + WebSocket
- **Database:** Dual persistence (MongoDB + PostgreSQL)
- **Authentication:** JWT + MFA
- **Authorization:** RBAC with guards
- **Testing:** Jest + contract testing
- **Features:**
  - Better logging capabilities
  - Flexible microservices support
  - Faster application startup

### Infrastructure & Tooling

- **Monorepo:** Nx 21.2+ (supports Angular 20 + NestJS 11)
- **Node.js:** v20.19+ (v18 no longer supported)
- **Package Manager:** npm (consistent with current setup)
- **CI/CD:** GitHub Actions (from documentation requirements)
- **Testing:** Jest, Playwright, contract testing
- **Security:** SonarQube, SBOM generation

## 🚀 Implementation Plan

### Phase 1: Foundation Setup

1. Create Nx workspace with Angular 20 + NestJS 11
2. Configure TypeScript paths and module boundaries
3. Set up ESLint + Prettier with strict rules
4. Configure Jest for unit testing
5. Set up Playwright for E2E testing

### Phase 2: Core Applications

1. Generate Angular frontend app with Material 3
2. Generate NestJS backend app with GraphQL
3. Create shared API interfaces library
4. Set up basic routing and navigation
5. Implement authentication scaffolding

### Phase 3: Feature Libraries

1. Create authentication feature library
2. Set up public pages feature library
3. Implement dashboard feature library
4. Port and modernize preserved animations
5. Create UI component library

### Phase 4: Backend Services

1. Set up dual persistence (MongoDB + SQL)
2. Implement repository pattern with TypeORM + Mongoose
3. Configure JWT authentication with MFA
4. Implement RBAC authorization
5. Set up audit logging system

### Phase 5: Integration & Testing

1. Connect frontend to backend APIs
2. Implement E2E testing scenarios
3. Set up contract testing between services
4. Configure CI/CD pipeline
5. Performance optimization and security hardening

## 🔒 Security & Quality Standards

### Code Quality

- **TypeScript:** Strict mode with full type coverage
- **Linting:** ESLint with Angular and NestJS best practices
- **Testing:** 90%+ code coverage requirement
- **Documentation:** JSDoc for all public APIs

### Security Measures

- **Authentication:** JWT with refresh tokens + MFA
- **Authorization:** Role-based access control (RBAC)
- **Data Protection:** Encryption at rest and in transit
- **Security Headers:** CSP, HSTS, CSRF protection
- **Audit Logging:** Immutable audit trails

### Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Bundle Size:** < 250KB initial load
- **API Response Time:** < 200ms average

## 📝 MVP Acceptance Criteria

- ✅ Public site live (Home, Solutions, Security, Case Studies, Contact)
- ✅ Capability PDF downloadable
- ✅ Login with MFA; demo dashboard; audit log visible
- ✅ Seeded data present in both MongoDB and PostgreSQL
- ✅ Strongly typed end-to-end (DTOs to database)
- ✅ Real-time ready (WebSocket support)
- ✅ Professional and auditable codebase

## 🎨 Animation Integration Plan

Preserve and modernize the excellent animation assets from the old implementation:

### Components to Port

1. **Animated Background Component**
   - Patriotic theme with stars and tactical effects
   - Data pulse animations
   - Scan line overlays

2. **Radar Display Component**
   - Canvas-based radar with rotating scan
   - Contact tracking and display
   - Expandable detail views

3. **Tactical Display Component**
   - Military-style grid display
   - Entity tracking and movement
   - Real-time status updates

### Modernization Approach

- Convert to Angular 20 standalone components
- Use Angular Signals for reactive state
- Optimize canvas rendering performance
- Add proper TypeScript interfaces
- Implement proper cleanup and memory management

## 🗓️ Timeline Estimate

- **Phase 1-2:** 1-2 weeks (Foundation + Core Apps)
- **Phase 3:** 1-2 weeks (Feature Libraries)
- **Phase 4:** 2-3 weeks (Backend Services)
- **Phase 5:** 1-2 weeks (Integration + Testing)

**Total Estimated Time:** 5-9 weeks for full MVP implementation

---

*This plan follows the "legendary, professional, auditable, testable, documented" standard outlined in the project requirements.*
