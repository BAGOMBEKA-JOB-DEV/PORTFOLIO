import { Boundary, Edge, External, Legend, Node } from "components/diagrams/primitives";

/**
 * skyl — C4 Component diagram.
 *
 * Every element was verified against the repository rather than inferred from
 * the case-study copy:
 *   - module split: the four go.mod files (root, gateway, otel, provider/anthropic)
 *   - package layout and internal/ contents: docs/architecture.md, "Layout"
 *   - client pipeline and the four-method seam: the mermaid in docs/architecture.md
 *   - streaming events: the sequence diagram in the same file
 *   - ADR numbers: docs/adr/0003, 0006, 0007
 *
 * The architectural claim is the direction of dependency: every arrow points at
 * what a module depends on, and nothing points out of the zero-dependency
 * boundary. That is why the boundary is drawn and why the arrows run inward.
 *
 * Laid out in full-width horizontal bands rather than side-by-side columns, so
 * the whole drawing fits the article column without horizontal scrolling.
 */

const PIPELINE = ["validate", "timeout", "retry · backoff", "hooks"];
const ADAPTERS = ["provider/openai", "provider/gemini", "provider/openaicompat"];

const OPT_IN: [string, string, string][] = [
  ["provider/anthropic", "anthropic-sdk-go", "ADR-0006"],
  ["gateway", "go-chi", "ADR-0003"],
  ["otel", "OpenTelemetry", "ADR-0007"],
];

const ENDPOINTS: [string, string][] = [
  ["api.anthropic.com", "provider/anthropic"],
  ["api.openai.com", "provider/openai"],
  ["generativelanguage.googleapis.com", "provider/gemini"],
  ["any OpenAI-shaped host", "provider/openaicompat"],
];

