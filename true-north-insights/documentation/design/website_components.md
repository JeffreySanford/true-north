# True North Insights — Component Inventory

## Angular + Material Design 3 Components
- **Layout:** AppShell, TopNav, SideNav (portal)
- **Auth:** SignInForm, SignUpForm, MfaSetup, PasswordReset
- **Marketing:** HeroBanner, PillarsGrid, CaseStudyTile, LogoStrip
- **Portal:** BoardView, MetricsTile, AuditTable, UserMenu

## Example Component Flow
```mermaid
flowchart LR
  LoginForm --> AuthService
  AuthService --> JWT[JWT / MFA]
  JWT --> Portal[Client Portal Access]
  Portal --> Dashboard[Demo Dashboard]
  Portal --> AuditLogs[Audit Log Viewer]
```
