# True North Holdings — Multi-Company Portfolio

**Legendary. Professional. Auditable. Testable. Documented.**  
*Parent repository for True North's diverse business portfolio — Making America Build Again 🇺🇸*

## 🏢 **Company Portfolio**

This repository serves as the parent coordination hub for multiple True North companies:

### 📊 **True North Insights** 
**Software & Analytics Company**
- **Location:** [`./true-north-insights/`](./true-north-insights/)
- **Tech Stack:** Nx Monorepo with Angular 20 + NestJS 11
- **Focus:** Government data solutions, compliance, modernization
- **Status:** 🚧 Active Development

### 👕 **True North Apparel** *(Planned)*
**Patriotic Clothing & Merchandise**
- **Location:** `./true-north-apparel/` *(Future)*
- **Tech Stack:** Next.js + Shopify Plus
- **Focus:** Veteran-inspired apparel and accessories
- **Status:** 📋 Planning Phase

### 🍵 **True North Tea** *(Planned)*
**Premium Tea & Beverage Company**
- **Location:** `./true-north-tea/` *(Future)*
- **Tech Stack:** Astro + Headless CMS
- **Focus:** Artisanal teas with American heritage
- **Status:** 💡 Concept Stage

## 🛠️ **Multi-Company Management**

This parent repository uses **Rush.js** for coordinated multi-project management:

### Quick Start Commands
```bash
# Bootstrap all companies
npm run bootstrap

# Build all projects
npm run build:all

# Development servers
npm run insights:dev     # Start True North Insights
npm run apparel:dev      # Start True North Apparel (future)
npm run tea:dev          # Start True North Tea (future)
```

### Architecture Overview
```text
true-north/                          # Parent coordination repo
├── apps/
│   ├── true-north-insights/        # Nx monorepo (Angular + NestJS)
│   ├── true-north-apparel/         # E-commerce (Next.js + Shopify)
│   └── true-north-tea/             # Static site (Astro + CMS)
├── packages/
│   ├── shared-ui/                  # Cross-company design system
│   ├── shared-utils/               # Common utilities
│   └── shared-configs/             # Shared tooling configs
├── common/
│   ├── config/                     # Rush + tooling configuration
│   └── scripts/                    # Cross-company automation
└── docs/
    ├── PARENT_STRATEGY.md          # Multi-company architecture
    └── contributing.md             # Contribution guidelines
```

## 📈 **Current Focus: True North Insights**

The primary active project is **True North Insights**, a comprehensive software and analytics platform:

- **🎯 MVP Goal:** Government-ready compliance and data modernization platform
- **🏗️ Architecture:** Dual persistence (MongoDB + PostgreSQL) with strongly-typed APIs
- **🔒 Security:** JWT + MFA, RBAC, immutable audit trails
- **📊 Features:** Real-time dashboards, PDF generation, data provenance tracking

See [`./true-north-insights/README.md`](./true-north-insights/README.md) for detailed information.

## 🚀 **Getting Started**

### Prerequisites
- Node.js 20.19+ (required for Angular 20)
- Rush.js (for multi-company coordination)
- Git (for version control)

### Setup Instructions

1. **Clone and Bootstrap**
   ```bash
   git clone <repo-url>
   cd true-north
   npm install -g @microsoft/rush
   rush install
   ```

2. **Start Development**
   ```bash
   # For True North Insights development
   cd true-north-insights
   npm run serve
   ```

3. **Cross-Company Operations**
   ```bash
   # From parent directory
   rush build     # Build all projects
   rush test      # Test all projects
   rush lint      # Lint all projects
   ```

## 🤝 **Contributing**

Each company maintains its own development practices:

- **True North Insights:** See [`./true-north-insights/CONTRIBUTING.md`](./true-north-insights/CONTRIBUTING.md)
- **True North Apparel:** *(Future development guidelines)*
- **True North Tea:** *(Future development guidelines)*

## 📚 **Documentation**

- **[Parent Strategy](./PARENT_STRATEGY.md)** - Multi-company architecture and tooling
- **[True North Insights](./true-north-insights/README.md)** - Software platform documentation
- **[Rush Configuration](./rush.json)** - Multi-project build coordination

## 🇺🇸 **Mission**

True North Holdings brings military discipline and precision to diverse business challenges, delivering legendary solutions across software, retail, and lifestyle brands. We're committed to supporting veterans, building American businesses, and creating products that embody our nation's values.

---

*Making America Build Again — One Company at a Time* 🇺🇸