const skyl = {
  label:
    "skyl component diagram: a zero-dependency Go core behind a four-method provider seam, with every heavy dependency quarantined in an opt-in module",
  title: "skyl — Component diagram, scope: the skyl Go library",
  desc: "Component diagram of the skyl Go library. A calling Go service imports skyl and uses skyl.Client, whose request pipeline validates, applies a timeout, retries with backoff and runs hooks before handing off to the Provider interface — a four-method seam defined in provider.go. Three native adapters, provider/openai, provider/gemini and provider/openaicompat, implement that seam from inside the zero-dependency root module, alongside internal packages for the shared OpenAI wire format, a Server-Sent Events reader, HTTP helpers, a local sandbox server, the provider contract suite every adapter must pass, and goroutine-leak assertions. Three further modules each carry their own go.mod, so importing the library pulls in none of them: provider/anthropic with the Anthropic SDK under ADR-0006, gateway with go-chi under ADR-0003, and otel with OpenTelemetry under ADR-0007. Adapters reach the real provider endpoints over HTTPS, with Server-Sent Events for streaming. Every dependency arrow points inward at the core, and nothing points out of the zero-dependency boundary.",
  viewBox: "0 0 880 830",
  minWidth: 860,
  body: (
    <>
      {/* ---------- band 1: caller and the zero-dependency module ---------- */}
      <Node x={16} y={58} w={140} h={58} name="Your service" kind="Software System" tech="Go" />
      <Edge d="M 160 87 L 192 87" label="imports" lx={176} ly={78} />

      <Boundary x={196} y={20} w={668} h={332} label="module: skyl — zero external dependencies" accent />

      <Node
        x={216}
        y={56}
        w={152}
        h={66}
        name="skyl.Client"
        kind="Component"
        tech="skyl.go"
        note="orchestration"
        accent
      />

      <text x={392} y={50} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        request pipeline — written once, tested once
      </text>

      {PIPELINE.map((stage, i) => (
        <g key={stage}>
          <rect
            x={392 + i * 116}
            y={60}
            width={104}
            height={28}
            rx="4"
            className="fill-transparent stroke-neutral-900/25 dark:stroke-neutral-50/25"
          />
          <text
            x={444 + i * 116}
            y={78}
            textAnchor="middle"
            className="fill-neutral-700 dark:fill-neutral-300 text-[10px] font-medium"
          >
            {stage}
          </text>
          {i < PIPELINE.length - 1 && (
            <path
              d={`M ${496 + i * 116} 74 L ${504 + i * 116} 74`}
              className="stroke-neutral-900/35 dark:stroke-neutral-50/35"
              fill="none"
              markerEnd="url(#ah-solid)"
            />
          )}
        </g>
      ))}

      <Edge d="M 292 126 L 292 148" label="calls" lx={300} ly={144} anchor="start" />

      <Node
        x={216}
        y={152}
        w={628}
        h={50}
        name="Provider"
        kind="Interface — the seam"
        tech="provider.go · 4 methods"
        accent
      />

      {ADAPTERS.map((mod, i) => (
        <g key={mod}>
          <rect
            x={216 + i * 212}
            y={238}
            width={204}
            height={32}
            rx="4"
            className="fill-transparent stroke-neutral-900/25 dark:stroke-neutral-50/25"
          />
          <text
            x={318 + i * 212}
            y={258}
            textAnchor="middle"
            className="fill-neutral-700 dark:fill-neutral-300 text-[10.5px] font-medium"
          >
            {mod}
          </text>
          <path
            d={`M ${318 + i * 212} 234 L ${318 + i * 212} 208`}
            className="stroke-neutral-900/35 dark:stroke-neutral-50/35"
            fill="none"
            markerEnd="url(#ah-solid)"
          />
        </g>
      ))}

      <text x={530} y={228} textAnchor="middle" className="fill-neutral-600 dark:fill-neutral-400 text-[10px]">
        implements
      </text>

      <text x={216} y={298} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        internal/ — oai (shared OpenAI wire format) · sse · httpx · sandbox
      </text>
      <text x={216} y={314} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        providertest (the contract suite every adapter must pass) · testutil (goroutine-leak assertions)
      </text>

      {/* ---------- band 2: opt-in modules ---------- */}
      <Edge d="M 440 384 L 440 356" label="depends on core" lx={448} ly={374} anchor="start" async />

      <Boundary x={196} y={388} w={668} h={124} label="separate go.mod — you pay only if you import it" />

      {OPT_IN.map(([mod, dep, adr], i) => (
        <Node key={mod} x={216 + i * 212} y={416} w={204} h={72} name={mod} kind="Container" tech={dep} note={adr} />
      ))}

      <text x={16} y={432} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        arrows point at
      </text>
      <text x={16} y={448} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        what a module
      </text>
      <text x={16} y={464} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        depends on —
      </text>
      <text x={16} y={480} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        nothing points out
      </text>

      {/* ---------- band 3: the real endpoints ---------- */}
      <Edge d="M 530 512 L 530 540" label="HTTPS · SSE" lx={538} ly={532} anchor="start" />

      <Boundary x={196} y={544} w={668} h={166} label="external — provider APIs, one per adapter" />

      {ENDPOINTS.map(([host, via], i) => (
        <g key={host}>
          <External
            x={216 + (i % 2) * 324}
            y={576 + Math.floor(i / 2) * 62}
            w={304}
            h={40}
            name={host}
            note={`reached by ${via}`}
          />
        </g>
      ))}

      <text x={16} y={580} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        streaming:
      </text>
      <text x={16} y={596} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        Stream.Next()
      </text>
      <text x={16} y={612} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        reads SSE frames,
      </text>
      <text x={16} y={628} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        emits TextDelta ·
      </text>
      <text x={16} y={644} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        ThinkingDelta ·
      </text>
      <text x={16} y={660} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        ToolCall
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={742}
        items={[
          { shape: "solid arrow", means: "synchronous call, labelled with intent" },
          { shape: "dashed arrow", means: "compile-time module dependency" },
          { shape: "dashed box", means: "module boundary" },
          { shape: "stadium", means: "external system outside this codebase" },
          { shape: "[Type: tech]", means: "C4 element type and its technology" },
          { shape: "ADR-nnnn", means: "the decision record justifying that split" },
        ]}
      />
    </>
  ),
};

export default skyl;
