# True North Holdings - Multi-Company Organization Strategy

## 🏢 **Parent Structure Vision**

This repository serves as the parent container for multiple True North companies, each with their own specialized focus and technology needs.

### Current & Planned Companies
```
true-north/                          # Parent holding company repo
├── true-north-insights/            # Software & Analytics (Nx Monorepo)
├── true-north-apparel/             # Clothing & Merchandise 
├── true-north-tea/                 # Tea & Beverage Company (future)
└── true-north-ventures/            # Investment & Consulting (future)
```

## 🎯 **Multi-Company Management Approach**

### Option 1: Lerna + Rush (Recommended)
**Best for:** Complex multi-project coordination with different tech stacks

```bash
# Install Rush globally
npm install -g @microsoft/rush

# Parent structure with Rush
true-north/
├── rush.json                       # Rush configuration
├── common/
│   ├── config/                     # Shared configurations
│   ├── scripts/                    # Cross-company automation
│   └── templates/                  # Project templates
├── apps/
│   ├── true-north-insights/        # Nx monorepo (Angular + NestJS)
│   ├── true-north-apparel/         # E-commerce (Next.js + Shopify)
│   └── true-north-tea/             # Static site (Astro/Hugo)
└── packages/
    ├── shared-ui/                  # Cross-company design system
    ├── shared-utils/               # Common utilities
    └── shared-configs/             # ESLint, Prettier, TypeScript configs
```

**Benefits:**
- ✅ Different tech stacks per company
- ✅ Shared tooling and configurations
- ✅ Incremental builds across projects
- ✅ Dependency management across companies
- ✅ Unified CI/CD orchestration

### Option 2: Git Submodules + Parent Tooling
**Best for:** Complete independence with optional coordination

```bash
true-north/                         # Parent coordination repo
├── .gitmodules                     # Submodule definitions
├── scripts/
│   ├── bootstrap.sh                # Setup all companies
│   ├── build-all.sh               # Build all projects
│   └── deploy-all.sh              # Deploy coordination
├── shared/
│   ├── branding/                  # Company logos, fonts, colors
│   ├── legal/                     # Shared contracts, terms
│   └── infrastructure/            # Shared AWS/Azure resources
└── companies/
    ├── insights -> true-north-insights/     # Git submodule
    ├── apparel -> true-north-apparel/       # Git submodule
    └── tea -> true-north-tea/               # Git submodule
```

### Option 3: Nx Multi-Framework Workspace (Experimental)
**Best for:** Maximum integration but limited flexibility

Recent Nx versions support multiple frameworks in one workspace, but this might be too constraining for diverse business needs.

## 🛠️ **Recommended Parent-Level Tooling**

### 1. **Rush.js Configuration** (Recommended)
```json
// rush.json
{
  "rushVersion": "5.118.0",
  "pnpmVersion": "8.15.0",
  "projectFolders": [
    {
      "projectFolder": "apps/true-north-insights",
      "packageName": "@true-north/insights"
    },
    {
      "projectFolder": "apps/true-north-apparel", 
      "packageName": "@true-north/apparel"
    }
  ],
  "projects": [
    {
      "packageName": "@true-north/shared-ui",
      "projectFolder": "packages/shared-ui"
    }
  ]
}
```

### 2. **Shared Design System Package**
```
packages/shared-ui/
├── src/
│   ├── tokens/                     # Design tokens (colors, fonts, spacing)
│   ├── components/                 # Framework-agnostic components
│   │   ├── react/                  # React versions
│   │   ├── angular/                # Angular versions
│   │   └── web-components/         # Universal web components
│   └── themes/
│       ├── insights-theme.css      # Software company theme
│       ├── apparel-theme.css       # Apparel company theme
│       └── tea-theme.css           # Tea company theme
```

### 3. **Cross-Company CI/CD Orchestration**
```yaml
# .github/workflows/multi-company-ci.yml
name: Multi-Company CI/CD
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      insights: ${{ steps.changes.outputs.insights }}
      apparel: ${{ steps.changes.outputs.apparel }}
      tea: ${{ steps.changes.outputs.tea }}
    steps:
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            insights:
              - 'apps/true-north-insights/**'
            apparel:  
              - 'apps/true-north-apparel/**'
            tea:
              - 'apps/true-north-tea/**'

  build-insights:
    needs: detect-changes
    if: ${{ needs.detect-changes.outputs.insights == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Insights
        run: |
          cd apps/true-north-insights
          npm ci && npm run build

  build-apparel:
    needs: detect-changes  
    if: ${{ needs.detect-changes.outputs.apparel == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Apparel
        run: |
          cd apps/true-north-apparel
          npm ci && npm run build
```

