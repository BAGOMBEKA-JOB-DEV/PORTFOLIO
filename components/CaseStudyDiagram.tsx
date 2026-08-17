/**
 * Architecture diagrams for the closed-source case studies.
 *
 * Hand-authored SVG rather than images: themeable through currentColor, a few
 * hundred bytes, sharp at any zoom, and no extra request.
 *
 * [VERIFY] These are drafted from the case study copy, not from the systems
 * themselves. Correct anything that misrepresents the real architecture — a
 * wrong diagram is worse than none, because it is what an interviewer will
 * point at and ask about.
 */

type DiagramKey = "emis" | "impala" | "messaging" | "skyl" | "cullo" | "agriculture";

const boxClass = "fill-transparent stroke-neutral-900/25 dark:stroke-neutral-50/25";
const accentBoxClass = "fill-teal-600/10 dark:fill-teal-400/10 stroke-teal-600 dark:stroke-teal-400";
const labelClass = "fill-neutral-700 dark:fill-neutral-300 text-[13px] font-medium";
const accentLabelClass = "fill-teal-700 dark:fill-teal-400 text-[13px] font-semibold";
const mutedClass = "fill-neutral-500 dark:fill-neutral-500 text-[11px]";
const lineClass = "stroke-neutral-900/30 dark:stroke-neutral-50/30";

const Arrow = () => (
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" className="fill-neutral-900/30 dark:fill-neutral-50/30" />
  </marker>
);

const Box: React.FC<{ x: number; y: number; w: number; h: number; accent?: boolean }> = ({
  x,
  y,
  w,
  h,
  accent = false,
}) => <rect x={x} y={y} width={w} height={h} rx="6" className={accent ? accentBoxClass : boxClass} />;

const Line: React.FC<{ d: string }> = ({ d }) => (
  <path d={d} className={lineClass} fill="none" markerEnd="url(#arrow)" />
);

