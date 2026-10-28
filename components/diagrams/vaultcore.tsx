import { Boundary, Edge, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * VaultCore — C4 Container diagram.
 *
 * The copy describes a banking API with customer accounts, role-based access,
 * idempotent money posting and a balanced ledger. This diagram stays faithful to
 * that: it shows the client boundary, the Spring Boot API, the auth layer, and
 * the PostgreSQL datastore that preserves the account and ledger truth.
 */
const vaultcore = {
  label:
    "VaultCore container diagram: a client authenticates with JWT roles, the Spring Boot API enforces access and idempotency, and PostgreSQL stores account balances and ledger entries",
  title: "VaultCore — Container diagram, scope: account and transaction processing",
  desc:
    "Container diagram of VaultCore, a Java 21 banking API. A client authenticates with JWT roles and calls the Spring Boot API over HTTPS. The API validates permissions, executes money operations and persists accounts and ledger entries in PostgreSQL, which remains the source of truth for balance and reconciliation checks.",
  viewBox: "0 0 980 500",
  minWidth: 960,
  body: (
    <>
      <Node
        x={18}
        y={168}
        w={152}
        h={76}
        name="Client app"
        kind="Container"
        tech="REST client"
        note="customer · teller · auditor"
      />

      <Edge d="M 170 206 L 272 206" label="HTTPS · JWT" lx={232} ly={192} />

      <Boundary x={270} y={30} w={610} h={300} label="server — business and security boundary" accent />

      <Node
        x={300}
        y={70}
        w={220}
        h={82}
        name="VaultCore API"
        kind="Container"
        tech="Java 21 · Spring Boot"
        note="accounts · transfers · ledger"
        accent
      />

      <Node
        x={300}
        y={214}
        w={220}
        h={74}
        name="Auth / role checks"
        kind="Container"
        tech="JWT · Spring Security"
        note="CUSTOMER · TELLER · AUDITOR · ADMIN"
      />

      <Edge d="M 410 152 L 410 210" label="claims · roles" lx={420} ly={180} />

      <Node
        x={596}
        y={70}
        w={226}
        h={82}
        name="Money service"
        kind="Container"
        tech="domain logic"
        note="idempotency · validation · ledger"
      />

      <Edge d="M 520 112 L 592 112" label="execute posting" lx={560} ly={102} />

      <Store x={600} y={214} w={226} h={74} name="PostgreSQL" tech="accounts · ledger · idempotency" />

      <Edge d="M 712 152 L 712 210" label="reads · writes" lx={720} ly={182} />

      <Node
        x={848}
        y={92}
        w={120}
        h={64}
        name="Auditor"
        kind="Container"
        tech="reconciliation"
        note="status checks"
      />

      <Edge d="M 822 112 L 848 112" label="reporting" lx={836} ly={94} />

      <text x={302} y={326} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        money flows are validated before posting, and every post is tied to an
      </text>
      <text x={302} y={342} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        idempotency key so retries do not create duplicate transactions
      </text>

      <Legend
        x={18}
        y={392}
        items={[
          { shape: "solid arrow", means: "synchronous request, labelled with protocol" },
          { shape: "dashed arrow", means: "asynchronous or deferred processing" },
          { shape: "dashed box", means: "server trust boundary" },
          { shape: "cylinder", means: "database / persistent state" },
          { shape: "[Type: tech]", means: "C4 element type and its technology" },
        ]}
      />
    </>
  ),
};

export default vaultcore;
