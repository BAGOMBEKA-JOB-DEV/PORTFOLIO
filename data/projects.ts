import links from "data/links";
import type { Project } from "types/Sections";

// Content is drawn from the CV, the repositories and direct inspection.
//
// Each field is an array — one element per rendered paragraph. The first
// paragraph of every field must carry the whole point on its own, because most
// readers skim first lines.
const projectsList: Project[] = [
  {
    id: 1,
    kind: "case-study",
    name: "National Education Management Information System (EMIS)",
    subtitle: "Ministry of Education & Sports, Uganda",
    role: "Backend / Full-Stack Engineer",
    org: { name: "SMS ONE (U) Limited", href: links.smsone },
    situation: [
      "Uganda's education sector ran on data that could not be trusted. National identity records and learner records lived in separate systems with no verification at the point of entry, so the same child could be registered several times across districts, school levels and academic years without anything catching it. The ministry could not state with confidence how many learners were in the system.",
      "The reporting problem sat on top of the data problem. Staffing, enrolment and district performance were held in different places and reconciled by hand, which meant the figures behind budget and policy decisions were always a step behind reality — and never quite reconcilable with each other.",
    ],
    task: [
      "Build the learner and workforce backbone of the national platform: a learners module that registers every child in the country against a verified identity, an HR module covering the teaching workforce, and a schema capable of modelling the entire sector without needing to be rebuilt as policy changes.",
      "Around that, deliver the access control that decides who may see and change what across a multi-agency platform, the validation that keeps the data correct under national load, the reporting the ministry actually makes decisions on, and a public-facing register that opens school data to citizens.",
    ],
    action: [
      "Built the national learners module in Laravel and Vue 3 on a PostgreSQL schema exceeding 1,000 tables, and integrated NIRA (the National Identification and Registration Authority) national identity verification directly into the ingestion layer. That placement is the whole design: records are validated at the moment of entry rather than reconciled in a cleanup pass afterwards, so duplicates are rejected before they ever enter the register instead of being hunted down later.",
      "Extended the same foundation across the sector. The HR module centralised nationwide staff records and integrated national workforce management, work permit and refugee data sources. The Admin Units module gave structured school-to-location mapping across every administrative unit — the mapping national reporting depends on. The Infrastructure module captured school facility data countrywide and fed capital planning for the 2025/26 financial year, and a Water & Sanitation module extended the reporting surface to school utilities without compromising scalability.",
      "Designed and documented the data model, the 1,000+ table schema, the SRS (Software Requirements Specification) and the system architecture that became the reference specification for the delivery team. Modelled learners, staff, schools, administrative units, facilities and examination records with constraints, referential integrity and validation enforced at the database layer rather than left to application code, and established migration and versioning discipline so structural change shipped predictably across development, staging and production.",
      "Built the cross-agency integrations as services in Laravel, Go and Python FastAPI, connecting NIRA for identity, UNEB (the Uganda National Examinations Board) for examinations, TMIS (the Teacher Management Information System) for teacher management, and the Office of the Prime Minister and Ministry of Finance — agencies that had never exchanged data before. Because those endpoints are undocumented and inconsistent, the clients are deliberately tolerant: retries, timeouts, idempotency keys and reconciliation routines, so a partner being down degrades a sync rather than corrupting local data.",
      "Implemented role and permission management so ministry headquarters, district officials and individual schools each see and edit only their own scope, secured with OAuth 2.0 and token-based authentication and audit logging on sensitive operations. Opened the register to the public with a search across more than 90,000 school records — unauthenticated and read-only, so it had to stay fast under open traffic while exposing only what the ministry had cleared for publication — alongside the application flows that let schools and the public submit through the same platform.",
      "Built the DEO (District Education Officer) data validation workflow that stands between a school's submission and the national figures. A school enters its own enrolment, staffing and facility data; the district education officer reviews it, raises queries back to the school and approves or rejects it before anything aggregates upward. Errors are therefore caught by the officer closest to the school, while the record is still correctable, rather than surfacing as an anomaly in a national report months later. Every decision is stamped with who approved what and when, so the ministry has an audit trail behind each published number.",
      "Delivered the interfaces ministry staff and district officers use daily: data-heavy dashboards and validated bulk-entry forms built in Vue 3 with Pinia and TanStack Query, which keep server state and cache invalidation out of component code and reduce user error at source. List and report views are tuned with server-side pagination, filtering and query optimisation so screens stay responsive against tables holding tens of millions of rows, and long-running imports, exports and notification workloads run on queue-backed background processing so they never block the request cycle.",
      "Laid the documentation foundation the platform is still built on. Architecture decision records capture why each load-bearing choice was made and what was rejected, so a decision can be revisited years later without re-litigating it from memory. Alongside them sit entity-relationship diagrams and a data dictionary for the 1,000+ table schema, the software requirements specification, API contracts and the glossary that keeps ministry terminology consistent across agencies. On a platform that will outlast every engineer currently on it, that record is the difference between extending the system and guessing at it.",
    ],
    result: [
      "30M+ learner records registered across every school level in Uganda, with duplicate registrations eliminated at source rather than cleaned up downstream. Learner, staffing, facility and district reporting is served from one system instead of being reconciled by hand across several.",
      "More than 90,000 school records are searchable by the public, and the schema and architecture documentation became the reference specification new engineers join the platform through — measurably improving both data integrity and delivery speed.",
    ],
    diagram: "emis",
    tags: [
      "Laravel",
      "Go",
      "Vue 3",
      "TanStack Query",
      "PostgreSQL",
      "FastAPI",
      "RBAC",
      "Data Validation",
      "Architecture Decision Records",
    ],
    links: [{ label: "emis.go.ug", href: "https://emis.go.ug" }],
  },
  {
    id: 2,
    kind: "case-study",
    name: "IMPALA LITE2 — Multi-Tenant Waste-Management SaaS",
    subtitle: "Uganda, extending to Malawi",
    role: "Co-lead Engineer",
    org: { name: "SMS ONE (U) Limited", href: links.smsone },
    situation: [
      "Licensed private waste-collection companies ran their operations across disconnected tools — scheduling in one place, fleet somewhere else, billing and accounting in spreadsheets. No single product covered the whole operation for this market, so every operator improvised a different partial solution.",
      "The regulatory shape made it harder. An operator works across several city authorities, each licensing and reporting on it separately, and money moves along two entirely different paths: the subscription an operator pays for the platform, and the collection fees its own customers pay it. Conflating those two is how this class of product usually goes wrong.",
    ],
    task: [
      "Build a multi-tenant, multi-territory platform where each licensed operator runs its entire business — customers, scheduling, fleet, billing, payments and accounting — on its own subdomain, isolated from every other tenant.",
      "Sit that under a control plane that onboards tenants, bills them for the platform and runs the shared infrastructure, while keeping the two money relationships strictly separate so the platform never takes custody of tenant funds.",
    ],
    action: [
      "Built a Go modular monolith on Chi spanning 44 domain modules — operations, scheduling, fleet, containers, customers, contracts, procurement, payroll, HR, billing, payments, reconciliation and accounting among them — exposing 471 routes behind a generated OpenAPI 3.1 contract, so the API surface is documented by construction rather than by hand.",
      "Isolated tenants with schema-per-tenant PostgreSQL backed by row-level security as a second line of defence, so a query bug cannot leak across tenants even if it escapes the schema boundary. Authentication runs through Keycloak OIDC (OpenID Connect) with one organisation per tenant, and cross-module communication uses a transactional outbox published onto Pub/Sub — events commit in the same transaction as the data that produced them, so a crash between write and publish cannot desynchronise the system.",
      "Implemented a native double-entry general ledger rather than bolting reporting onto invoice tables. It is multi-currency, tax-aware and billing-source-agnostic, so revenue recognised from a platform subscription and from a collection fee lands in the same books under the same rules. Per-country fiscalisation plugs into it — EFRIS (the Electronic Fiscal Receipting and Invoicing Solution) for Uganda, MRA (the Malawi Revenue Authority) for Malawi — alongside Mobile Money settlement and pricing denominated first in Ugandan Shillings (UGX), because a ledger that cannot satisfy the local tax authority is not finished.",
      "Deployed on Cloud Run in africa-south1 for on-continent data residency, and drew the module boundaries so Payments, Telematics and the shared premise registry can be carved out into independent services later without a rewrite. A shared, resolve-only premise registry lets a customer move between operators without their address history being duplicated or lost.",
    ],
    result: [
      "A tenant runs its entire operation on its own subdomain, with the ledger balanced and the fiscalisation correct for its country, while the control plane onboards and bills operators independently of the money flowing between an operator and its own customers.",
      "Built as a modular monolith with service boundaries already drawn, so the platform can be decomposed under load rather than rewritten.",
    ],
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
    situation: [
      "Parliament of Uganda needed to reach very large contact bases reliably, on a platform where a failed dispatch is visible institutionally rather than quietly retried. Government communication has no tolerance for silently dropped messages.",
      "The volume breaks the naive approach twice over. Per-message synchronous delivery collapses long before the contact base is exhausted, and a bulk upload of tens of millions of rows cannot be processed inside a request without the upload itself timing out.",
    ],
    task: [
      "Build ingestion capable of absorbing tens of millions of contacts and delivery capable of dispatching against them without degrading the rest of the platform, under strict government security standards.",
      "Make the pipeline observable enough to prove it is healthy — not merely to debug it after a failure, but to see saturation coming while there is still time to act.",
    ],
    action: [
      "Built structured bulk ingestion for large contact uploads and a contact-management module that segments recipients by administrative unit, so a message can target a district or constituency precisely rather than being broadcast at everyone. Ingestion validates and stages rows outside the request cycle, so an upload of tens of millions of contacts never blocks the user who started it.",
      "Moved delivery onto Kafka, decoupling ingestion from dispatch. Producers write regardless of how fast consumers drain, so a slow gateway or a burst of traffic degrades throughput instead of losing messages — the failure mode becomes a growing backlog, which is visible and recoverable, rather than silent message loss, which is neither.",
      "Implemented and supported the delivery path itself through Kannel and SMPP (Short Message Peer-to-Peer) gateways, diagnosing delivery failures, throughput bottlenecks and binding faults down to the gateway session level, and sustaining real-time delivery under the security standards government messaging is held to.",
      "Instrumented the pipeline with Prometheus metrics and built Grafana dashboards over ingestion rate, consumer lag and delivery outcomes. Consumer lag is the signal that matters: it rises before delivery starts failing, so the dashboards show a problem forming rather than reporting one that has already happened.",
    ],
    result: [
      "25M+ contacts ingested, on an architecture designed for 400,000+ concurrent users, with delivery decoupled from ingestion so neither can take the other down.",
      "The pipeline is observable end to end, so saturation surfaces as a rising lag graph rather than as undelivered messages discovered after the fact.",
    ],
    diagram: "messaging",
    tags: ["Laravel", "Go", "Kafka", "SMPP", "Kannel", "PostgreSQL", "Prometheus", "Grafana"],
    links: [{ label: "Live deployment — Parliament of Uganda", href: "https://parliament.smsone.co.ug/" }],
  },
  {
    id: 4,
    kind: "open-source",
    badge: "Apache-2.0",
    name: "skyl — One Go Interface for Every AI Model",
    subtitle: "Open-source Go library, sole author",
    role: "Author and maintainer",
    situation: [
      "Integrating an AI model into a Go service means writing the same 400 lines every time: request mapping, SSE (Server-Sent Events) parsing, retry with jitter, rate-limit backoff, token accounting, error classification. None of it is the product, and all of it has to be right.",
      "Change vendor, or A/B two of them, and you write it again — this time with two subtly different implementations to keep in sync. Existing options either wrap a single provider, or wrap all of them behind an abstraction so lossy that the moment you need something vendor-specific you are back to writing it yourself.",
    ],
    task: [
      "Write that layer once, properly, so switching between Claude, GPT, Gemini and 400+ other models is a one-line change rather than a rewrite.",
      "Do it without imposing a dependency graph on anyone who imports it, and without the abstraction ever becoming a ceiling — a caller must always be able to reach what the provider actually returned.",
    ],
    action: [
      "Designed one Request/Response shape across every vendor, with model IDs as pass-through strings. New models work the day they launch without waiting for a release, because the library never enumerates them. Every response also carries the untouched provider JSON, so the abstraction can simplify the common path without ever blocking a caller who needs something it does not model.",
      "Kept the core module at zero external dependencies and split the chi HTTP gateway, the OpenTelemetry integration and the Anthropic adapter into separate Go modules. Importing the library pulls in none of them — a decision that costs release complexity, four modules instead of one, and buys every consumer a build free of dependencies they never asked for.",
      "Unified SSE streaming with proper context cancellation and no goroutine leaks, and typed errors that work with errors.Is and errors.As so callers can branch on rate limits, context length or auth failures without string-matching. Retry with jitter, rate-limit backoff and token accounting are handled once, in the one place with enough context to do them correctly.",
      "Backed it with the engineering the code implies: more than half the codebase is tests, 8 architecture decision records document the load-bearing choices, and a threat model, benchmark figures and a feature matrix state plainly what each adapter supports and what it silently ignores. The documentation site ships a snippet compiler that extracts every Go example, assembles each into its own package against a real checkout and type-checks it — so an example that cannot compile fails the build rather than misleading a reader.",
    ],
    result: [
      "Published on pkg.go.dev with a full documentation site, released as four independently versioned modules under Apache-2.0.",
      "CI runs CodeQL, fuzzing and OpenSSF Scorecard on every change, with container images signed and attested at publish — the supply-chain posture of a library meant to be depended on, not a demo.",
    ],
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
    summary: [
      "A subscription tracker built around the observation that people do not lose money to the subscriptions they remember — they lose it to the ones they forget. The Expo app opens on an interactive SVG trend chart you can drag to read spend at any point in time, normalises weekly, monthly and yearly billing cycles into one comparable figure, and surfaces what renews in the next seven days alongside the subscriptions costing the most.",
      "The Laravel 13 API is where the actual product lives. A cascading alert engine schedules warnings from minutes to months ahead of a renewal, with system defaults a user can override per subscription, and delivers them in real time over Laravel Reverb WebSockets backed by queue workers rather than polling. Authentication runs through Sanctum with multi-factor OTP (one-time password), and every table uses UUID (universally unique identifier) primary keys so records cannot be enumerated by walking sequential IDs.",
      "The client is deliberately more finished than a side project needs to be: a small design system of typed components, haptics on every meaningful interaction, glassmorphic confirmation modals, tokens held in expo-secure-store rather than async storage, and a free tier capped at three tracked subscriptions with the paywall triggered on tab focus so it cannot be sidestepped by navigating around it.",
    ],
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
    summary: [
      "A marketplace connecting agricultural buyers and vendors, built around a request-for-quotation workflow rather than fixed-price listings — because agricultural trade is negotiated on volume, grade and season, and a fixed price on a product page cannot represent that. Buyers publish an RFQ, vendors respond with quotes, and each side tracks the exchange from its own dashboard through to an order.",
      "Access is governed by dynamic role-based access control: roles and granular permissions are created and assigned at runtime rather than hard-coded, so the platform can add a role without a deployment. That drives three genuinely distinct experiences — admins moderate vendor listings, manage hierarchical categories and broadcast announcements from a governance dashboard; vendors manage inventory, respond to RFQs and track sales; buyers discover products, raise RFQs and manage orders.",
      "Built as a Laravel 11 API with Sanctum token authentication and a Vue 3 Composition API front end using Pinia for state and route-level auth guards, with tiered subscriptions gating marketplace access, direct buyer-to-vendor messaging and a notification system alongside.",
    ],
    diagram: "agriculture",
    tags: ["Laravel 11", "Vue 3", "Pinia", "Tailwind CSS", "PostgreSQL", "RBAC"],
    links: [{ label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/agriculture" }],
  },
];

export default projectsList;
