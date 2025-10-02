# True North Holdings — Professional Software Solutions

**Legendary. Professional. Auditable. Testable. Documented.**  
*Veteran-led technology solutions — Making America Build Again 🇺🇸*

## 🏢 **Company Portfolio**

True North Holdings encompasses multiple veteran-led business ventures, each delivering legendary solutions in their respective markets:

### 📊 **True North Insights**

**Software & Analytics Platform** *(Current Focus)*

- **Location:** [`./true-north-insights/`](./true-north-insights/)
- **Tech Stack:** Nx Monorepo with Angular 20 + NestJS 11
- **Focus:** Government data solutions, compliance, modernization
- **Status:** ✅ Production Ready

### 👕 **True North Apparel**

**Patriotic Clothing & Merchandise** *(Planned)*

- **Vision:** Premium veteran-inspired apparel and tactical gear
- **Tech Stack:** Next.js + Shopify Plus e-commerce platform
- **Focus:** American-made clothing, tactical accessories, patriotic merchandise
- **Market:** Veterans, patriots, outdoor enthusiasts, tactical professionals
- **Status:** 🎯 Strategic Planning Phase

### 🍵 **True North Tea (Broken Leaf)**

**Premium Tea & Beverage Company** *(Planned)*

- **Vision:** Artisanal tea blends with American heritage and military precision
- **Tech Stack:** Astro + Headless CMS with subscription commerce
- **Focus:** Premium loose-leaf teas, military-inspired blends, veteran-owned supply chain
- **Market:** Tea enthusiasts, health-conscious consumers, gift market
- **Status:** 💡 Concept Development

## �️ **Project Management**

This repository focuses on the core True North Insights application:

### Quick Start Commands

```bash
# Navigate to the main application
cd true-north-insights

# Install dependencies and build
npm install

# Development servers
npm run serve           # Start True North Insights frontend
npm run start:backend   # Start True North Insights backend
npm run start:dev       # Start both frontend and backend
```

### Architecture Overview

```text
true-north/                         # Parent repository  
└── true-north-insights/            # Main Software Platform (Nx Monorepo)
    ├── frontend/                   # Angular 20 frontend
    ├── backend/                    # NestJS 11 backend  
    ├── packages/                   # Shared libraries
    └── tools/                      # Build and dev tools
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
- NPM 10+ for package management
- Git 2.40+ for version control

### Setup Instructions

1. **Clone and Setup**

   ```bash
   git clone <repo-url>
   cd true-north/true-north-insights
   npm install
   ```

2. **Start Development**

   ```bash
   # Full-stack development
   npm run start:dev
   
   # Individual services
   npm run serve        # Frontend only
   npm run start:backend # Backend only
   ```

3. **Quality Assurance**

   ```bash
   npm run test:all     # All tests + E2E  
   npm run lint:all     # Lint all projects
   npm run build:prod   # Production build
   ```

## 🤝 **Contributing**

Each company maintains its own development practices:

- **True North Insights:** See [`./true-north-insights/CONTRIBUTING.md`](./true-north-insights/CONTRIBUTING.md)
- **True North Apparel:** *(Future development guidelines)*
- **True North Tea:** *(Future development guidelines)*

## 📚 **Documentation**

- **[Parent Strategy](./PARENT_STRATEGY.md)** - Architecture and development approach
- **[True North Insights](./true-north-insights/README.md)** - Main software platform documentation

## 🇺🇸 **Mission**

True North Holdings delivers military-grade precision to government technology challenges. Our veteran-led team builds legendary software solutions that embody professional excellence, rigorous testing, and comprehensive documentation standards required for federal contracting.

---

*Making America Build Again — Through Professional Technology Solutions* 🇺🇸
