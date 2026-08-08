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
    role: "Backend / Full-Stack Engineer — SMS ONE (U) Limited",
    situation:
      "National identity records and learner records lived in separate systems with no verification at the point of entry. Registrations were duplicated across districts and school levels, so the ministry had no reliable count of who was actually in the education system.",
    task: "Build the national learners module: register every learner in the country against a verified identity, on a schema large enough to model the entire sector.",
    action:
      "Built the module in Laravel and Vue on a PostgreSQL schema exceeding 1,000 tables. Integrated NIRA national identity verification directly into the ingestion layer so records are validated at the moment of entry rather than reconciled afterwards, and built the validation pipelines that enforce it under concurrent load.",
    result:
      "30M+ learner records registered across every school level in Uganda, with duplicate registrations eliminated at source rather than cleaned up downstream.",
    tags: ["Laravel", "Vue", "PostgreSQL", "REST APIs", "NIRA Integration"],
  },
  {
    id: 2,
    kind: "case-study",
    name: "IMPALA LITE2 — Multi-Tenant Waste-Management SaaS",
    subtitle: "SMS ONE (U) Limited · Uganda, extending to Malawi",
    role: "Co-lead Engineer — authored roughly two thirds of the codebase",
    situation:
      "Licensed private waste-collection companies ran operations, fleet, billing and accounting across disconnected tools. Each operator is licensed by a different city authority and must be reported on separately, and no single product covered the whole operation for this market.",
    task: "Build a multi-tenant, multi-territory platform where each operator runs its entire business on its own subdomain, under a control plane that onboards and bills tenants.",
    action:
      "Built a Go modular monolith on Chi across 44 domain modules — operations, scheduling, fleet, billing, payments, procurement, payroll and accounting — exposing 471 routes behind a generated OpenAPI 3.1 contract. Isolated tenants with schema-per-tenant PostgreSQL backed by row-level security, authenticated through Keycloak OIDC with one organisation per tenant, and used a transactional outbox onto Pub/Sub for cross-module events. Implemented a native double-entry general ledger that is multi-currency, tax-aware and billing-source-agnostic, with per-country fiscalisation for EFRIS and MRA, plus Mobile Money settlement. Deployed on Cloud Run in africa-south1 for on-continent data residency.",
    result:
      "100,000+ lines of Go across 559 files with 165 test files and 264 migrations, structured so Payments, Telematics and the shared premise registry can be carved out as services without a rewrite. [VERIFY: production/pilot status and tenant count]",
    tags: ["Go", "Chi", "PostgreSQL", "Keycloak", "Pub/Sub", "Vue 3", "Flutter", "GCP"],
  },
  {
    id: 3,
    kind: "case-study",
    name: "National Examination Registration & Results",
    subtitle: "UNEB integration",
    role: "Backend Engineer — SMS ONE (U) Limited",
    situation:
      "Examination registration and results processing run to a fixed national calendar. The pipeline has no tolerance for data loss or mismatched records, and no room to slip.",
    task: "Integrate examination registration and results processing with UNEB and the national identity layer.",
    action:
      "Designed and built the integration components connecting candidate registration to NIRA identity verification and UNEB results processing, with reconciliation logic to guarantee every candidate record resolves correctly end to end.",
    result: "Approximately 300,000 candidates processed per examination cycle.",
    tags: ["Laravel", "PostgreSQL", "System Integration", "UNEB", "NIRA"],
  },
  {
    id: 4,
    kind: "case-study",
    name: "High-Volume Enterprise Messaging Platform",
    subtitle: "SMS ONE (U) Limited",
    role: "Software Engineer",
    situation:
      "Institutional clients needed to reach very large contact bases reliably. Naive per-message delivery collapses at that volume, and bulk uploads at this scale cannot be processed synchronously.",
    task: "Build ingestion and delivery capable of absorbing tens of millions of contacts and dispatching against them without degrading the platform.",
    action:
      "Built structured bulk ingestion for large contact uploads and moved delivery onto asynchronous queue workers (RabbitMQ), decoupling ingestion from dispatch so neither blocks the other. Architected the surrounding services for high-concurrency load. [VERIFY: confirm RabbitMQ vs Kafka for this specific pipeline]",
    result: "45M+ contacts ingested, on an architecture designed for 100,000+ concurrent users.",
    tags: ["Laravel", "Go", "RabbitMQ", "PostgreSQL", "Redis"],
  },
  {
    id: 5,
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
      "21,000+ lines of Go, of which 11,800 are tests — 56% of the codebase. Four released modules, 8 architecture decision records, and 7 CI workflows including CodeQL, fuzzing, OpenSSF Scorecard, and signed and attested container publishing.",
    tags: ["Go", "SSE Streaming", "OpenTelemetry", "Next.js", "Playwright", "GitHub Actions"],
    links: [
      { label: "Documentation", href: "https://skyl-docs.vercel.app/" },
      { label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/skyl" },
      { label: "pkg.go.dev", href: "https://pkg.go.dev/github.com/BAGOMBEKA-JOB-DEV/skyl" },
      { label: "Docs repository", href: "https://github.com/BAGOMBEKA-JOB-DEV/skyl_docs" },
    ],
  },
];

export default projectsList;
