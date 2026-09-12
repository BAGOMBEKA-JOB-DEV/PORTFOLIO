import { Boundary, Edge, External, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * EMIS — C4 Container diagram.
 *
 * Drawn strictly from the case-study copy in data/projects.ts. The load-bearing
 * claim is that identity verification sits *inside* the write path rather than
 * in a downstream cleanup pass, so the ingestion gate is the accent element and
 * every write passes through it.
 *
 * The dashed enclosures are trust boundaries in the DFD sense: flows crossing
 * them are labelled with the data they carry, because this platform transits
 * national identity records for 30M+ children.
 *
 * Laid out in full-width horizontal bands rather than side-by-side columns, so
 * the whole drawing fits the article column without horizontal scrolling.
 */

const AGENCIES: [string, string][] = [
  ["NIRA", "national identity"],
  ["UNEB", "examinations"],
  ["TMIS", "teacher management"],
  ["Office of the Prime Minister", "cross-agency data"],
  ["Ministry of Finance", "budget and planning"],
];

const emis = {
  label:
    "EMIS container diagram: national identity verification gates every write, a district officer approves before aggregation, and five agency integrations sit behind tolerant clients",
  title: "National EMIS — Container diagram, scope: the learner and workforce platform",
  desc: "Container diagram of Uganda's national Education Management Information System. Schools and district education officers authenticate with OAuth 2.0 and enter learner, staffing and facility data through a Vue 3 client into the Laravel learners module. Every write passes through an ingestion gate that calls NIRA, the National Identification and Registration Authority, to verify identity before the record is accepted, so duplicates are rejected at source rather than cleaned up downstream. A District Education Officer then reviews each school submission and approves or rejects it before anything aggregates upward, with every decision written to an audit log. Accepted records land in a PostgreSQL schema exceeding 1,000 tables that also backs the HR, administrative units, infrastructure and water and sanitation modules. Long-running imports, exports and notifications run on queue-backed workers outside the request cycle. Integration services written in Laravel, Go and Python FastAPI connect NIRA, UNEB, TMIS, the Office of the Prime Minister and the Ministry of Finance behind deliberately tolerant clients that apply retries, timeouts, idempotency keys and reconciliation, so a partner outage degrades a sync rather than corrupting local data. A separate unauthenticated read-only path serves public search across more than 90,000 school records.",
  viewBox: "0 0 880 940",
  minWidth: 860,
  body: (
    <>
      {/* ---------- band 1: actors and the authenticated platform ---------- */}
      <Node x={16} y={58} w={150} h={56} name="School" kind="Person" tech="submits own data" />
      <Node x={16} y={130} w={150} h={56} name="District officer" kind="Person" tech="DEO — reviews" />
      <Node x={16} y={236} w={150} h={54} name="Citizen" kind="Person" tech="unauthenticated" />

      <Edge d="M 170 86 L 192 86" label="OAuth 2.0" lx={181} ly={48} />
      <Edge d="M 170 158 L 192 158" label="OAuth 2.0" lx={181} ly={210} />

      <Boundary
        x={196}
        y={20}
        w={668}
        h={366}
        label="trust boundary — authenticated, role-scoped, audit-logged"
        accent
      />

      <Node
        x={216}
        y={56}
        w={186}
        h={70}
        name="Learners module"
        kind="Container"
        tech="Laravel · Vue 3"
        note="national registration"
      />

      <Edge d="M 406 91 L 428 91" label="learner record" lx={417} ly={44} />

      <Node
        x={432}
        y={56}
        w={172}
        h={70}
        name="Ingestion gate"
        kind="Component"
        tech="on-write check"
        note="rejects duplicates"
        accent
      />

      <Edge d="M 608 91 L 630 91" label="submission" lx={619} ly={44} />

      <Node
        x={634}
        y={56}
        w={186}
        h={70}
        name="DEO review"
        kind="Component"
        tech="approval gate"
        note="approve · query · reject"
      />

      <Edge d="M 727 130 L 727 176" label="approved only" lx={735} ly={158} anchor="start" />

      <Node
        x={216}
        y={160}
        w={186}
        h={66}
        name="Queue workers"
        kind="Container"
        tech="imports · exports"
        note="outside request cycle"
      />

      <Store x={432} y={180} w={210} h={76} name="PostgreSQL" tech="1,000+ tables · 30M+ learners" />

      <Edge d="M 518 130 L 518 176" label="write · verified" lx={510} ly={158} anchor="end" />
      <Edge d="M 406 200 L 428 210" label="bulk load" lx={414} ly={244} anchor="start" />

      <Store x={216} y={252} w={186} h={64} name="Audit log" tech="who approved what, when" />

      <text x={216} y={340} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        reading the same store: HR · Admin Units · Infrastructure · Water &amp; Sanitation
      </text>
      <text x={216} y={356} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        role scopes: ministry HQ · district · school — each sees only its own data
      </text>
      <text x={216} y={372} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        server-side pagination and query optimisation · SRS, ERDs and ADRs are the reference spec
      </text>

      {/* ---------- band 2: the public read path ---------- */}
      <Boundary x={196} y={406} w={668} h={96} label="public — unauthenticated, read-only" />

      <Node x={216} y={432} w={250} h={56} name="Public school search" kind="Container" tech="90,000+ school records" />

      <Edge d="M 170 280 L 212 428" label="search, no login" lx={16} ly={330} anchor="start" />
      <Edge d="M 500 428 L 520 262" label="published fields only" lx={530} ly={404} anchor="start" />

      {/* ---------- band 3: agency integrations ---------- */}
      <Edge d="M 830 130 L 830 522" label="verify identity" lx={822} ly={300} anchor="end" />

      <Boundary x={196} y={526} w={668} h={196} label="external agencies — behind deliberately tolerant clients" />

      {AGENCIES.map(([name, what], i) => (
        <External
          key={name}
          x={216 + (i % 3) * 216}
          y={558 + Math.floor(i / 3) * 66}
          w={200}
          h={48}
          name={name}
          note={what}
        />
      ))}

      <text x={664} y={640} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        retries · timeouts
      </text>
      <text x={664} y={656} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        idempotency keys
      </text>
      <text x={664} y={672} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        reconciliation
      </text>
      <text x={216} y={700} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        integration services: Laravel · Go · Python FastAPI — a partner outage degrades a sync, it does not corrupt
        local data
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={754}
        items={[
          { shape: "solid arrow", means: "synchronous call, labelled with what crosses" },
          { shape: "dashed box", means: "trust boundary — authorisation changes here" },
          { shape: "cylinder", means: "datastore" },
          { shape: "stadium", means: "external agency, outside this platform" },
          { shape: "teal fill", means: "the ingestion gate — identity is verified before a write lands" },
          { shape: "[Type: tech]", means: "C4 element type and its technology" },
          { shape: "NIRA", means: "National Identification and Registration Authority" },
          { shape: "UNEB", means: "Uganda National Examinations Board" },
          { shape: "TMIS", means: "Teacher Management Information System" },
          { shape: "DEO", means: "District Education Officer" },
        ]}
      />
    </>
  ),
};

export default emis;
