import { Boundary, Decision, Edge, External, Legend, Node } from "components/diagrams/primitives";

/**
 * ovrin — C4 Component diagram.
 *
 * Verified against the repository at ~/Desktop/vellum, not inferred from the
 * case-study copy:
 *   - pipeline stages, decision points and the ErrLimitExceeded path:
 *     docs/architecture.md and docs/pipeline.md
 *   - core packages and the Model/OCR/Renderer seams: docs/architecture.md
 *   - nine modules by go.mod count: root, model/skyl, ocr/{azure,google,
 *     tesseract,textract}, otel, render/pdfium, examples/receipt
 *   - partial results (a per-field error does not kill the extraction): ADR-0004
 *
 * The linear four-box drawing this replaces could not express the branches, and
 * the branches are the design: text-first, rasterise only when the text layer is
 * unusable, and every value grounded back to the source before it is scored.
 *
 * Laid out in full-width horizontal bands so the whole drawing fits the article
 * column without horizontal scrolling.
 */

const CHECKS: [string, string][] = [
  ["unmarshal", "into T"],
  ["validate", "rules per field"],
  ["ground", "page + span"],
  ["score", "explainable signals"],
];

const MODULES = [
  "model/skyl",
  "ocr/tesseract",
  "ocr/google",
  "ocr/azure",
  "ocr/textract",
  "render/pdfium",
  "otel",
  "examples/receipt",
];

