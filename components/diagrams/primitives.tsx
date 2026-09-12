/**
 * Shared notation for the architecture diagrams.
 *
 * The vocabulary is not invented. It follows the C4 notation rules
 * (https://c4model.com/diagrams/notation) and standard data-flow-diagram
 * threat-modelling convention:
 *
 *   - every element declares a type and, where it is a container or component,
 *     its technology;
 *   - every relationship is unidirectional and labelled, and relationships that
 *     cross a process boundary name their protocol;
 *   - trust and module boundaries are dashed enclosures;
 *   - every diagram carries a key explaining the notation it uses.
 *
 * Shape is load-bearing, not decoration. WCAG 1.4.1 forbids colour as the only
 * channel carrying meaning, so a datastore is a cylinder, an external system is
 * a stadium and a decision is a diamond — each still distinguishable in
 * greyscale and under colour-vision deficiency.
 */

export const strokeSoft = "stroke-neutral-900/25 dark:stroke-neutral-50/25";
export const strokeFirm = "stroke-neutral-900/45 dark:stroke-neutral-50/45";
export const strokeAccent = "stroke-teal-600 dark:stroke-teal-400";
export const fillNone = "fill-transparent";
export const fillAccent = "fill-teal-600/10 dark:fill-teal-400/10";
export const fillMuted = "fill-neutral-900/5 dark:fill-neutral-50/5";

export const titleText = "fill-neutral-800 dark:fill-neutral-100 text-[13px] font-semibold";
export const bodyText = "fill-neutral-700 dark:fill-neutral-300 text-[12px] font-medium";
export const mutedText = "fill-neutral-500 dark:fill-neutral-500 text-[10.5px]";
export const accentText = "fill-teal-700 dark:fill-teal-400 text-[12px] font-semibold";
export const edgeText = "fill-neutral-600 dark:fill-neutral-400 text-[10px]";
export const lineSoft = "stroke-neutral-900/35 dark:stroke-neutral-50/35";

/** Arrowheads. Two ids so a dashed (async) edge can carry a hollow head. */
export const Markers = () => (
  <defs>
    <marker
      id="ah-solid"
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" className="fill-neutral-900/45 dark:fill-neutral-50/45" />
    </marker>
    <marker
      id="ah-open"
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
    >
      <path
        d="M 0 0 L 10 5 L 0 10"
        className="fill-transparent stroke-neutral-900/45 dark:stroke-neutral-50/45"
        strokeWidth="1.4"
      />
    </marker>
  </defs>
);

/**
 * A C4 element. `kind` is rendered as the type line, so rule 1 ("every element
 * declares its type") cannot be skipped by omission — it is a required prop.
 */
export const Node: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  kind: string;
  tech?: string;
  note?: string;
  accent?: boolean;
}> = ({ x, y, w, h, name, kind, tech, note, accent = false }) => {
  const cx = x + w / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="5"
        className={`${accent ? fillAccent : fillNone} ${accent ? strokeAccent : strokeSoft}`}
      />
      <text x={cx} y={y + 17} textAnchor="middle" className={accent ? accentText : titleText}>
        {name}
      </text>
      <text x={cx} y={y + 30} textAnchor="middle" className={mutedText}>
        [{kind}
        {tech ? `: ${tech}` : ""}]
      </text>
      {note && (
        <text x={cx} y={y + 44} textAnchor="middle" className={bodyText}>
          {note}
        </text>
      )}
    </g>
  );
};

/** Datastore — cylinder, so it is never mistaken for a service. */
export const Store: React.FC<{ x: number; y: number; w: number; h: number; name: string; tech: string }> = ({
  x,
  y,
  w,
  h,
  name,
  tech,
}) => (
  <g>
    <path
      d={`M ${x} ${y + 8} a ${w / 2} 8 0 0 1 ${w} 0 v ${h - 16} a ${w / 2} 8 0 0 1 ${-w} 0 z`}
      className={`${fillMuted} ${strokeSoft}`}
    />
    <path d={`M ${x} ${y + 8} a ${w / 2} 8 0 0 0 ${w} 0`} className={`fill-transparent ${strokeSoft}`} />
    <text x={x + w / 2} y={y + h / 2 + 2} textAnchor="middle" className={bodyText}>
      {name}
    </text>
    <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" className={mutedText}>
      [{tech}]
    </text>
  </g>
);

