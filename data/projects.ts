import links from "data/links";
import type { Project } from "types/Sections";

// NOTE: figures come from the CV, LinkedIn, and direct inspection of the
// repositories. Anything marked [VERIFY] is inferred and must be confirmed
// before shipping.
const projectsList: Project[] = [
  {
    id: 1,
    kind: "case-study",
    name: "National Education Management Information System (EMIS)",
    subtitle: "Ministry of Education & Sports, Uganda",
    role: "Backend / Full-Stack Engineer",
    org: { name: "SMS ONE (U) Limited", href: links.smsone },
    situation:
      "National identity records and learner records lived in separate systems with no verification at the point of entry. Registrations were duplicated across districts and school levels, so the ministry had no reliable count of who was actually in the education system — and no single place to see staffing, enrolment or district performance together.",
    task: "Build the learners and HR modules, a public search over more than 90,000 school records and the application flows behind it, the access-control layer that governs who may see and change what across the ministry, and the validation and reporting the whole platform depends on.",
    action:
      "Built the learners module in Laravel and Vue on a PostgreSQL schema exceeding 1,000 tables, integrating NIRA national identity verification directly into the ingestion layer so records are validated at the moment of entry rather than reconciled afterwards. Extended the same foundation with an HR module covering teacher and staff records, deployment and establishment across schools. Implemented role and permission management so ministry headquarters, district officials and individual schools each see and edit only their own scope, and built the reporting layer that aggregates enrolment and staffing into the figures policy decisions are actually made on. Opened the register to the public with a search over more than 90,000 school records — unauthenticated and read-only, so it had to stay fast under open traffic while exposing only what the ministry had cleared for publication — together with the application flows that let schools and the public submit through the same platform. Wrote the data validation and verification pipelines enforcing all of it under concurrent load, and worked on the infrastructure the platform runs on.",
    result:
      "30M+ learner records registered across every school level in Uganda, with duplicate registrations eliminated at source rather than cleaned up downstream. Learner, staffing and district reporting are served from one system, and more than 90,000 school records are searchable by the public.",
    diagram: "emis",
    tags: ["Laravel", "Vue", "PostgreSQL", "REST APIs", "NIRA Integration", "RBAC", "Reporting", "Public Search"],
    links: [{ label: "emis.go.ug", href: "https://emis.go.ug" }],
  },
  {
    id: 2,
    kind: "case-study",
    name: "IMPALA LITE2 — Multi-Tenant Waste-Management SaaS",
    subtitle: "Uganda, extending to Malawi",
    role: "Co-lead Engineer",
    org: { name: "SMS ONE (U) Limited", href: links.smsone },
    situation:
      "Licensed private waste-collection companies ran operations, fleet, billing and accounting across disconnected tools. Each operator is licensed by a different city authority and must be reported on separately, and no single product covered the whole operation for this market.",
    task: "Build a multi-tenant, multi-territory platform where each operator runs its entire business on its own subdomain, under a control plane that onboards and bills tenants.",
    action:
      "Built a Go modular monolith on Chi across 44 domain modules — operations, scheduling, fleet, billing, payments, procurement, payroll and accounting — exposing 471 routes behind a generated OpenAPI 3.1 contract. Isolated tenants with schema-per-tenant PostgreSQL backed by row-level security, authenticated through Keycloak OIDC with one organisation per tenant, and used a transactional outbox onto Pub/Sub for cross-module events. Implemented a native double-entry general ledger that is multi-currency, tax-aware and billing-source-agnostic, with per-country fiscalisation for EFRIS and MRA, plus Mobile Money settlement. Deployed on Cloud Run in africa-south1 for on-continent data residency.",
    result:
      "A tenant runs its entire operation — customers, scheduling, fleet, billing, payments and accounting — on its own subdomain, with the ledger and fiscalisation correct per country. Structured so Payments, Telematics and the shared premise registry can be carved out as independent services without a rewrite.",
    diagram: "impala",
    tags: ["Go", "Chi", "PostgreSQL", "Keycloak", "Pub/Sub", "Vue 3", "Flutter", "GCP"],
    links: [{ label: "impalalite.com", href: "https://impalalite.com" }],
  },
  {
    id: 3,
    kind: "case-study",
    name: "Bulk SMS Platform — Parliament of Uganda",
    subtitle: "Parliament of Uganda",
    role: "Software Engineer",
    org: { name: "SMS ONE (U) Limited", href: links.smsone },
    situation:
      "Parliament needed to reach very large contact bases reliably, on a platform where a failed dispatch is visible institutionally. Naive per-message delivery collapses at that volume, and bulk uploads at this scale cannot be processed synchronously.",
    task: "Build ingestion and delivery capable of absorbing tens of millions of contacts and dispatching against them without degrading the platform — and make the pipeline observable enough to prove it is healthy.",
    action:
      "Built structured bulk ingestion for large contact uploads and moved delivery onto Kafka, decoupling ingestion from dispatch so neither blocks the other and a consumer backlog degrades throughput instead of losing messages. Instrumented the pipeline with Prometheus metrics and built Grafana dashboards over ingestion rate, consumer lag and delivery outcomes, so saturation is visible before it becomes failed delivery rather than after.",
    result: "25M+ contacts ingested, on an architecture designed for 100,000+ concurrent users.",
    diagram: "messaging",
    tags: ["Laravel", "Go", "Kafka", "PostgreSQL", "Redis", "Prometheus", "Grafana"],
    links: [{ label: "Live deployment — Parliament of Uganda", href: "https://parliament.smsone.co.ug/" }],
  },
  {
    id: 4,
    kind: "open-source",
    badge: "Apache-2.0",
    name: "skyl — One Go Interface for Every AI Model",
    subtitle: "Open-source Go library, sole author",
    role: "Author and maintainer",
    situation:
      "Integrating an AI model into a Go service means writing the same 400 lines every time: request mapping, SSE parsing, retry with jitter, rate-limit backoff, token accounting, error classification. Change vendor, or A/B two of them, and you write it again.",
    task: "Write that layer once, properly, so switching between Claude, GPT, Gemini and 400+ other models is a one-line change — without imposing a dependency graph on anyone who imports it.",
    action:
      "Designed one Request/Response shape across every vendor, with model IDs as pass-through strings so new models work the day they launch without a release. Every response carries the untouched provider JSON, so the abstraction can never block a caller. Kept the core module at zero external dependencies and split the chi HTTP gateway, the OpenTelemetry integration and the Anthropic adapter into separate modules, so importing the library pulls in none of them. Unified SSE streaming with proper context cancellation and no goroutine leaks, and typed errors that work with errors.Is and errors.As. The documentation site ships a snippet compiler that extracts every Go example, assembles each into its own package against a real skyl checkout and type-checks it — so an example that cannot compile fails the build.",
    result:
      "Published on pkg.go.dev with a full documentation site. More than half the codebase is tests, and CI runs CodeQL, fuzzing and OpenSSF Scorecard on every change, with container images signed and attested at publish.",
    diagram: "skyl",
    tags: ["Go", "SSE Streaming", "OpenTelemetry", "Next.js", "Playwright", "GitHub Actions"],
    links: [
      { label: "Documentation", href: "https://skyl-docs.vercel.app/" },
      { label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/skyl" },
      { label: "pkg.go.dev", href: "https://pkg.go.dev/github.com/BAGOMBEKA-JOB-DEV/skyl" },
      { label: "Docs repository", href: "https://github.com/BAGOMBEKA-JOB-DEV/skyl_docs" },
    ],
  },
  {
    id: 5,
    kind: "personal",
    name: "Cullo — Subscription Intelligence",
    subtitle: "React Native mobile app and Laravel API",
    role: "Sole author",
    summary:
      "A subscription tracker that surfaces recurring spend before it becomes bill shock. The Expo app renders an interactive SVG trend chart that can be dragged to read monthly spend at any point, normalises weekly, monthly and yearly billing cycles into one figure, and ships a small design system with haptics and glassmorphic modals. The Laravel 13 API drives it: a cascading alert engine with system defaults and per-user overrides from minutes to months ahead, real-time delivery over Laravel Reverb WebSockets backed by queue workers, token auth through Sanctum with MFA over OTP, and UUID primary keys throughout so records cannot be enumerated by ID.",
    diagram: "cullo",
    tags: ["React Native", "Expo", "TypeScript", "Laravel 13", "PostgreSQL", "WebSockets"],
    links: [
      { label: "Mobile app", href: "https://github.com/BAGOMBEKA-JOB-DEV/cullof" },
      { label: "Backend API", href: "https://github.com/BAGOMBEKA-JOB-DEV/cullob" },
    ],
  },
  {
    id: 6,
    kind: "personal",
    name: "Agricultural Marketplace",
    subtitle: "B2B marketplace platform",
    role: "Sole author",
    summary:
      "A marketplace connecting agricultural buyers and vendors, built around a request-for-quotation workflow rather than fixed-price listings: buyers publish an RFQ, vendors respond with quotes, and each side tracks the exchange from its own dashboard. Access is governed by dynamic role-based access control — roles and granular permissions are created and assigned at runtime rather than hard-coded — which drives three distinct experiences across admin, vendor and buyer. Admins moderate vendor listings, manage hierarchical categories and broadcast announcements. Laravel 11 API with Sanctum, Vue 3 Composition API front end with Pinia and route-level auth guards.",
    diagram: "agriculture",
    tags: ["Laravel 11", "Vue 3", "Pinia", "Tailwind CSS", "PostgreSQL", "RBAC"],
    links: [{ label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/agriculture" }],
  },
];

export default projectsList;