const diagrams: Record<DiagramKey, { label: string; title: string; desc: string; body: React.ReactNode }> = {
  emis: {
    label: "EMIS architecture: identity verification sits inside the write path",
    title: "EMIS ingestion path",
    desc: "School and district submissions pass through the learners module, where NIRA (the National Identification and Registration Authority) identity verification gates every write before it reaches PostgreSQL. Human resources, role-based access control, reporting and public search read from the same store.",
    body: (
      <>
        <Box x={8} y={54} w={118} h={40} />
        <text x={67} y={78} textAnchor="middle" className={labelClass}>
          School / District
        </text>

        <Line d="M 130 74 L 166 74" />

        <Box x={170} y={54} w={118} h={40} />
        <text x={229} y={78} textAnchor="middle" className={labelClass}>
          Learners module
        </text>

        <Line d="M 292 74 L 328 74" />

        <Box x={332} y={54} w={118} h={40} accent />
        <text x={391} y={71} textAnchor="middle" className={accentLabelClass}>
          Validate
        </text>
        <text x={391} y={87} textAnchor="middle" className={mutedClass}>
          at ingestion
        </text>

        <Line d="M 391 98 L 391 128" />
        <Box x={332} y={132} w={118} h={36} />
        <text x={391} y={155} textAnchor="middle" className={labelClass}>
          NIRA identity
        </text>

        <Line d="M 454 74 L 490 74" />

        <Box x={494} y={44} w={130} h={60} />
        <text x={559} y={69} textAnchor="middle" className={labelClass}>
          PostgreSQL
        </text>
        <text x={559} y={87} textAnchor="middle" className={mutedClass}>
          1,000+ tables
        </text>

        <Line d="M 559 108 L 559 132" />
        <text x={559} y={150} textAnchor="middle" className={mutedClass}>
          HR · RBAC · Reporting
        </text>
        <text x={559} y={166} textAnchor="middle" className={mutedClass}>
          Public search (90k schools)
        </text>
      </>
    ),
  },

  impala: {
    label: "IMPALA LITE2 architecture: control plane, per-tenant isolation and an event outbox",
    title: "IMPALA LITE2 tenancy model",
    desc: "A control plane onboards and bills tenants. Each tenant runs on its own subdomain over schema-per-tenant PostgreSQL with row-level security. A transactional outbox publishes to Pub/Sub, and the double-entry general ledger feeds per-country fiscalisation — EFRIS (the Electronic Fiscal Receipting and Invoicing Solution) in Uganda, MRA (the Malawi Revenue Authority) in Malawi.",
    body: (
      <>
        <Box x={8} y={20} w={130} h={40} accent />
        <text x={73} y={44} textAnchor="middle" className={accentLabelClass}>
          Control plane
        </text>

        <Line d="M 142 40 L 186 40" />
        <text x={164} y={32} textAnchor="middle" className={mutedClass}>
          onboard
        </text>

        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Box x={190 + i * 108} y={20} w={98} h={40} />
            <text x={239 + i * 108} y={44} textAnchor="middle" className={labelClass}>
              tenant-{String.fromCharCode(97 + i)}
            </text>
            <Line d={`M ${239 + i * 108} 64 L ${239 + i * 108} 92`} />
          </g>
        ))}

        <Box x={190} y={96} w={314} h={44} />
        <text x={347} y={114} textAnchor="middle" className={labelClass}>
          Schema-per-tenant PostgreSQL
        </text>
        <text x={347} y={130} textAnchor="middle" className={mutedClass}>
          row-level security · Keycloak OIDC
        </text>

        <Line d="M 347 144 L 347 168" />

        <Box x={190} y={172} w={150} h={38} />
        <text x={265} y={195} textAnchor="middle" className={labelClass}>
          Outbox → Pub/Sub
        </text>

        <Box x={354} y={172} w={150} h={38} accent />
        <text x={429} y={189} textAnchor="middle" className={accentLabelClass}>
          Double-entry GL
        </text>
        <text x={429} y={204} textAnchor="middle" className={mutedClass}>
          EFRIS · MRA
        </text>

        <Line d="M 508 191 L 544 191" />
        <text x={600} y={188} textAnchor="middle" className={mutedClass}>
          44 domain modules
        </text>
        <text x={600} y={202} textAnchor="middle" className={mutedClass}>
          471 routes
        </text>
      </>
    ),
  },

  messaging: {
    label: "Bulk SMS architecture: ingestion decoupled from dispatch by a Kafka log",
    title: "Bulk SMS delivery pipeline",
    desc: "Bulk uploads are ingested and written to Kafka. Worker consumers dispatch through SMPP (Short Message Peer-to-Peer) gateways independently, so a backlog degrades throughput instead of losing messages. Prometheus and Grafana observe ingest rate, consumer lag and delivery outcomes.",
    body: (
      <>
        <Box x={8} y={54} w={112} h={40} />
        <text x={64} y={78} textAnchor="middle" className={labelClass}>
          Bulk upload
        </text>

        <Line d="M 124 74 L 158 74" />

        <Box x={162} y={54} w={112} h={40} />
        <text x={218} y={71} textAnchor="middle" className={labelClass}>
          Ingestion
        </text>
        <text x={218} y={87} textAnchor="middle" className={mutedClass}>
          25M+ contacts
        </text>

        <Line d="M 278 74 L 312 74" />

        <Box x={316} y={54} w={112} h={40} accent />
        <text x={372} y={78} textAnchor="middle" className={accentLabelClass}>
          Kafka
        </text>

        <Line d="M 432 74 L 466 74" />

        <Box x={470} y={54} w={112} h={40} />
        <text x={526} y={71} textAnchor="middle" className={labelClass}>
          Workers
        </text>
        <text x={526} y={87} textAnchor="middle" className={mutedClass}>
          dispatch
        </text>

        <Line d="M 586 74 L 620 74" />

        <Box x={624} y={54} w={112} h={40} />
        <text x={680} y={78} textAnchor="middle" className={labelClass}>
          SMS gateway
        </text>

        <Line d="M 372 98 L 372 134" />
        <Box x={280} y={138} w={184} h={44} />
        <text x={372} y={157} textAnchor="middle" className={labelClass}>
          Prometheus → Grafana
        </text>
        <text x={372} y={173} textAnchor="middle" className={mutedClass}>
          ingest rate · consumer lag · delivery
        </text>
      </>
    ),
  },

  skyl: {
    label: "skyl architecture: one Go interface in front of every model provider",
    title: "skyl provider abstraction",
    desc: "A Go service talks to one Request/Response shape. Provider adapters translate it for Anthropic, OpenAI, Gemini and 400+ other models, so switching vendor is a one-line change. The HTTP gateway and OpenTelemetry integration are separate modules, so importing the library pulls in neither.",
    body: (
      <>
        <Box x={8} y={64} w={130} h={40} />
        <text x={73} y={88} textAnchor="middle" className={labelClass}>
          Your Go service
        </text>

        <Line d="M 142 84 L 166 84" />

        <Box x={170} y={54} w={152} h={60} accent />
        <text x={246} y={79} textAnchor="middle" className={accentLabelClass}>
          skyl
        </text>
        <text x={246} y={97} textAnchor="middle" className={mutedClass}>
          one Request/Response
        </text>

        <Line d="M 326 84 L 350 84" />

        <Box x={354} y={64} w={140} h={40} />
        <text x={424} y={88} textAnchor="middle" className={labelClass}>
          Provider adapters
        </text>

        <Line d="M 498 84 L 522 84" />

        {["Anthropic", "OpenAI", "Gemini · 400+"].map((provider, i) => (
          <g key={provider}>
            <Box x={526} y={40 + i * 46} w={150} h={34} />
            <text x={601} y={62 + i * 46} textAnchor="middle" className={labelClass}>
              {provider}
            </text>
          </g>
        ))}

        <Line d="M 246 118 L 246 146" />
        <Box x={170} y={150} w={152} h={44} />
        <text x={246} y={169} textAnchor="middle" className={labelClass}>
          gateway · otel
        </text>
        <text x={246} y={185} textAnchor="middle" className={mutedClass}>
          separate modules
        </text>
      </>
    ),
  },

  cullo: {
    label: "Cullo architecture: Expo client, Laravel API and real-time alerts over WebSockets",
    title: "Cullo alert pipeline",
    desc: "The Expo app talks to a Laravel API backed by PostgreSQL with UUID primary keys. Queue workers evaluate the cascading alert schedule and publish through Laravel Reverb, so renewal warnings reach the device in real time.",
    body: (
      <>
        <Box x={8} y={54} w={130} h={40} />
        <text x={73} y={78} textAnchor="middle" className={labelClass}>
          Expo app
        </text>

        <Line d="M 142 74 L 176 74" />

        <Box x={180} y={54} w={144} h={40} />
        <text x={252} y={78} textAnchor="middle" className={labelClass}>
          Laravel 13 API
        </text>

        <Line d="M 328 74 L 362 74" />

        <Box x={366} y={44} w={140} h={60} />
        <text x={436} y={69} textAnchor="middle" className={labelClass}>
          PostgreSQL
        </text>
        <text x={436} y={87} textAnchor="middle" className={mutedClass}>
          UUID keys
        </text>

        <Line d="M 252 98 L 252 130" />

        <Box x={180} y={134} w={144} h={40} />
        <text x={252} y={158} textAnchor="middle" className={labelClass}>
          Queue workers
        </text>

        <Line d="M 328 154 L 362 154" />

        <Box x={366} y={134} w={150} h={40} accent />
        <text x={441} y={158} textAnchor="middle" className={accentLabelClass}>
          Reverb WebSockets
        </text>

        <Line d="M 366 192 L 73 192 L 73 100" />
        <text x={220} y={208} textAnchor="middle" className={mutedClass}>
          real-time renewal alerts
        </text>
      </>
    ),
  },

  agriculture: {
    label: "Agricultural Marketplace architecture: an RFQ workflow governed by runtime role-based access control",
    title: "Agricultural Marketplace RFQ flow",
    desc: "Buyers publish requests for quotation and vendors respond with quotes, rather than trading on fixed-price listings. A Laravel API backs the exchange, and dynamic role-based access control assigns roles and permissions at runtime across admin, vendor and buyer.",
    body: (
      <>
        <Box x={8} y={40} w={116} h={38} />
        <text x={66} y={64} textAnchor="middle" className={labelClass}>
          Buyer
        </text>

        <Box x={8} y={106} w={116} h={38} />
        <text x={66} y={130} textAnchor="middle" className={labelClass}>
          Vendor
        </text>

        <Line d="M 128 59 L 158 76" />
        <Line d="M 128 125 L 158 108" />

        <Box x={162} y={62} w={158} h={60} accent />
        <text x={241} y={87} textAnchor="middle" className={accentLabelClass}>
          RFQ workflow
        </text>
        <text x={241} y={105} textAnchor="middle" className={mutedClass}>
          request → quote → order
        </text>

        <Line d="M 324 92 L 352 92" />

        <Box x={356} y={62} w={150} h={60} />
        <text x={431} y={87} textAnchor="middle" className={labelClass}>
          Laravel 11 API
        </text>
        <text x={431} y={105} textAnchor="middle" className={mutedClass}>
          Vue 3 · Pinia client
        </text>

        <Line d="M 510 92 L 538 92" />

        <Box x={542} y={62} w={134} h={60} />
        <text x={609} y={97} textAnchor="middle" className={labelClass}>
          PostgreSQL
        </text>

        <Line d="M 431 126 L 431 152" />

        <Box x={356} y={156} w={150} h={44} />
        <text x={431} y={175} textAnchor="middle" className={labelClass}>
          Dynamic RBAC
        </text>
        <text x={431} y={191} textAnchor="middle" className={mutedClass}>
          roles assigned at runtime
        </text>
      </>
    ),
  },
};

const CaseStudyDiagram: React.FC<{ name: DiagramKey }> = ({ name }) => {
  const diagram = diagrams[name];

  if (!diagram) return null;

  return (
    // Scrolls on phones rather than shrinking: a 760-wide viewBox squeezed into
    // 320px renders labels at ~40% size, which is unreadable.
    <div className="no-scrollbar mt-6 -mx-1 overflow-x-auto">
      <svg role="img" aria-label={diagram.label} viewBox="0 0 760 220" className="w-full min-w-[620px] h-auto">
        <title>{diagram.title}</title>
        <desc>{diagram.desc}</desc>
        <defs>
          <Arrow />
        </defs>
        {diagram.body}
      </svg>
    </div>
  );
};

export default CaseStudyDiagram;
