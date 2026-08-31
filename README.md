# NT132 Knowledge Base

Digital garden for **Quản trị mạng và hệ thống** (UIT). The site is built with
Quartz v4 and is intentionally being delivered in milestones so the course
content can be reviewed before migration.

## Local development

Requirements: Node.js 22 and npm 10.9 or newer.

```text
npm ci
npm run quartz -- build -d content
npm run prepare-pages
npm run quartz -- build --serve -d content
```

The development server is available at `http://localhost:8080`.

Store project-owned non-Markdown assets under `content/static/images/`,
`content/static/diagrams/`, or `content/static/downloads/`. Quartz's
`Plugin.Assets()` copies these files to the matching `public/static/` paths;
the repository root `static/` directory is not a project-asset location.

## Project status

M0 (repository audit) and M1 (working website foundation) are the current
scope. The `content/` directory contains navigation placeholders and three
temporary graph-test notes only. See [PROJECT_STATE.md](PROJECT_STATE.md),
[TODO.md](TODO.md), [CONTENT_INVENTORY.md](CONTENT_INVENTORY.md), and
[SOURCE_POLICY.md](SOURCE_POLICY.md) before adding course material.

## Deployment

Pushes to `main` build and deploy the generated `public/` directory to GitHub
Pages through `.github/workflows/deploy-pages.yml`. Feature branches run the
build job on pull requests but do not deploy.
