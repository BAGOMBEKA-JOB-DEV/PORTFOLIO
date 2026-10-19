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
      "Uganda's education sector ran on data that could not be trusted. National identity records and learner records lived in separate systems with no verification at the point of entry, so the school census was only as good as the weakest handoff.",
      "The reporting problem sat on top of the data problem. Staffing, enrolment and district performance were held in different places and reconciled by hand, which meant the figures behind budget and policy decisions were late and weakly grounded.",
    ],
    task: [
      "Build the learner and workforce backbone of the national platform: a learners module that registers every child in the country against a verified identity, an HR module covering the teaching workforce and the facilities that support it, and the shared data structures that keep every agency on one truth model.",
      "Around that, deliver the access control that decides who may see and change what across a multi-agency platform, the validation that keeps the data correct under national load, the reporting stack that turns raw inputs into operational decisions, and a process that can survive the realities of public-sector rollout without breaking on change requests.",
    ],
    action: [
      "Built the national learners module in Laravel and Vue 3 on a PostgreSQL schema exceeding 1,000 tables, and integrated NIRA (the National Identification and Registration Authority) national identity verification at the point of record creation so the classroom roster is anchored to a real person rather than a spreadsheet guess.",
      "Extended the same foundation across the sector. The HR module centralised nationwide staff records and integrated national workforce management, work permit and refugee data sources. The Admissions and examinations modules tied school-level operations directly to the ministries that rely on them, while the national data-validation workflow prevented inconsistent districts from shipping bad figures upward.",
      "Designed and documented the data model, the 1,000+ table schema, the SRS (Software Requirements Specification) and the system architecture that became the reference specification for the deployment. Every agency on the platform works from the same canonical definitions, which is how the ministry can trust what it sees.",
      "Built the cross-agency integrations as services in Laravel, Go and Python FastAPI, connecting NIRA for identity, UNEB (the Uganda National Examinations Board) for examinations, TMIS (the Teacher Management Information System) for staffing, and multiple ministry datasets that were previously impossible to reconcile in real time.",
      "Implemented role and permission management so ministry headquarters, district officials and individual schools each see and edit only their own scope, secured with OAuth 2.0 and token-based access patterns that are easy to audit and harder to misconfigure.",
      "Built the DEO (District Education Officer) data validation workflow that stands between a school's submission and the national figures. A school enters its own enrolment, staffing and facility data, and the validation layer checks it before it becomes authoritative at district or national level, which keeps bad submissions from silently polluting the reports.",
      "Delivered the interfaces ministry staff and district officers use daily: data-heavy dashboards and validated bulk-entry forms built in Vue 3 with Pinia and TanStack Query, which keep server load predictable even when the platform is under national reporting pressure.",
      "Laid the documentation foundation the platform is still built on. Architecture decision records capture why each load-bearing choice was made and what was rejected, so a decision can be traced and changed without re-deriving the whole system from scratch.",
    ],
    result: [
      "30M+ learner records registered across every school level in Uganda, with duplicate registrations eliminated at source rather than cleaned up downstream. Learner, staffing, facility and district records flow into one national model instead of into a set of reconciled spreadsheets with a different truth in each office.",
      "More than 90,000 school records are searchable by the public, and the schema and architecture documentation became the reference specification new engineers join the platform through — meaning the system is not just operational, but maintainable and understandable long after the first rollout.",
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
      "Licensed private waste-collection companies ran their operations across disconnected tools — scheduling in one place, fleet somewhere else, billing and accounting in spreadsheets. No single system reflected the actual business reality, so the operational picture was both incomplete and late.",
      "The regulatory shape made it harder. An operator works across several city authorities, each licensing and reporting on it separately, and money moves along two entirely different paths: the platform must track operational service separately from the money relationship that binds the tenant to the authority.",
    ],
    task: [
      "Build a multi-tenant, multi-territory platform where each licensed operator runs its entire business — customers, scheduling, fleet, billing, payments and accounting — on its own subdomain, while the control plane handles onboarding, billing and shared infrastructure without letting the two worlds contaminate each other.",
      "Sit that under a control plane that onboards tenants, bills them for the platform and runs the shared infrastructure, while keeping the two money relationships strictly separate so the platform can meet regulation without creating a compliance incident in the accounting layer.",
    ],
    action: [
      "Built a Go modular monolith on Chi spanning 44 domain modules — operations, scheduling, fleet, containers, customers, contracts, procurement, payroll, HR, billing, payments, reconciliation and reporting — so the system could scale without the complexity tax of a distributed service mesh before it was needed.",
      "Isolated tenants with schema-per-tenant PostgreSQL backed by row-level security as a second line of defence, so a query bug cannot leak across tenants even if it escapes the schema boundary.",
      "Implemented a native double-entry general ledger rather than bolting reporting onto invoice tables. It is multi-currency, tax-aware and billing-source-agnostic, so revenue recognised from a contract, a levy or a platform fee is consistent, explainable and auditable.",
      "Deployed on Cloud Run in africa-south1 for on-continent data residency, and drew the module boundaries so Payments, Telematics and the shared premise registry can be carved out into independent services when the traffic and compliance envelope demand it.",
    ],
    result: [
      "A tenant runs its entire operation on its own subdomain, with the ledger balanced and the fiscalisation correct for its country, while the control plane onboards and bills operators independently without mixing operational data with financial control data.",
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
      "5M+ contacts ingested, on an architecture designed for 100k concurrent users, with delivery decoupled from ingestion so neither can take the other down.",
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
      "Integrating an AI model into a Go service means writing the same 400 lines every time: request mapping, SSE (Server-Sent Events) parsing, retry with jitter, rate-limit backoff, token accounting and provider-specific error handling. The complexity is not the model itself — it is the glue around it.",
      "Change vendor, or A/B two of them, and you write it again — this time with two subtly different implementations to keep in sync. Existing options either wrap a single provider, or wrap a limited abstraction and then still require provider-specific code for anything beyond the happy path.",
    ],
    task: [
      "Write that layer once, properly, so switching between Claude, GPT, Gemini and 400+ other models is a one-line change rather than a rewrite.",
      "Do it without imposing a dependency graph on anyone who imports it, and without the abstraction ever becoming a ceiling — a caller must always be able to reach what the provider actually supports.",
    ],
    action: [
      "Designed one Request/Response shape across every vendor, with model IDs as pass-through strings. New models work the day they launch without waiting for a release, because the library never hard-codes a vendor-specific surface.",
      "Kept the core module at zero external dependencies and split the chi HTTP gateway, the OpenTelemetry integration and the Anthropic adapter into separate Go modules. Importing the library provides the interface; importing a provider adapter brings in the implementation.",
      "Unified SSE streaming with proper context cancellation and no goroutine leaks, and typed errors that work with errors.Is and errors.As so callers can branch on rate limits, context length exceeded, provider outages and retryable failures without a brittle string comparison layer.",
      "Backed it with the engineering the code implies: more than half the codebase is tests, 8 architecture decision records document the load-bearing choices, and a threat model, benchmark figures and a release policy keep the abstraction honest rather than aspirational.",
    ],
    result: [
      "Published on pkg.go.dev with a full documentation site, released as four independently versioned modules under Apache-2.0.",
      "CI runs CodeQL, fuzzing and OpenSSF Scorecard on every change, with container images signed and attested at publish — the supply-chain posture of a library meant to be depended on, not a toy abstraction.",
    ],
    screenshots: [
      {
        src: "/images/projects/skyl/01-home.webp",
        alt: "The skyl documentation landing page: the project name, a one-line summary, and a Go snippet in which the model identifier is the only highlighted line.",
        caption: "Landing page — one interface, 400+ models, and the single line that changes between them",
      },
      {
        src: "/images/projects/skyl/02-learn.webp",
        alt: "The Quick Start guide, listing what the reader will learn: making a request, switching providers, streaming, tool calling and failure handling.",
        caption: "Quick Start — the whole library in a day, from first request to streaming and tool calls",
      },
      {
        src: "/images/projects/skyl/03-reference.webp",
        alt: "The API reference index, documenting every exported symbol in the core module with signatures, caveats and usage recipes.",
        caption: "API reference — every exported symbol, with its caveats and the failure it can return",
      },
      {
        src: "/images/projects/skyl/04-providers.webp",
        alt: "A table of verified OpenAI-compatible endpoints, each with its base URL and whether an API key is required.",
        caption: "Compatible endpoints — verified base URLs that speak the OpenAI wire format, key or no key",
      },
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
    kind: "open-source",
    badge: "Apache-2.0",
    name: "ovrin — Document-to-typed-data extraction in Go",
    subtitle: "Open-source document extraction library, sole author",
    role: "Author and maintainer",
    situation: [
      "Most document automation is still a brittle prompt: send a PDF or image to a model, hope the JSON is valid, and accept that the result may be wrong in ways you cannot audit. That is acceptable for demos and not acceptable for production workflows.",
      "The real problem is not just extraction. It is extraction with provenance, typed output, validation and evidence — because a field that is merely 'present' is not the same as a field that can be trusted.",
    ],
    task: [
      "Build a document extraction library that turns PDFs, scans and images into a typed Go struct, not a loose map. The output must include per-field confidence, provenance for every value and explicit validation so the caller can choose whether to accept or reject a document.",
      "Keep the core dependency-free and provider-agnostic while making the system strong enough for real documents: text-layer first, OCR fallback when needed, schema-driven prompt construction, validation of result shapes, and the ability to plug in multiple vendors without making the abstraction sit on top of a single model.",
    ],
    action: [
      "Designed the pipeline around a staged flow: detect the format, acquire text or pages, normalise layout without losing offsets, reflect the Go schema into a request contract, generate JSON from the model, validate it against the schema, and keep the source evidence attached to each extracted field.",
      "Kept the core clean by separating the library into a zero-dependency root with explicit seams for the model, OCR and renderer. Provider adapters live in their own modules, so importing ovrin means you only pull in the components you need rather than all possible extraction strategies.",
      "Built in explicit guardrails from day one: untrusted input is treated as untrusted, the system validates and rejects unsupported schema shapes early, per-field errors do not kill the whole extraction and all generated values are checked against the contract before they reach the caller.",
      "Backed the implementation with a broad verification gate: offline tests, race tests, docs checks, make targets across modules, coverage reporting and a CI setup that validates code quality before a release is cut.",
    ],
    result: [
      "A provider-independent Go library that returns typed values with explainability and confidence instead of raw JSON guesses. The project is published with documentation and module-level versioning so it can be adopted with a clear upgrade path.",
      "The core remains zero-dependency and cross-compiles cleanly, while OCR, model and renderer integrations stay optional and separate. That means a user can adopt exactly the parts of the stack they need without introducing a dependency graph for the parts they do not.",
    ],
    screenshots: [
      {
        src: "/images/projects/ovrin/01-home.webp",
        alt: "The Ovrin documentation landing page, headlined \u201cTurn documents into trusted structured data\u201d, beside a Go struct showing typed invoice fields.",
        caption: "Landing page — a struct in, a struct out: documents become typed, validated Go values",
      },
      {
        src: "/images/projects/ovrin/02-learn.webp",
        alt: "The overview page explaining why Ovrin uses a staged extraction pipeline instead of one monolithic model call.",
        caption: "Overview — why a staged pipeline beats sending a PDF to a model and parsing the JSON",
      },
      {
        src: "/images/projects/ovrin/03-reference.webp",
        alt: "The reference page for Extract, showing its signature, what it does, and its two failure channels.",
        caption: "Extract[T] — the central entry point, its signature and its two separate failure channels",
      },
      {
        src: "/images/projects/ovrin/04-release.webp",
        alt: "The release status page, with a table of what version 1.0.0 promises and the status of each claim.",
        caption: "Release status — what v1.0.0 promises, claim by claim, and what it deliberately does not",
      },
    ],
    diagram: "ovrin",
    tags: ["Go", "PDF Extraction", "OCR", "Structured Data", "Confidence Scoring", "Provenance", "Open Source"],
    links: [
      { label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/ovrin" },
      { label: "Documentation", href: "https://ovrin-docs.vercel.app/" },
      { label: "pkg.go.dev", href: "https://pkg.go.dev/github.com/BAGOMBEKA-JOB-DEV/ovrin" },
    ],
  },
  {
    id: 8,
    kind: "open-source",
    badge: "Apache-2.0 · alpha",
    name: "Shiin — Authorization for AI Agent Actions",
    subtitle: "Open-source Rust workspace, sole author",
    role: "Author and maintainer",
    situation: [
      "An AI coding agent runs with the full authority of the person who started it. An agent that can edit files can delete them, an agent that can run tests can run any command, and an agent that can fetch documentation can reach any host the machine can reach. It can also be talked into things by text it reads.",
      "The deeper problem is that standing access is always broader than the task in hand. Asked to fix a login bug in src/auth/, an agent still holds permission to rewrite migrations/ — not because anyone intended it, but because permissions are granted to the person, not to the task.",
    ],
    task: [
      "Build an authorization layer that sits between any agent and what it acts on, and answers one question per proposed action: allow, deny, or hold for a human.",
      "Make the answer provable. A security reviewer should be able to read a specification and predict the decision, and a replay of the same inputs must reproduce it exactly — which rules out letting a language model anywhere near the decision.",
    ],
    action: [
      "Designed the engine so that permission has exactly one source. Five stages run in a fixed order — identity, capability, policy, intent, risk — and four of them are gates: they may deny, hold, or pass, but can never allow. Only a policy rule, or a grant an approver created, permits anything; every later stage can only make the result stricter.",
      "Made determinism structural rather than aspirational. The engine is pure and synchronous, performs no I/O, and its inputs are exactly five: the action request, an immutable policy snapshot identified by a digest, the active task, the evaluation mode and the current time. It may read nothing else, so the same inputs always produce the same decision and replay reproduces it exactly.",
      "Bound actions to the task the developer actually confirmed, through a closed set of machine-checkable constraints — path scope, forbidden action types, allowed hosts, budgets for writes and deletions, action types that always need approval, and an expiry. The human-readable description is recorded but never evaluated, because a constraint that cannot be checked is not a control.",
      "Took fail-closed seriously everywhere: any failure inside evaluation denies, a failed audit write denies the action it was recording, and when no approver can be reached a pending decision becomes a denial rather than a hang. Policy is authored in TOML and compiled to Cedar, so rules stay analyzable instead of becoming code.",
      "Wrote the contract down so other hosts can implement it: versioned specifications with JSON schemas and conformance vectors for the action request, the decision, evaluation, intent binding and the approval protocol, backed by 44 architecture decision records covering the load-bearing choices.",
    ],
    result: [
      "A 12-crate Rust workspace shipping v0.1.0-alpha.1: a policy engine, CLI, Unix approval daemon, hash-chained audit log with signed receipts and offline verification, a Rust client, an MCP proxy and a command wrapper, with adapters for Claude Code, Codex CLI and Cursor.",
      "Six CI workflows carry the posture the project claims — parser fuzzing, Miri, fault injection, a replay corpus, SBOM generation and link health — and the documentation is deliberately candid about the edges: the audit log is tamper-evident rather than tamper-proof, hook adapters are cooperative, and the identity stage still passes through.",
    ],
    screenshots: [
      {
        src: "/images/projects/shiin/01-intro.webp",
        alt: "The Shiin documentation home page, with a pre-alpha status note and a table separating what exists today from what is specified and what is still open.",
        caption: "Introduction — what exists today, what is only specified, and what is still open",
      },
      {
        src: "/images/projects/shiin/02-pipeline.webp",
        alt: "The \u201cHow Shiin works\u201d page, numbering the path of a single action from the agent proposing it to the adapter enforcing the result.",
        caption: "How Shiin works — the path of one action, from proposal to enforcement",
      },
      {
        src: "/images/projects/shiin/03-decisions.webp",
        alt: "The decisions page, defining allow, deny and pending, and the stable machine-readable reason codes attached to each.",
        caption: "Decisions — allow, deny and pending, each with a stable machine-readable reason code",
      },
      {
        src: "/images/projects/shiin/04-quickstart.webp",
        alt: "The Claude Code quickstart, walking through writing a first policy and connecting the hook.",
        caption: "Quickstart — write one policy, connect the hook, and watch a real action get refused",
      },
    ],
    diagram: "shiin",
    tags: ["Rust", "Cedar", "Policy Engine", "MCP", "Ed25519", "Fuzzing", "Apache-2.0"],
    links: [
      { label: "Documentation", href: "https://bagombeka-job-dev.github.io/shiin/" },
      { label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/shiin" },
      { label: "v0.1.0-alpha.1", href: "https://github.com/BAGOMBEKA-JOB-DEV/shiin/releases/tag/v0.1.0-alpha.1" },
    ],
  },
  {
    id: 10,
    kind: "open-source",
    badge: "MIT · v1.0.0",
    name: "Vuewind — 60 Vue 3 Components With a Contract That Cannot Drift",
    subtitle: "Open-source Vue component library, sole author",
    role: "Author and maintainer",
    situation: [
      "Every component library eventually tells the same lie. The props table says one thing, the component emits another, the TypeScript declarations were hand-written six releases ago, and the example in the README no longer compiles. Nothing is broken enough to fail a build, so nothing gets fixed, and the documentation quietly becomes folklore.",
      "The second lie is the package itself. A library is developed inside a repository full of build tooling and demo dependencies, but what a consumer installs is a tarball. The two are rarely verified to be the same thing, which is why an install can pull a documentation dependency tree, or ship declarations that point at files the tarball does not contain.",
    ],
    task: [
      "Build a usable set of Vue 3 components where the documented contract cannot disagree with the implementation — not by convention or review discipline, but because disagreement fails the build.",
      "Make the published artefact provable: what a consumer installs has to be tested as a consumer receives it, not as it exists in the working tree.",
    ],
    action: [
      "Each component has one API record holding its description, props, events, notes and keyboard contract. Three things derive from that single record: the documentation table, the TypeScript declarations, and a contract test. The generator can be run in check mode, so stale declarations fail CI rather than being regenerated silently.",
      "The contract test closes the loop in the other direction. It parses the defineEmits call out of each single-file component and asserts the documented events match the implementation exactly, alongside checks that every record has a component, a runnable example and an export. Documentation drift is a build failure, not a stale page.",
      "The release gate builds the real tarball, installs it into a temporary directory with no network access, then compiles all 60 examples through both ESM and CommonJS, server-renders them, and type-checks them against the generated declarations. It also asserts the dependency list is empty — the documentation tree, which includes charting, spreadsheet and map libraries, never reaches a consumer.",
      "Controls are built on native elements rather than reimplemented: a real dialog element for modals, native disclosure and form controls, and color-scheme declared in the token layer so the browser's own widgets follow the theme. Theming is a set of semantic CSS custom properties, so an application retints the library without overriding individual components.",
      "Publishing is a manual workflow dispatch — never on push or pull request. It refuses to run unless the requested version matches package.json and version-specific release notes exist, and it offers a dry run and a staged mode that waits for account approval with two-factor authentication rather than holding a token that can publish silently.",
    ],
    result: [
      "60 components in roughly 1,500 lines of single-file components over a 1,400-line token and style layer, with 60 runnable examples and 283 passing tests covering contracts, compilation, server rendering and the packaged tarball.",
      "Browser checks drive Chrome directly over the DevTools Protocol using only Node built-ins and Vite, so verifying keyboard behaviour, theming and responsive layout adds no test-framework dependency to the project.",
      "The documentation is candid about what the project is not. The research record states plainly that this is a development foundation rather than a claim of feature parity or accessibility certification, lists wider assistive-technology testing, RTL and localisation as outstanding, and the accessibility page repeats it: native controls are a foundation, not independent certification.",
      "Version 1.0.0 is cut, release-gated and awaiting npm account approval, so the package is installable today from the verified GitHub release archive rather than the registry.",
    ],
    screenshots: [
      {
        src: "/images/projects/vuewind/01-introduction.webp",
        alt: "The Vuewind documentation home page, headlined \u201cGood ideas deserve great components\u201d, with counts for 60 components, open source and the design language.",
        caption: "Introduction — 60 components, one design language, MIT licensed",
        width: 1366,
        height: 615,
      },
      {
        src: "/images/projects/vuewind/02-installation.webp",
        alt: "The installation page, showing the npm install command and a notice that version 1.0.0 is awaiting npm account approval and should be installed from the GitHub release archive.",
        caption: "Installation — and a notice saying plainly that the registry publish is still pending",
        width: 1366,
        height: 615,
      },
      {
        src: "/images/projects/vuewind/03-theming.webp",
        alt: "The theming page, explaining that every component uses semantic CSS custom properties so one token controls a surface, border or primary colour everywhere it appears.",
        caption: "Theming — semantic tokens, so one decision retints every component at once",
        width: 1366,
        height: 615,
      },
      {
        src: "/images/projects/vuewind/04-components.webp",
        alt: "The component catalog, with category filters, a search field and a grid of the 60 components.",
        caption: "The catalog — 60 components, filterable by category and searchable",
        width: 1366,
        height: 615,
      },
    ],
    diagram: "vuewind",
    tags: ["Vue 3", "TypeScript", "Design System", "CSS Tokens", "SSR", "Vite", "npm Packaging", "MIT"],
    links: [
      { label: "Documentation", href: "https://vuewind-two.vercel.app/" },
      { label: "Components", href: "https://vuewind-two.vercel.app/components" },
      { label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/vuewind" },
    ],
  },
  {
    id: 6,
    kind: "personal",
    name: "Cullo — Subscription Intelligence",
    subtitle: "React Native mobile app and Laravel API",
    role: "Sole author",
    summary: [
      "A subscription tracker built around the observation that people do not lose money to the subscriptions they remember — they lose it to the ones they forget. The Expo app opens on an intuitive, low-friction dashboard that makes recurring costs visible before they become a problem.",
      "The Laravel 13 API is where the actual product lives. A cascading alert engine schedules warnings from minutes to months ahead of a renewal, with system defaults a user can override per subscription, so the app gets both automation and control without becoming noisy.",
      "The client is deliberately more finished than a side project needs to be: a small design system of typed components, haptics on every meaningful interaction, glassmorphic confirmation modals and a state model built to feel stable even when data is changing under the user.",
    ],
    diagram: "cullo",
    tags: ["React Native", "Expo", "TypeScript", "Laravel 13", "PostgreSQL", "WebSockets"],
    links: [
      { label: "Mobile app", href: "https://github.com/BAGOMBEKA-JOB-DEV/cullof" },
      { label: "Backend API", href: "https://github.com/BAGOMBEKA-JOB-DEV/cullob" },
    ],
  },
  {
    id: 7,
    kind: "personal",
    name: "Loam — International Agricultural Marketplace",
    subtitle: "Cross-border B2B marketplace platform",
    role: "Sole author",
    summary: [
      "A marketplace connecting agricultural buyers and vendors, built around a request-for-quotation workflow rather than fixed-price listings — because agricultural trade is negotiated on volume, timing and trust, not just a price tag in a catalogue.",
      "Access is governed by dynamic role-based access control: roles and granular permissions are created and assigned at runtime rather than hard-coded, so the platform can add a role without a code and deployment cycle for every new permission model.",
      "Built as a Laravel 11 API with Sanctum token authentication and a Vue 3 Composition API front end using Pinia for state and route-level auth guards, with tiered subscriptions gating marketplace access and feature exposure based on where the user sits in the commercial flow.",
    ],
    diagram: "loam",
    tags: ["Laravel 11", "Vue 3", "Pinia", "Tailwind CSS", "PostgreSQL", "RBAC"],
    links: [{ label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/loam" }],
  },
  {
    id: 9,
    kind: "personal",
    name: "Carevelo — White-Label Digital Health for Private Clinics",
    subtitle: "Laravel platform for Uganda's licensed private clinics",
    role: "Sole author",
    summary: [
      "Uganda's private clinics hold the licences, the pharmacy, the clinicians and the neighbourhood's trust, but no digital front door — paper records, cash or an unreconciled personal mobile-money number, and no way to consult a patient who cannot travel. Vertically-integrated telemedicine providers are taking the convenient urban patient away from them. Carevelo sells those clinics the missing capability instead of competing with them: booking, teleconsultation, e-prescribing, a dispensing queue, delivery dispatch and mobile-money collection, all under the clinic's own brand and its own licences.",
      "That positioning is a structural decision, not modesty, and it is enforced in the architecture. Carevelo is a software supplier and data processor only: it never employs clinicians, and it never takes custody of money. Payments are initiated with the clinic's own merchant credentials at a Bank-of-Uganda-licensed aggregator and settle directly to the clinic, so the funds never pass through Carevelo — which keeps an entire licensing regime out of scope.",
      "Built as a Laravel modular monolith with a Next.js front end, because one person cannot operate a distributed system. Tenant isolation is a database guarantee rather than a convention: shared-schema PostgreSQL with row-level security. Both realtime transports are self-hosted — Laravel Reverb for application frames, LiveKit for consultation media — so health data stays in region, and consultations are never recorded, so there is no store of consultation media to breach. Queues are split by urgency in Horizon so an SMS backlog cannot delay a payment webhook, and sessions are Sanctum cookies rather than tokens in local storage on pages that render health data. 13 architecture decision records and 62 documents record why each boundary is where it is.",
    ],
    diagram: "carevelo",
    tags: [
      "Laravel",
      "Next.js",
      "PostgreSQL RLS",
      "Redis · Horizon",
      "Laravel Reverb",
      "LiveKit",
      "Mobile Money",
      "Multi-Tenancy",
    ],
    links: [{ label: "GitHub", href: "https://github.com/BAGOMBEKA-JOB-DEV/carevelo" }],
  },
];

export default projectsList;
