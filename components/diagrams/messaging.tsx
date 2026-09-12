import { Boundary, Edge, External, Legend, Log, Node, Store } from "components/diagrams/primitives";

/**
 * Bulk SMS Platform — C4 Container diagram.
 *
 * Drawn strictly from the case-study copy in data/projects.ts. The point of the
 * architecture is the failure mode, so the diagram states it rather than
 * implying it: producers write regardless of how fast consumers drain, which
 * converts "silent message loss" into "a visible, recoverable backlog". Consumer
 * lag is drawn as the leading indicator because it rises before delivery fails.
 *
 * Laid out in full-width horizontal bands so the whole drawing fits the article
 * column without horizontal scrolling.
 */

const messaging = {
  label:
    "Bulk SMS container diagram: ingestion staged outside the request cycle, a Kafka log decoupling ingestion from dispatch, and consumer lag as the leading indicator of delivery trouble",
  title: "Bulk SMS Platform — Container diagram, scope: ingestion to handset",
  desc: "Container diagram of the Parliament of Uganda bulk messaging platform. A staff user uploads a large contact file, which the ingestion service validates and stages outside the request cycle, so an upload of tens of millions of rows never blocks the person who started it. Contacts are held in PostgreSQL, more than 25 million of them, and a contact-management module segments recipients by administrative unit so a message can target a district or constituency precisely rather than broadcasting to everyone. Campaign dispatch is decoupled from ingestion by a Kafka log: producers write regardless of how fast consumers drain, so a slow gateway or a burst of traffic degrades throughput into a visible, recoverable backlog rather than losing messages silently. Consumer workers read from the log and deliver through Kannel and SMPP gateways, maintaining bind sessions to the operator. The pipeline is instrumented with Prometheus and visualised in Grafana over ingestion rate, consumer lag and delivery outcomes; consumer lag is the signal that matters because it rises before delivery begins to fail, showing a problem forming rather than reporting one that has already happened. The architecture is designed for 400,000 or more concurrent users.",
  viewBox: "0 0 880 830",
  minWidth: 860,
  body: (
    <>
      {/* ---------- band 1: ingestion, off the request path ---------- */}
      <Node x={16} y={74} w={160} h={58} name="Parliament staff" kind="Person" tech="uploads campaigns" />
      <Edge d="M 180 103 L 202 103" label="bulk contact file" lx={191} ly={56} />

      <Boundary
        x={206}
        y={20}
        w={658}
        h={252}
        label="ingestion — validated and staged outside the request cycle"
        accent
      />

      <Node
        x={226}
        y={58}
        w={290}
        h={72}
        name="Ingestion"
        kind="Container"
        tech="validate · stage"
        note="never blocks the uploader"
        accent
      />

      <Node
        x={540}
        y={58}
        w={304}
        h={72}
        name="Segmentation"
        kind="Component"
        tech="admin unit"
        note="district · constituency"
      />

      <Edge d="M 520 94 L 536 94" label="segments" lx={528} ly={148} />

      <Store x={226} y={160} w={290} h={68} name="PostgreSQL" tech="25M+ contacts" />

      <Edge d="M 371 134 L 371 156" label="staged rows" lx={379} ly={150} anchor="start" />

      <text x={540} y={170} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        target a district or constituency
      </text>
      <text x={540} y={186} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        precisely, rather than broadcasting
      </text>
      <text x={540} y={202} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        at everyone
      </text>
      <text x={226} y={252} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        an upload of tens of millions of rows never blocks the user who started it
      </text>

      {/* ---------- band 2: the log ---------- */}
      <Edge d="M 440 276 L 440 306" label="enqueue campaign" lx={448} ly={298} anchor="start" />

      <Log
        x={226}
        y={310}
        w={400}
        h={74}
        name="Kafka"
        tech="partitioned, replayable log"
        note="producers write regardless of drain rate"
      />

      <text x={648} y={336} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        failure mode by design:
      </text>
      <text x={648} y={352} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        a slow gateway grows a
      </text>
      <text x={648} y={368} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        visible, recoverable backlog
      </text>
      <text x={648} y={384} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        instead of losing messages
      </text>
      <text x={648} y={400} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        silently, which is neither
      </text>

      {/* ---------- band 3: dispatch ---------- */}
      <Edge d="M 400 388 L 400 422" label="consume · at-least-once" lx={408} ly={414} anchor="start" async />

      <Boundary x={206} y={426} w={658} h={140} label="dispatch — delivery path to the handset" />

      <Node x={226} y={458} w={280} h={72} name="Workers" kind="Container" tech="Go consumers" note="scale with lag" />

      <Edge d="M 510 494 L 542 494" label="SMPP bind" lx={526} ly={448} />

      <External x={546} y={458} w={298} h={72} name="Kannel · SMPP gateway" note="operator bind session" />

      <text x={226} y={550} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        diagnosed down to gateway session level: bind faults · throughput · delivery receipts
      </text>

      {/* ---------- band 4: observability ---------- */}
      <Edge d="M 366 570 L 366 600" label="scraped" lx={374} ly={592} anchor="start" />

      <Boundary x={206} y={604} w={658} h={126} label="observability — see the problem forming, not after" />

      <Node
        x={226}
        y={634}
        w={210}
        h={72}
        name="Prometheus"
        kind="Container"
        tech="metrics"
        note="scrapes the pipeline"
      />
      <Node
        x={452}
        y={634}
        w={210}
        h={72}
        name="Grafana"
        kind="Container"
        tech="dashboards"
        note="ingest · lag · delivery"
      />

      <Edge d="M 440 670 L 448 670" label="queries" lx={444} ly={722} />

      <text x={678} y={660} className="fill-teal-700 dark:fill-teal-400 text-[10.5px] font-semibold">
        consumer lag is the
      </text>
      <text x={678} y={676} className="fill-teal-700 dark:fill-teal-400 text-[10.5px] font-semibold">
        leading indicator
      </text>
      <text x={678} y={694} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        it rises before delivery
      </text>
      <text x={678} y={710} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        starts failing
      </text>

      <text x={16} y={640} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        designed for
      </text>
      <text x={16} y={656} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        400,000+
      </text>
      <text x={16} y={672} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        concurrent users
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={758}
        items={[
          { shape: "solid arrow", means: "synchronous call" },
          { shape: "dashed arrow", means: "asynchronous consume" },
          { shape: "barred box", means: "ordered, replayable log" },
          { shape: "cylinder", means: "datastore" },
          { shape: "stadium", means: "external operator gateway" },
          { shape: "SMPP", means: "Short Message Peer-to-Peer protocol" },
        ]}
      />
    </>
  ),
};

export default messaging;
