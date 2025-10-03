# Capture Funnel & Stage Definitions

> Purpose: Provide a consistent, instrumentable funnel model from initial market awareness through awarded pilot/contract, enabling precise conversion tracking, forecasting, and activity prioritization.

---

## Funnel Overview

```
Awareness → Engaged Lead → Qualified Opportunity → Positioned Opportunity → Pilot / Evaluation → Award / Expansion
```

Each stage has: Entry Criteria, Exit Criteria, Owner, SLA, Primary Levers, Core KPIs.

---

## Stage Detail

### 1. Awareness

- Entry: Contact consumes a public asset (snippet, webinar registration, whitepaper download) or is imported via targeted list build.
- Exit: Two-way interaction established OR explicit interest expressed (reply, meeting acceptance, event attendance).
- Owner: Marketing (list hygiene) / Growth (target list curation).
- SLA: 48h enrichment + initial touch.
- Primary Levers: Content velocity, channel mix, segmentation accuracy.
- KPIs: Content CTR, new MQL count, asset-to-engagement conversion %.

### 2. Engaged Lead

- Entry: Responded to outreach, attended webinar, or requested information.
- Exit: Problem/pain + timing validated (meets ICP & has actionable use case) → becomes Qualified Opportunity.
- Owner: Growth / Early BD.
- SLA: Discovery call within 7 days.
- Levers: Discovery questioning quality, follow-up speed, tailored asset mapping.
- KPIs: Discovery scheduled rate, discovery show rate, lead → qualified %.

### 3. Qualified Opportunity