/** External system — stadium, visually distinct from anything we own. */
export const External: React.FC<{ x: number; y: number; w: number; h: number; name: string; note?: string }> = ({
  x,
  y,
  w,
  h,
  name,
  note,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={h / 2} className={`${fillNone} ${strokeFirm}`} strokeDasharray="0" />
    <text x={x + w / 2} y={note ? y + h / 2 - 2 : y + h / 2 + 4} textAnchor="middle" className={bodyText}>
      {name}
    </text>
    {note && (
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className={mutedText}>
        {note}
      </text>
    )}
  </g>
);

/** Trust or module boundary — dashed, per DFD convention, with a corner label. */
export const Boundary: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: boolean;
}> = ({ x, y, w, h, label, accent = false }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="8"
      strokeDasharray="5 4"
      className={`fill-transparent ${accent ? strokeAccent : strokeFirm}`}
    />
    <text x={x + 10} y={y + 15} className={accent ? accentText : mutedText}>
      {label}
    </text>
  </g>
);

/**
 * A relationship. `label` is required — an unlabelled arrow is the most-cited
 * diagram defect, and making it a type error is the only way it stays fixed.
 * `async` switches to a dashed line with a hollow head.
 */
export const Edge: React.FC<{
  d: string;
  label: string;
  lx: number;
  ly: number;
  async?: boolean;
  anchor?: "start" | "middle" | "end";
}> = ({ d, label, lx, ly, async = false, anchor = "middle" }) => (
  <g>
    <path
      d={d}
      className={lineSoft}
      fill="none"
      strokeDasharray={async ? "4 3" : undefined}
      markerEnd={`url(#${async ? "ah-open" : "ah-solid"})`}
    />
    <text x={lx} y={ly} textAnchor={anchor} className={edgeText}>
      {label}
    </text>
  </g>
);

/** The key. Required on every diagram by the C4 notation rules. */
export const Legend: React.FC<{ x: number; y: number; items: { shape: string; means: string }[] }> = ({
  x,
  y,
  items,
}) => (
  <g data-legend="">
    <text x={x} y={y} className={mutedText}>
      KEY
    </text>
    {items.map((item, i) => (
      <text key={item.means} x={x + 34} y={y + i * 13} className={mutedText}>
        {item.shape} = {item.means}
      </text>
    ))}
  </g>
);

/** Partitioned log — Kafka, and the transactional outbox. Stacked bars read as
 *  an ordered, replayable sequence rather than a queue that drains and is gone. */
export const Log: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  tech: string;
  note?: string;
}> = ({ x, y, w, h, name, tech, note }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" className={`${fillMuted} ${strokeSoft}`} />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={x + 14 + i * 14} y1={y + 6} x2={x + 14 + i * 14} y2={y + h - 6} className={strokeSoft} />
    ))}
    <text x={x + w / 2 + 20} y={y + 20} textAnchor="middle" className={titleText}>
      {name}
    </text>
    <text x={x + w / 2 + 20} y={y + 33} textAnchor="middle" className={mutedText}>
      [{tech}]
    </text>
    {note && (
      <text x={x + w / 2 + 20} y={y + 47} textAnchor="middle" className={bodyText}>
        {note}
      </text>
    )}
  </g>
);

/** Decision point — diamond. Used only where the code genuinely branches. */
export const Decision: React.FC<{ cx: number; cy: number; rx: number; ry: number; label: string }> = ({
  cx,
  cy,
  rx,
  ry,
  label,
}) => (
  <g>
    <path
      d={`M ${cx} ${cy - ry} L ${cx + rx} ${cy} L ${cx} ${cy + ry} L ${cx - rx} ${cy} z`}
      className={`${fillNone} ${strokeFirm}`}
    />
    <text x={cx} y={cy + 4} textAnchor="middle" className={edgeText}>
      {label}
    </text>
  </g>
);
