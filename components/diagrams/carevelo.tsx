import { Boundary, Edge, External, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * Carevelo — C4 Container diagram.
 *
 * Drawn from the repository's own documents:
 *   - the "arms dealer, not combatant" split and the three permanent
 *     boundaries: README.md
 *   - payments initiated with the clinic's credentials, never held:
 *     docs/70-decisions/0003-non-custodial-payment-architecture.md
 *   - shared-schema PostgreSQL with row-level security:
 *     docs/70-decisions/0002-postgresql-rls-shared-schema-tenancy.md
 *   - modular monolith over microservices: 0005; self-hosted Reverb: 0008
 *   - self-hosted LiveKit, and consultations never recorded:
 *     docs/70-decisions/0004-video-provider-selection.md
 *   - cookie sessions rather than bearer tokens on pages rendering health
 *     data: docs/40-api/authentication-and-sessions.md
 *   - stack table and data residency: README.md, docs/30-architecture/
 *
 * The claim the picture makes is the regulatory one: everything licensed sits
 * with the clinic, and the money arrow never touches Carevelo. That is why the
 * settlement edge runs around the platform rather than through it.
 */

const SUPPLIED = [
  "booking · teleconsultation",
  "records · e-prescribing",
  "dispensing queue · dispatch",
  "payment initiation, never custody",
];

/** The four things that stay with the clinic. Each one is a licence or a legal
 *  status Carevelo deliberately does not hold. */
const HELD: { name: string; note: string }[] = [
  { name: "UMDPC", note: "clinician registration" },
  { name: "NDA", note: "pharmacy licence" },
  { name: "Merchant account", note: "the clinic's own" },
  { name: "Data controller", note: "the clinic, not us" },
];

const carevelo = {
  label:
    "Carevelo container diagram: the clinic keeps every licence and its merchant account, Carevelo supplies software only, and settled funds bypass the platform entirely",
  title: "Carevelo — Container diagram, scope: one clinic's branded deployment",
  desc: "Container diagram of Carevelo, white-label digital health software for Uganda's licensed private clinics. A patient uses the clinic's own branded Next.js front end to book, join a teleconsultation and pay by mobile money. Clinic staff and clinicians work from the same front end against a Laravel modular monolith, chosen because one person cannot operate a distributed system. Tenant isolation is a database guarantee rather than a convention: a shared PostgreSQL schema with row-level security. Redis and Horizon split queues by urgency so an SMS backlog cannot delay a payment webhook, and both realtime transports are self-hosted — Laravel Reverb for application frames and LiveKit for consultation media — to keep health data in region. Consultations are never recorded, so there is no store of consultation media to breach. The regulatory boundary is the point of the design: the clinic holds its UMDPC clinician registration, its NDA pharmacy licence, its own merchant account and data-controller status, while Carevelo is a software supplier and data processor only. Payments are initiated with the clinic's own credentials at a Bank-of-Uganda-licensed aggregator, and settled funds move directly from the aggregator to the clinic without passing through Carevelo, which keeps an entire licensing regime out of scope. An immutable audit log records access to health data.",
  viewBox: "0 0 880 880",
  minWidth: 860,
  body: (
    <>
      {/* ---------- people ---------- */}
      <Node x={16} y={56} w={168} h={58} name="Patient" kind="Person" tech="clinic's own brand" />
      <Node x={16} y={128} w={168} h={58} name="Clinician" kind="Person" tech="UMDPC-registered" />
      <Node x={16} y={200} w={168} h={58} name="Clinic staff" kind="Person" tech="dispensing · dispatch" />

      <Edge d="M 188 143 L 206 143" label="HTTPS" lx={190} ly={128} />

      {/* ---------- what Carevelo supplies ---------- */}
      <Boundary x={210} y={20} w={448} h={330} label="Carevelo — software supplier and data processor only" accent />

      <Node
        x={222}
        y={56}
        w={212}
        h={70}
        name="Branded web app"
        kind="Container"
        tech="Next.js · React"
        note="server-rendered branding"
      />

      <Node
        x={446}
        y={56}
        w={200}
        h={70}
        name="API"
        kind="Container"
        tech="Laravel 13 · PHP 8.3"
        note="modular monolith"
        accent
      />

      <Edge d="M 434 91 L 442 91" label="" lx={438} ly={48} />

      {SUPPLIED.map((line, i) => (
        <text key={line} x={222} y={154 + i * 15} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
          {line}
        </text>
      ))}

      {/* Both realtime transports are self-hosted, for the same reason: health
          data, and the residency rules that follow from it. */}
      <Node x={222} y={226} w={134} h={60} name="Reverb" kind="Container" tech="self-hosted" note="in-region frames" />
      <Node x={367} y={226} w={134} h={60} name="LiveKit" kind="Container" tech="self-hosted" note="not recorded" />
      <Node
        x={512}
        y={226}
        w={134}
        h={60}
        name="Horizon"
        kind="Container"
        tech="Redis queues"
        note="split by urgency"
      />

      <text x={222} y={312} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        an SMS backlog must never delay a payment webhook — ADR-0005, ADR-0008
      </text>
      <text x={222} y={330} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        Sanctum cookie sessions, no bearer token in local storage
      </text>

      {/* ---------- data ---------- */}
      <Edge d="M 546 290 L 546 372" label="tenant-scoped queries" lx={554} ly={366} anchor="start" />

      <Boundary x={210} y={376} w={448} h={140} label="data — isolation enforced by the database, not by convention" />

      <Store x={222} y={404} w={240} h={64} name="PostgreSQL 16" tech="shared schema · row-level security" />
      <External x={486} y={408} w={146} h={56} name="Audit log" note="immutable" />

      <text x={222} y={494} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        one clinic cannot read another&apos;s rows even if a query forgets — ADR-0002
      </text>

      {/* ---------- what the clinic holds ---------- */}
      <Boundary x={676} y={20} w={188} h={330} label="the clinic holds" />

      {HELD.map(({ name, note }, i) => (
        <External key={name} x={688} y={56 + i * 62} w={164} h={48} name={name} note={note} />
      ))}

      <Edge d="M 662 174 L 684 174" label="software, monthly fee" lx={650} ly={168} anchor="end" />

      {/* ---------- money: the arrow that bypasses Carevelo ---------- */}
      <Boundary x={210} y={560} w={654} h={190} label="money — initiated by Carevelo, never held by it" />

      <Node
        x={222}
        y={596}
        w={190}
        h={70}
        name="Payment initiation"
        kind="Component"
        tech="clinic's credentials"
        note="no custody, ever"
        accent
      />

      <Edge d="M 416 631 L 462 631" label="initiate" lx={439} ly={596} />

      <External x={466} y={596} w={190} h={70} name="Aggregator" note="BoU-licensed PSO" />

      <Edge d="M 660 631 L 706 631" label="funds settle" lx={683} ly={596} />

      <External x={710} y={596} w={134} h={70} name="Clinic" note="merchant account" />

      <text x={222} y={700} className="fill-teal-700 dark:fill-teal-400 text-[10.5px] font-semibold">
        the money arrow goes around Carevelo, not through it (ADR-0003)
      </text>
      <text x={222} y={718} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        never employing clinicians and never holding funds each keep a separate licensing regime out of scope
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={782}
        items={[
          {
            shape: "teal fill",
            means: "where the deliberate constraint lives: a modular monolith, and initiation without custody",
          },
          { shape: "stadium", means: "outside Carevelo: the clinic's licences, its bank, its merchant account" },
          { shape: "cylinder", means: "datastore" },
          { shape: "dashed box", means: "ownership or regulatory boundary" },
          { shape: "UMDPC · NDA", means: "Uganda Medical and Dental Practitioners Council · National Drug Authority" },
          { shape: "BoU PSO", means: "Bank of Uganda-licensed payment service operator" },
        ]}
      />
    </>
  ),
};

export default carevelo;
