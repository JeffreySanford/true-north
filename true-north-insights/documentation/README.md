# Documentation Directory

This directory now stores only curated, hand-maintained documentation in three subfolders:

- `data/` – Seed data definitions, modeling notes, and sample datasets.
- `design/` – Architecture, data modeling, application structure, security, and component design references.
- `development/` – Coding standards, engineering practices, and contribution guidance.

All previously generated static documentation (Compodoc HTML, asset folders, interface/module pages, etc.) has been excluded from version control to keep the repository lean and focused on source-of-truth docs.

## Regenerating API / Component Docs (Optional)
If you want local navigable docs:

1. Install dependencies (root):
   `npm install`
2. Generate docs (example using Compodoc – adjust if your script differs):
   `npx compodoc -p tsconfig.base.json -d documentation --silent`
3. Open the generated `index.html` in your browser.

Nothing in that output needs to be committed—it's ephemeral.

## Roadmap
The living delivery roadmap is maintained in `documentation/roadmap.md` (kept under version control intentionally).

## Rationale
Removing generated artifacts:
- Reduces noise in diffs
- Avoids stale documentation rot
- Keeps focus on curated strategic and architectural content

If something essential is missing, add it as a Markdown document under the appropriate curated folder.

---
_Last updated: repository hygiene pass to remove generated docs artifacts._
