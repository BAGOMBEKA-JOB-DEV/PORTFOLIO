import type { Project } from "types/Sections";

// NOTE: figures below come from Bagombeka Job's CV and LinkedIn. Anything marked
// [VERIFY] is inferred from surrounding context and must be confirmed before shipping.
const projectsList: Project[] = [
  {
    id: 1,
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
    id: 3,
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
];

export default projectsList;