const ovrin = {
  label:
    "ovrin component diagram: a staged extraction pipeline with a text-first fallback to OCR, schema reflection into the prompt, and every value grounded back to source before confidence is scored",
  title: "ovrin — Component diagram, scope: the extraction pipeline and its seams",
  desc: "Component diagram of ovrin, a Go library that turns documents into typed data. A source arrives as an io.Reader, byte slice or path. The pipeline detects the format and checks it against configured limits, returning ErrLimitExceeded rather than proceeding if it is too large. A PDF has its text layer extracted first; if that text is usable the pipeline normalises it while preserving character offsets, and only if it is unusable does it rasterise pages through the Renderer seam and run OCR. Normalised text then feeds a prompt in which document content stays delimited and explicitly untrusted, alongside a JSON Schema reflected from the caller's own Go struct. The Model seam generates JSON, which is unmarshalled into the target type, validated field by field against the schema rules, grounded back to the page and span it came from, and finally scored with explainable confidence signals to produce a Result of that type. Per ADR-0004 a per-field error does not kill the whole extraction, so partial results are a first-class outcome. The root module has zero dependencies; adapters for the model, OCR engines, rendering and OpenTelemetry each live in their own module, nine in total by go.mod count, so importing ovrin drags in no AI SDKs, OCR engines or rendering libraries unless the caller asks for them.",
  viewBox: "0 0 880 970",
  minWidth: 860,
  body: (
    <>
      {/* ---------- band 1: detect and limit ---------- */}
      <Node x={16} y={56} w={152} h={62} name="Source" kind="Input" tech="Reader · bytes · path" />
      <Edge d="M 172 87 L 196 87" label="bytes" lx={184} ly={44} />

      <Node x={200} y={56} w={152} h={62} name="detect format" kind="Component" tech="internal/pdf" />
      <Edge d="M 356 87 L 392 87" label="kind" lx={374} ly={44} />

      <Decision cx={452} cy={87} rx={58} ry={34} label="within limits?" />

      <Edge d="M 510 87 L 660 87" label="no" lx={585} ly={78} />
      <Node x={664} y={64} w={200} h={46} name="ErrLimitExceeded" kind="Error path" tech="rejected early" />

      <Edge d="M 452 124 L 452 156" label="yes" lx={460} ly={144} anchor="start" />

      {/* ---------- band 2: text first, rasterise only if needed ---------- */}
      <Decision cx={452} cy={190} rx={62} ry={32} label="usable text?" />

      <text x={530} y={176} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        PDF: extract the text layer
      </text>
      <text x={530} y={192} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        before rendering anything
      </text>

      <Edge d="M 390 190 L 344 190" label="no — rasterise" lx={367} ly={166} />
      <Edge d="M 452 222 L 452 268" label="yes — offsets preserved" lx={460} ly={250} anchor="start" />

      <Node x={182} y={160} w={158} h={60} name="Renderer" kind="Seam" tech="render/pdfium" note="PDFium on Wazero" />
      <Edge d="M 261 224 L 261 264" label="page image" lx={253} ly={248} anchor="end" />
      <Node x={182} y={268} w={158} h={56} name="OCR" kind="Seam" tech="tesseract · google" />
      <Edge d="M 344 296 L 386 284" label="text + offsets" lx={365} ly={318} />

      {/* ---------- band 3: prompt and model ---------- */}
      <Node
        x={390}
        y={272}
        w={172}
        h={62}
        name="normalise"
        kind="Component"
        tech="internal/normalise"
        note="offsets preserved"
        accent
      />

      <Edge d="M 476 338 L 476 374" label="normalised text" lx={484} ly={360} anchor="start" />

      <Node
        x={390}
        y={378}
        w={172}
        h={70}
        name="build prompt"
        kind="Component"
        tech="internal/prompt"
        note="delimited, untrusted"
      />

      <Node x={624} y={378} w={240} h={70} name="Schema" kind="Component" tech="struct → JSON Schema" note="ADR-0005" />
      <Edge d="M 620 413 L 566 413" label="contract" lx={593} ly={436} />

      <Edge d="M 476 452 L 476 488" label="Model.Generate" lx={484} ly={474} anchor="start" />
      <Node x={390} y={492} w={172} h={56} name="Model" kind="Seam" tech="model/skyl" accent />

      {/* ---------- band 4: checked and traced ---------- */}
      <Edge d="M 476 552 L 476 588" label="JSON" lx={484} ly={574} anchor="start" />

      <Boundary x={196} y={592} w={668} h={150} label="every value is checked and traced before it is returned" />

      {CHECKS.map(([name, note], i) => (
        <g key={name}>
          <rect
            x={216 + i * 158}
            y={624}
            width={146}
            height={54}
            rx="5"
            className="fill-transparent stroke-neutral-900/25 dark:stroke-neutral-50/25"
          />
          <text
            x={289 + i * 158}
            y={646}
            textAnchor="middle"
            className="fill-neutral-700 dark:fill-neutral-300 text-[11px] font-medium"
          >
            {name}
          </text>
          <text
            x={289 + i * 158}
            y={662}
            textAnchor="middle"
            className="fill-neutral-500 dark:fill-neutral-500 text-[9.5px]"
          >
            {note}
          </text>
          {i < CHECKS.length - 1 && (
            <path
              d={`M ${362 + i * 158} 651 L ${370 + i * 158} 651`}
              className="stroke-neutral-900/35 dark:stroke-neutral-50/35"
              fill="none"
              markerEnd="url(#ah-solid)"
            />
          )}
        </g>
      ))}

      <text x={216} y={702} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        ADR-0004 — a per-field error does not kill the extraction; partial results are first-class
      </text>
      <text x={216} y={726} className="fill-teal-700 dark:fill-teal-400 text-[11px] font-semibold">
        → Result[T]
      </text>

      {/* ---------- band 5: the module layout ---------- */}
      <Boundary
        x={196}
        y={762}
        w={668}
        h={110}
        label="nine modules — the root has zero dependencies, the rest are opt-in"
      />

      <Node
        x={216}
        y={790}
        w={180}
        h={62}
        name="ovrin (root)"
        kind="Module"
        tech="zero dependencies"
        note="Extract[T] · Result[T]"
        accent
      />

      {MODULES.map((mod, i) => (
        <External
          key={mod}
          x={412 + (i % 4) * 114}
          y={792 + Math.floor(i / 4) * 30}
          w={106}
          h={24}
          name={mod.replace("examples/", "ex/")}
        />
      ))}

      <text x={16} y={790} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        seams:
      </text>
      <text x={16} y={806} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        Model · OCR
      </text>
      <text x={16} y={822} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        Renderer
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={904}
        items={[
          { shape: "diamond", means: "decision point — the pipeline branches here" },
          { shape: "dashed box", means: "responsibility boundary" },
          { shape: "stadium", means: "adapter module, opt-in" },
          { shape: "teal fill", means: "a seam — swap the implementation" },
        ]}
      />
    </>
  ),
};

export default ovrin;
