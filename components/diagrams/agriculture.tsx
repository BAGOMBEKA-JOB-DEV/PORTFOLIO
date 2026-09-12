import { Boundary, Edge, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * Agricultural Marketplace — C4 Container diagram.
 *
 * A personal project. Like Cullo it gets the full notation but stays
 * proportionate to what the copy documents. The one architectural claim worth
 * drawing is that this is an RFQ workflow rather than fixed-price listings, so
 * the request → quote → order state transition is the spine of the diagram.
 */
const agriculture = {
  label:
    "Agricultural Marketplace container diagram: a request-for-quotation workflow rather than fixed-price listings, governed by roles assigned at runtime",
  title: "Agricultural Marketplace — Container diagram, scope: the RFQ workflow",
  desc: "Container diagram of a business-to-business agricultural marketplace. Buyers and vendors use a Vue 3 client with Pinia state management and Tailwind CSS, talking to a Laravel 11 API over HTTPS. The workflow is deliberately a request for quotation rather than fixed-price listings: a buyer raises a request, vendors respond with quotes, and an accepted quote becomes an order, which is the sequence the domain actually follows for agricultural goods whose price moves. Records are held in PostgreSQL. Access is governed by dynamic role-based access control, with roles and permissions assigned at runtime rather than hardcoded, so what a buyer or vendor may do is a data decision rather than a deployment.",
  viewBox: "0 0 880 520",
  minWidth: 860,
  body: (
    <>
      <Node x={16} y={70} w={150} h={60} name="Buyer" kind="Person" tech="raises requests" />
      <Node x={16} y={150} w={150} h={60} name="Vendor" kind="Person" tech="sends quotes" />

      <Edge d="M 170 100 L 212 100" label="HTTPS" lx={191} ly={92} />
      <Edge d="M 170 180 L 212 180" label="HTTPS" lx={191} ly={172} />

      <Node x={216} y={104} w={160} h={64} name="Vue 3 client" kind="Container" tech="Pinia · Tailwind" />

      <Edge d="M 380 136 L 416 136" label="HTTPS · JSON" lx={398} ly={96} />

      <Boundary x={404} y={20} w={460} h={310} label="application — roles resolved per request" accent />

      <Node
        x={440}
        y={56}
        w={180}
        h={70}
        name="Laravel 11 API"
        kind="Container"
        tech="PHP · Laravel 11"
        note="RFQ domain"
        accent
      />

      <Store x={644} y={56} w={200} h={70} name="PostgreSQL" tech="requests · quotes · orders" />

      <Edge d="M 628 91 L 640 91" label="persists state transitions" lx={634} ly={44} />

      {/* the RFQ spine */}
      <text x={424} y={162} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        the workflow, not a listings catalogue:
      </text>

      {["request", "quote", "order"].map((stage, i) => (
        <g key={stage}>
          <rect
            x={424 + i * 116}
            y={172}
            width={98}
            height={38}
            rx="5"
            className="fill-transparent stroke-neutral-900/25 dark:stroke-neutral-50/25"
          />
          <text
            x={473 + i * 116}
            y={196}
            textAnchor="middle"
            className="fill-neutral-700 dark:fill-neutral-300 text-[12px] font-medium"
          >
            {stage}
          </text>
          {i < 2 && (
            <path
              d={`M ${522 + i * 116} 191 L ${536 + i * 116} 191`}
              className="stroke-neutral-900/35 dark:stroke-neutral-50/35"
              fill="none"
              markerEnd="url(#ah-solid)"
            />
          )}
        </g>
      ))}

      <Node
        x={424}
        y={236}
        w={420}
        h={62}
        name="Dynamic RBAC"
        kind="Component"
        tech="roles at runtime"
        note="data, not deployment"
      />

      <Edge d="M 634 232 L 634 214" label="authorises every transition" lx={642} ly={226} anchor="start" />

      <text x={424} y={330} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        prices move, so a quote is a negotiated response — not a fixed listing
      </text>

      <Legend
        x={16}
        y={392}
        items={[
          { shape: "solid arrow", means: "synchronous request, labelled with protocol or intent" },
          { shape: "dashed box", means: "process boundary" },
          { shape: "cylinder", means: "datastore" },
          { shape: "[Type: tech]", means: "C4 element type and its technology" },
          { shape: "RFQ", means: "request for quotation" },
          { shape: "RBAC", means: "role-based access control" },
        ]}
      />
    </>
  ),
};

export default agriculture;