### 4. **Parent-Level Scripts**
```json
// package.json (parent level)
{
  "name": "@true-north/holdings",
  "private": true,
  "scripts": {
    "bootstrap": "rush install && rush build",
    "build:all": "rush rebuild",
    "test:all": "rush test",
    "lint:all": "rush lint", 
    "insights:dev": "cd apps/true-north-insights && npm run serve",
    "apparel:dev": "cd apps/true-north-apparel && npm run dev",
    "tea:dev": "cd apps/true-north-tea && npm run dev",
    "insights:build": "cd apps/true-north-insights && npm run build",
    "apparel:build": "cd apps/true-north-apparel && npm run build"
  }
}
```

## 🏗️ **Technology Stack per Company**

### True North Insights (Software/Analytics)
- **Framework:** Nx Monorepo
- **Frontend:** Angular 20 + Material 3
- **Backend:** NestJS 11 + GraphQL
- **Database:** MongoDB + PostgreSQL
- **Deployment:** Azure/AWS Container Apps

### True North Apparel (E-commerce)
- **Framework:** Next.js 14+ or Remix
- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js/Serverless Functions
- **E-commerce:** Shopify Plus/Medusa
- **Database:** PostgreSQL + Redis
- **Deployment:** Vercel/Netlify

### True North Tea (Content/E-commerce)
- **Framework:** Astro or Hugo (Static Site)
- **Frontend:** Vanilla JS/Alpine.js
- **CMS:** Sanity/Strapi/Contentful
- **E-commerce:** Shopify Lite/Snipcart
- **Deployment:** Cloudflare Pages/Netlify

## 📁 **Recommended File Structure**

```
true-north/                              # Parent holding repo
├── .github/
│   ├── workflows/                       # Multi-company CI/CD
│   └── templates/                       # Issue/PR templates
├── rush.json                            # Rush configuration
├── .rushrc                              # Rush settings
├── common/
│   ├── config/
│   │   ├── rush/                        # Rush-specific configs
│   │   ├── eslint/                      # Shared ESLint configs
│   │   └── typescript/                  # Shared TS configs
│   ├── scripts/
│   │   ├── bootstrap.js                 # Setup all projects
│   │   ├── build-all.js                 # Build orchestration
│   │   └── deploy.js                    # Deployment coordination
│   └── templates/                       # Project scaffolding templates
├── apps/
│   ├── true-north-insights/            # Nx monorepo (this project)
│   ├── true-north-apparel/             # E-commerce site
│   └── true-north-tea/                 # Tea company site
├── packages/
│   ├── shared-ui/                       # Cross-company design system
│   ├── shared-utils/                    # Common utilities
│   ├── shared-configs/                  # Shared configurations
│   └── shared-types/                    # Common TypeScript types
├── tools/
│   ├── generators/                      # Custom project generators
│   └── automation/                      # Cross-company automation
├── docs/
│   ├── parent-architecture.md           # Multi-company architecture
│   ├── contributing.md                  # Contribution guidelines
│   └── deployment.md                    # Deployment strategies
└── README.md                            # Parent-level documentation
```

## 🚀 **Implementation Recommendation**

I recommend **Option 1 (Rush.js)** because:

1. **Flexibility:** Each company can use different tech stacks
2. **Scalability:** Easy to add new companies/projects
3. **Efficiency:** Shared tooling and incremental builds
4. **Professional:** Enterprise-grade multi-repo management
5. **CI/CD:** Advanced build orchestration and caching

## 🎯 **Next Steps**

1. **Move current scaffolding to `true-north-insights/`**
2. **Set up Rush.js configuration at parent level**
3. **Create shared packages structure**
4. **Establish parent-level CI/CD**
5. **Begin Nx scaffolding within insights subfolder**

**Should I proceed with restructuring for Rush.js and moving the Nx scaffolding to the `true-north-insights` subfolder?**