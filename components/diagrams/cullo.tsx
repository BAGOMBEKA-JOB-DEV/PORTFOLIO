import { Boundary, Edge, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * Cullo — C4 Container diagram.
 *
 * A personal project, and the copy documents less of it than the case studies
 * do. It gets the same notation — declared types, labelled edges, boundaries, a
 * key — but deliberately stays proportionate: padding it out to EMIS density
 * would mean inventing components, which is the one thing these diagrams must
 * not do.
 */
const cullo = {
  label:
    "Cullo container diagram: an Expo client over a Laravel API, with renewal alerts pushed over WebSockets from queue workers rather than polled",
  title: "Cullo — Container diagram, scope: subscription tracking and alerting",
  desc: "Container diagram of Cullo, a subscription-intelligence app. A React Native client built with Expo and TypeScript talks to a Laravel 13 API over HTTPS. Subscription and renewal records are held in PostgreSQL with UUID primary keys. Scheduled queue workers evaluate upcoming renewals on the server rather than in the client, and push alerts to connected devices over WebSockets using Laravel Reverb, so a renewal warning arrives without the app polling for it. The product thesis is that people do not lose money to the subscriptions they remember, but to the ones they forget, which is why detection runs server-side on a schedule instead of only when the app is opened.",
  viewBox: "0 0 880 500",
  minWidth: 860,
  body: (
    <>
      <Node
        x={16}
        y={100}
        w={140}
        h={68}
        name="Cullo app"
        kind="Container"
        tech="React Native"
        note="Expo · TypeScript"
      />

      <Edge d="M 160 124 L 224 124" label="HTTPS · JSON" lx={202} ly={116} />
      <Edge d="M 224 152 L 160 152" label="renewal alert · WebSocket" lx={150} ly={200} anchor="end" async />

      <Boundary x={216} y={20} w={648} h={300} label="server — detection runs here, not in the client" accent />

      <Node
        x={248}
        y={56}
        w={180}
        h={70}
        name="Laravel 13 API"
        kind="Container"
        tech="PHP · Laravel 13"
        note="subscriptions · billing"
        accent
      />

      <Store x={540} y={56} w={306} h={70} name="PostgreSQL" tech="UUID primary keys" />

      <Edge d="M 496 91 L 536 91" label="reads · writes" lx={516} ly={44} />

      <Node
        x={248}
        y={168}
        w={180}
        h={70}
        name="Queue workers"
        kind="Container"
        tech="scheduled jobs"
        note="evaluate renewals"
      />

      <Edge d="M 366 130 L 366 164" label="dispatch" lx={346} ly={152} anchor="start" async />
      <Edge d="M 536 203 L 500 203" label="due soon?" lx={518} ly={258} />

      <Node
        x={452}
        y={168}
        w={186}
        h={70}
        name="Reverb"
        kind="Container"
        tech="WebSockets"
        note="pushes, never polls"
      />

      <text x={236} y={274} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        detection is scheduled server-side, so an alert fires whether or not
      </text>
      <text x={236} y={290} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        the app has been opened — the forgotten subscription is the whole point
      </text>

      <Legend
        x={16}
        y={372}
        items={[
          { shape: "solid arrow", means: "synchronous request, labelled with protocol" },
          { shape: "dashed arrow", means: "asynchronous push or dispatch" },
          { shape: "dashed box", means: "process boundary" },
          { shape: "cylinder", means: "datastore" },
          { shape: "[Type: tech]", means: "C4 element type and its technology" },
        ]}
      />
    </>
  ),
};

export default cullo;
