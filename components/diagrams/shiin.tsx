import { Boundary, Decision, Edge, External, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * Shiin — C4 Component diagram.
 *
 * Drawn from the repository's own documents, not from the case-study copy:
 *   - five stages in fixed order, and which of them are gates:
 *     docs/spec/evaluation.md [EVAL-001..004], docs/adr/0012
 *   - combining rules and the default decision: [EVAL-005..008], docs/adr/0011
 *   - fail-closed on any failure, and unattended pending -> deny:
 *     [EVAL-009], [EVAL-016..017], docs/adr/0013
 *   - pure synchronous engine, exactly five inputs, no I/O:
 *     [EVAL-014..015], docs/adr/0010
 *   - immutable policy snapshot identified by a digest: [EVAL-012..013]
 *   - approver path and audit-before-response: docs/architecture/decision-pipeline.md
 *
 * The claim the picture makes is that `allow` has exactly one source. Four of
 * the five stages can only hold or refuse, so the accent is spent on the policy
 * stage and the approver grant — the only two things that can permit an action.
 */

const STAGES: [name: string, role: string][] = [
  ["identity", "gate"],
  ["capability", "gate"],
  ["policy", "the only allow"],
  ["intent", "gate"],
  ["risk", "gate"],
];

const CONSTRAINTS = ["scope.paths · forbid.action_types · allow.hosts", "limits · require_pending_for · expires_at"];

const shiin = {
  label:
    "Shiin component diagram: an agent's proposed action passes through five fixed stages in which only the policy stage can allow, any stage can deny, and a pending decision waits for an approver",
  title: "Shiin — Component diagram, scope: the decision pipeline for one proposed action",
  desc: "Component diagram of Shiin, an agent-agnostic authorization layer for AI agent actions. A host agent proposes an action; an adapter normalises it into a versioned action request and never decides anything itself. The engine evaluates that request against an immutable policy snapshot identified by a digest, the active task declaration, the evaluation mode and the current time — exactly five inputs and no I/O, so the same inputs always produce the same decision and a replay reproduces it exactly. Five stages run in fixed order: identity, capability, policy, intent and risk. Four of them are gates that may deny, hold or pass but never allow; only the policy stage, or a grant created by an approver, can permit an action, and every later stage can only make the result stricter. Any deny wins, an unmatched action falls through to a default of deny, and any failure inside evaluation denies. Task constraints are a closed, machine-checkable set covering path scope, forbidden action types, allowed hosts, budgets and expiry. A pending decision becomes a ticket an operator resolves out of band, and collapses to a denial when no approver can be reached. Request and decision are written to a hash-chained, tamper-evident audit log before any response is returned, and a failed audit write denies the action.",
  viewBox: "0 0 880 960",
  minWidth: 860,
  body: (
    <>
      {/* ---------- band 1: host and adapter ---------- */}
      <Node x={16} y={56} w={150} h={62} name="Agent" kind="Host" tech="hook adapter" note="Claude Code · Cursor" />
      <Edge d="M 170 87 L 206 87" label="proposed action" lx={188} ly={44} />

      <Node
        x={210}
        y={56}
        w={190}
        h={62}
        name="Adapter"
        kind="Component"
        tech="shiin-hooks · MCP proxy"
        note="never decides"
      />
      <Edge d="M 404 87 L 444 87" label="action request" lx={424} ly={44} />

      <Node
        x={448}
        y={56}
        w={190}
        h={62}
        name="Classifier"
        kind="Component"
        tech="shiin-classify"
        note="paths · commands"
      />

      {/* ---------- the five inputs, stated because they are the whole determinism claim ---------- */}
      <Store x={664} y={48} w={200} h={78} name="Policy snapshot" tech="immutable · digest" />
      <Edge d="M 764 130 L 600 196" label="one of exactly five inputs" lx={856} ly={148} anchor="end" />

      {/* ---------- band 2: the engine ---------- */}
      <Boundary
        x={210}
        y={160}
        w={654}
        h={366}
        label="shiin-engine — pure, synchronous, no I/O: same inputs always give the same decision"
        accent
      />

      <text x={230} y={196} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        inputs: action request · policy snapshot · active task · evaluation mode · current time — and nothing else
      </text>

      {STAGES.map(([name, role], i) => {
        const allows = role === "the only allow";
        return (
          <g key={name}>
            <rect
              x={230 + i * 124}
              y={214}
              width={112}
              height={54}
              rx="5"
              className={
                allows
                  ? "fill-teal-600/10 dark:fill-teal-400/10 stroke-teal-600 dark:stroke-teal-400"
                  : "fill-transparent stroke-neutral-900/25 dark:stroke-neutral-50/25"
              }
            />
            <text
              x={286 + i * 124}
              y={236}
              textAnchor="middle"
              className={
                allows
                  ? "fill-teal-700 dark:fill-teal-400 text-[12px] font-semibold"
                  : "fill-neutral-700 dark:fill-neutral-300 text-[12px] font-medium"
              }
            >
              {name}
            </text>
            <text
              x={286 + i * 124}
              y={252}
              textAnchor="middle"
              className="fill-neutral-500 dark:fill-neutral-500 text-[9.5px]"
            >
              {role}
            </text>
            {i < STAGES.length - 1 && (
              <path
                d={`M ${342 + i * 124} 241 L ${350 + i * 124} 241`}
                className="stroke-neutral-900/35 dark:stroke-neutral-50/35"
                fill="none"
                markerEnd="url(#ah-solid)"
              />
            )}
          </g>
        );
      })}

      <text x={230} y={292} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        fixed order (ADR-0012) — later stages only ever restrict
      </text>

      {/* ---------- task constraints feed the intent gate ---------- */}
      <Node
        x={230}
        y={312}
        w={300}
        h={74}
        name="Task declaration"
        kind="Component"
        tech="human-confirmed"
        note="closed, machine-checkable set"
      />
      {CONSTRAINTS.map((line, i) => (
        <text key={line} x={230} y={404 + i * 15} className="fill-neutral-500 dark:fill-neutral-500 text-[10px]">
          {line}
        </text>
      ))}
      <Edge d="M 534 338 L 648 278" label="narrows the intent gate" lx={540} ly={356} anchor="start" />

      {/* ---------- combining ---------- */}
      <Decision cx={700} cy={348} rx={74} ry={38} label="combine" />
      <text x={700} y={400} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500 text-[10px]">
        any deny wins · else pending
      </text>
      <text x={700} y={414} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500 text-[10px]">
        · else policy allow · else deny
      </text>
      <Edge d="M 608 268 L 676 314" label="five stage results" lx={612} ly={332} anchor="end" />

      <text x={230} y={448} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        fail-closed (ADR-0013): any failure inside evaluation denies, and in unattended mode a pending
      </text>
      <text x={230} y={463} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        decision becomes deny.unattended rather than waiting for an approver who cannot be reached
      </text>
      <text x={230} y={492} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        explain mode returns a trace: every stage, its result, and the reason code or rule id behind it
      </text>

      {/* ---------- band 3: outcomes ---------- */}
      <Edge d="M 700 390 L 700 556" label="decision" lx={708} ly={470} anchor="start" />

      <Boundary x={210} y={560} w={654} h={150} label="outcome — recorded before any response is returned" />

      <Node x={230} y={592} w={190} h={64} name="allow / deny" kind="Decision" tech="returned to the host" />

      <Node
        x={440}
        y={592}
        w={190}
        h={64}
        name="pending"
        kind="Decision"
        tech="ticket for an operator"
        note="deny if unattended"
      />

      <Node
        x={650}
        y={592}
        w={194}
        h={64}
        name="Approver"
        kind="Container"
        tech="shiind · Unix daemon"
        note="authenticated"
        accent
      />

      <Edge d="M 634 624 L 646 624" label="ticket" lx={640} ly={676} />
      <Edge d="M 744 588 L 744 536" label="grant — the only other allow" lx={856} ly={556} anchor="end" />

      {/* ---------- band 4: evidence ---------- */}
      <Edge d="M 420 660 L 420 742" label="request + decision, before responding" lx={428} ly={706} anchor="start" />

      <Boundary x={210} y={746} w={654} h={104} label="shiin-audit — write fails, action denies" />

      <Store x={230} y={772} w={280} h={62} name="Audit log" tech="hash-chained JSON Lines" />
      <External x={534} y={776} w={310} h={54} name="Signed receipts · replay" note="Ed25519, verifiable offline" />

      <text x={210} y={874} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        tamper-evident, not tamper-proof — the project&apos;s own wording, kept here deliberately
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={892}
        items={[
          {
            shape: "teal fill",
            means: "the only two things that can permit an action: the policy stage and an approver grant",
          },
          { shape: "plain box", means: "a gate — may deny, hold or pass, but never allow" },
          { shape: "diamond", means: "decision combining" },
          { shape: "cylinder", means: "datastore" },
          { shape: "dashed box", means: "component or trust boundary" },
          { shape: "MCP", means: "Model Context Protocol" },
        ]}
      />
    </>
  ),
};

export default shiin;
