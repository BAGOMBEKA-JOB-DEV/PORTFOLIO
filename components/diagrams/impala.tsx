import { Boundary, Edge, External, Legend, Log, Node, Store } from "components/diagrams/primitives";

/**
 * IMPALA LITE2 — C4 Container diagram.
 *
 * Drawn strictly from the case-study copy in data/projects.ts. Two claims carry
 * the design and so are drawn explicitly rather than described:
 *   - isolation is defence in depth: schema-per-tenant *and* row-level security,
 *     so a query bug that escapes the schema boundary still cannot cross tenants;
 *   - the outbox commits in the same transaction as the data that produced it,
 *     which is why it sits inside the isolation boundary, not beside it.
 *
 * Laid out in full-width horizontal bands so the whole drawing fits the article
 * column without horizontal scrolling.
 */

const DOMAINS = [
  "operations · scheduling · fleet · containers · customers · contracts",
  "procurement · payroll · HR · billing · payments · reconciliation · accounting",
];

const SEAMS: [string, string][] = [
  ["Payments", "module boundary drawn"],
  ["Telematics", "module boundary drawn"],
  ["Premise registry", "shared · resolve-only"],
];

const impala = {
  label:
    "IMPALA LITE2 container diagram: a Go modular monolith on Cloud Run in africa-south1, with schema-per-tenant isolation backed by row-level security and a transactional outbox feeding Pub/Sub",
  title: "IMPALA LITE2 — Container diagram, scope: the multi-tenant SaaS platform",
  desc: "Container diagram of IMPALA LITE2, a multi-tenant waste-management SaaS serving Uganda and Malawi. Vue 3 web and Flutter field clients authenticate through Keycloak using OpenID Connect, with one Keycloak organisation per tenant. Requests reach a Go modular monolith built on the Chi router, deployed to Cloud Run in the africa-south1 region for on-continent data residency. The monolith spans 44 domain modules covering operations, scheduling, fleet, containers, customers, contracts, procurement, payroll, HR, billing, payments, reconciliation and accounting, exposing 471 routes behind a generated OpenAPI 3.1 contract. Tenant isolation is defence in depth: each tenant has its own PostgreSQL schema, with row-level security as a second line of defence so a query bug cannot leak across tenants even if it escapes the schema boundary. Cross-module communication uses a transactional outbox that commits in the same transaction as the data producing it, then publishes onto Google Cloud Pub/Sub, so a crash between write and publish cannot desynchronise the system. A native double-entry general ledger, multi-currency and tax-aware, receives postings from every billing source, and per-country fiscalisation plugs into it: EFRIS for Uganda and the Malawi Revenue Authority for Malawi, alongside Mobile Money settlement with pricing denominated first in Ugandan Shillings. Payments, Telematics and a shared resolve-only premise registry are drawn with carve-out seams, since the module boundaries were set so they can become independent services later without a rewrite.",
  viewBox: "0 0 880 1010",
  minWidth: 860,
  body: (
    <>
      {/* ---------- band 1: clients ---------- */}
      <Node x={16} y={56} w={150} h={56} name="Operator web" kind="Container" tech="Vue 3 · Pinia" />
      <Node x={16} y={128} w={150} h={56} name="Field app" kind="Container" tech="Flutter" />
      <Node x={16} y={236} w={150} h={62} name="Keycloak" kind="Container" tech="OIDC" note="one org per tenant" />

      <Edge d="M 170 84 L 192 84" label="HTTPS · JSON" lx={181} ly={44} />
      <Edge d="M 170 156 L 192 156" label="HTTPS · JSON" lx={181} ly={208} />
      <Edge d="M 170 262 L 192 262" label="verifies token" lx={181} ly={320} />

      {/* ---------- band 2: the deployment boundary ---------- */}
      <Boundary x={196} y={20} w={668} h={432} label="Cloud Run · africa-south1 — on-continent data residency" accent />

      <Node
        x={216}
        y={56}
        w={286}
        h={72}
        name="Go modular monolith"
        kind="Container"
        tech="Go · Chi"
        note="44 domain modules · 471 routes"
        accent
      />

      <Node
        x={520}
        y={56}
        w={324}
        h={72}
        name="OpenAPI 3.1 contract"
        kind="Component"
        tech="generated from code"
        note="documented by construction"
      />

      {DOMAINS.map((line, i) => (
        <text key={line} x={216} y={150 + i * 15} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
          {line}
        </text>
      ))}

      <Edge d="M 340 186 L 340 216" label="tenant-scoped query" lx={348} ly={206} anchor="start" />

      <Boundary x={216} y={220} w={628} h={150} label="isolation — defence in depth" />

      <Store x={236} y={250} w={286} h={62} name="Schema-per-tenant PostgreSQL" tech="one schema per tenant" />

      <Log x={558} y={250} w={266} h={62} name="Outbox" tech="same transaction" note="commit or neither" />

      <Edge d="M 526 280 L 554 280" label="written with the data" lx={540} ly={340} />

      <text x={236} y={334} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        + row-level security — the second line
      </text>
      <text x={236} y={350} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        if a query escapes the schema
      </text>

      <Edge d="M 690 374 L 690 400" label="publish · at-least-once" lx={698} ly={392} anchor="start" async />

      <Node x={558} y={404} w={266} h={38} name="Pub/Sub" kind="Container" tech="Google Cloud Pub/Sub" />

      {/* ---------- band 3: money ---------- */}
      <Edge d="M 380 456 L 380 486" label="postings" lx={388} ly={476} anchor="start" />

      <Boundary x={196} y={490} w={668} h={128} label="money — one set of books for every billing source" />

      <Node
        x={216}
        y={520}
        w={300}
        h={72}
        name="Double-entry ledger"
        kind="Component"
        tech="multi-currency · tax-aware"
        note="billing-source-agnostic"
        accent
      />

      <Node
        x={536}
        y={520}
        w={288}
        h={72}
        name="Settlement"
        kind="Component"
        tech="Mobile Money"
        note="priced first in UGX"
      />

      <Edge d="M 520 556 L 532 556" label="settles" lx={526} ly={608} />

      {/* ---------- band 4: tax authorities ---------- */}
      <Edge d="M 530 622 L 530 648" label="fiscalise each invoice" lx={538} ly={640} anchor="start" />

      <Boundary x={196} y={652} w={668} h={106} label="external — per-country tax authorities" />

      <External x={216} y={684} w={300} h={52} name="EFRIS" note="Uganda Revenue Authority" />
      <External x={536} y={684} w={288} h={52} name="MRA" note="Malawi Revenue Authority" />

      {/* ---------- band 5: carve-out seams ---------- */}
      <Boundary x={196} y={776} w={668} h={106} label="carve-out seams — extractable later without a rewrite" />

      {SEAMS.map(([mod, note], i) => (
        <Node key={mod} x={216 + i * 212} y={806} w={204} h={52} name={mod} kind="Component" tech={note} />
      ))}

      <text x={16} y={806} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        a customer moves
      </text>
      <text x={16} y={822} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        between operators
      </text>
      <text x={16} y={838} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        without address
      </text>
      <text x={16} y={854} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        history being lost
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={908}
        items={[
          { shape: "solid arrow", means: "synchronous call, labelled with intent and protocol" },
          { shape: "dashed arrow", means: "asynchronous publish" },
          { shape: "dashed box", means: "deployment, isolation or extraction boundary" },
          { shape: "cylinder / barred box", means: "datastore / ordered, replayable log" },
          { shape: "stadium", means: "external system outside this platform" },
          { shape: "OIDC · EFRIS", means: "OpenID Connect · Electronic Fiscal Receipting and Invoicing Solution" },
          { shape: "MRA · UGX", means: "Malawi Revenue Authority · Ugandan Shilling" },
        ]}
      />
    </>
  ),
};

export default impala;