- Entry: Confirmed mission pain + data context + at least one success criterion defined; authority path identified.
- Exit: True North positioned as differentiated approach in writing OR evaluation/pilot proposal requested.
- Owner: Capture Lead.
- SLA: Positioning brief / tailored deck within 10 business days.
- Levers: Differentiation clarity, stakeholder mapping, capability narrative.
- KPIs: Qualified → positioned %, avg days in stage, multi-stakeholder coverage (# roles briefed).

### 4. Positioned Opportunity

- Entry: Sponsor acknowledges differentiators; tentative path to pilot articulated.
- Exit: Pilot / evaluation scope formally accepted (LOI, memorandum, or scheduling of pilot kickoff) OR a competitive RFI response submitted featuring our architecture.
- Owner: Capture + Product liaison.
- SLA: Pilot scope alignment within 20 business days.
- Levers: Prototype asset quality, risk mitigation answers, integration clarity.
- KPIs: Positioned → pilot %, objections resolved time, champion strength score.

### 5. Pilot / Evaluation

- Entry: Mutually agreed success metrics + timeframe.
- Exit: Success metrics met or exceeded and sponsor signals procurement intent OR formal procurement process begins (RFP/RFQ referencing our capability).
- Owner: Delivery / Solutions Engineer.
- SLA: Kickoff < 10 business days from acceptance.
- Levers: Rapid insight delivery, data security assurance, stakeholder update cadence.
- KPIs: Pilot success rate, cycle time, exec sponsor satisfaction (qual survey).

### 6. Award / Expansion

- Entry: Pilot success + contract or task order executed.
- Exit: Expansion motion (additional scope, new program) or formal hand-off to delivery account management.
- Owner: Executive Sponsor / Account Manager.
- SLA: Expansion planning session within 45 days of award.
- Levers: Early ROI quantification, cross-program storytelling, veteran talent showcase.
- KPIs: Expansion rate (6 mo), ACV growth %, referenceability status.

---

## Stage Gate Checklist (Abbreviated)

| Stage                  | Minimum Data Captured                            | Gate Validation                |
| ---------------------- | ------------------------------------------------ | ------------------------------ |
| Awareness              | Source asset, segment, persona guess             | Auto via tracking pixel / form |
| Engaged Lead           | Last touch date, interest trigger                | Manual review (weekly)         |
| Qualified Opportunity  | Pain statement, success crit., authority path    | Capture lead approval          |
| Positioned Opportunity | Differentiators logged, pilot concept doc        | Internal deal review           |
| Pilot / Evaluation     | Success metrics, start/end dates, data scope     | Kickoff meeting notes          |
| Award / Expansion      | Contract value, start date, expansion hypothesis | Exec sign-off                  |

---

## Conversion Metrics Framework

| Transition               | Formula                | Baseline (Assumed) | 90d Target | Notes                                |
| ------------------------ | ---------------------- | ------------------ | ---------- | ------------------------------------ |
| Awareness → Engaged      | Engaged / Awareness    | 8%                 | 12%        | Improve CTA relevance                |
| Engaged → Qualified      | Qualified / Engaged    | 30%                | 40%        | Better discovery scripts             |
| Qualified → Positioned   | Positioned / Qualified | 50%                | 60%        | Sharper differentiators              |
| Positioned → Pilot       | Pilots / Positioned    | 25%                | 35%        | Prototype assets, objection handling |
| Pilot → Award            | Awards / Pilots        | 40%                | 55%        | Pilot design discipline              |
| Award → Expansion (6 mo) | Expansions / Awards    | 20%                | 30%        | Post-award success storytelling      |

---

## Time-in-Stage Benchmarks

| Stage                  | Baseline Days (Assumed) | Target Days | Reduction Lever                        |
| ---------------------- | ----------------------- | ----------- | -------------------------------------- |
| Awareness              | —                       | —           | N/A                                    |
| Engaged Lead           | 14                      | 10          | Faster scheduling, templated discovery |
| Qualified Opportunity  | 25                      | 18          | Pre-built positioning kit              |
| Positioned Opportunity | 35                      | 28          | Early pilot scoping checklist          |
| Pilot / Evaluation     | 60                      | 45          | Defined success templates              |
| Award / Expansion      | 90 to expansion plan    | 60          | Early expansion hypothesis             |

---

## Data Model (CRM Fields)

| Field                  | Type     | Required Stage(s) | Description                      |
| ---------------------- | -------- | ----------------- | -------------------------------- |
| Stage                  | Enum     | All               | Current funnel stage             |
| Segment                | Enum     | Awareness+        | Persona segment bucket           |
| Source Asset           | Text     | Awareness+        | First-touch content / event      |
| Pain Statement         | Text     | Qualified+        | Prospect expressed problem       |
| Success Criteria       | Text     | Pilot+            | Mutually defined pilot outcomes  |
| Authority Path         | Text     | Qualified+        | Path to decision (roles + steps) |
| Differentiators Logged | Boolean  | Positioned+       | Whether unique value recorded    |
| Pilot Start Date       | Date     | Pilot             | Kickoff date                     |
| Pilot End Date         | Date     | Pilot             | Target completion                |
| Contract Value         | Currency | Award             | Initial contract value           |
| Expansion Hypothesis   | Text     | Award             | Potential growth vector          |

---

## Ownership & Review Routines

| Cadence   | Review Focus                       | Participants            |
| --------- | ---------------------------------- | ----------------------- |
| Weekly    | New Engaged → Discovery scheduling | Growth, Capture         |
| Bi-Weekly | Stage slippage & stuck deals       | Capture, Product, Exec  |
| Monthly   | Conversion trend variance          | Marketing, Growth, Exec |
| Quarterly | Funnel design refinement           | Cross-functional        |

---

## Tooling / Automation Backlog (Funnel Layer)

| Priority | Item                                   | Goal                      | Effort | Notes             |
| -------- | -------------------------------------- | ------------------------- | ------ | ----------------- |
| High     | Auto stage aging alerts                | Reduce stagnation         | M      | Cron + email      |
| High     | Pilot success score calculator         | Standardize evaluation    | M      | Weighted metrics  |
| Med      | Differentiator coverage heatmap        | Identify messaging gaps   | M      | Tag analysis      |
| Med      | Time-in-stage report automation        | Faster ops review         | L      | Query + dashboard |
| Low      | Expansion hypothesis reminder workflow | Prompt proactive planning | L      | Date-trigger      |

---

## Alignment With Veteran Talent Flywheel

- Early funnel assets highlight talent impact metrics.
- Pilot resourcing includes at least one veteran analyst where feasible.
- Award announcements packaged with talent success vignette.

---

## Immediate Actions

1. Implement CRM stage enum & mandatory field validation rules.
2. Build initial time-in-stage dashboard using assumed baselines (update w/ real data once ≥20 opportunities).
3. Draft pilot success template (metrics + cadence + exit survey).
4. Train growth team on discovery to qualification hand-off checklist.
5. Stand up weekly Engaged → Discovery scheduling review.

---

_Status: v1 Draft – Replace assumed baselines with empirical metrics after first 60 days of operation._
