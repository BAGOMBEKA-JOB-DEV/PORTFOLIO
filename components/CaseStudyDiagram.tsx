/**
 * Architecture diagrams for the case studies.
 *
 * Hand-authored SVG rather than images: themeable through the same Tailwind
 * dark: variants as the rest of the site, a few KB, sharp at any zoom, no extra
 * request, and the labels stay crawlable text.
 *
 * The notation follows the C4 rules (https://c4model.com/diagrams/notation) and
 * standard DFD threat-modelling convention — every element declares its type and
 * technology, every edge is unidirectional and labelled, boundaries are dashed,
 * and every diagram carries a key. See components/diagrams/primitives.tsx.
 *
 * skyl and ovrin are drawn from their repositories' own architecture docs and
 * ADRs. The rest are drawn from the case-study copy in data/projects.ts and
 * nothing else — a wrong diagram is worse than none, because it is what an
 * interviewer will point at and ask about.
 */

import agriculture from "components/diagrams/agriculture";
import cullo from "components/diagrams/cullo";
import emis from "components/diagrams/emis";
import impala from "components/diagrams/impala";
import messaging from "components/diagrams/messaging";
import ovrin from "components/diagrams/ovrin";
import { Markers } from "components/diagrams/primitives";
import skyl from "components/diagrams/skyl";

type DiagramKey = "emis" | "impala" | "messaging" | "skyl" | "ovrin" | "cullo" | "agriculture";

type Diagram = {
  /** aria-label — the claim the picture makes, for anyone who cannot see it. */
  label: string;
  /** Diagram type and scope, per the C4 rule that a title states both. */
  title: string;
  desc: string;
  viewBox: string;
  /** Below this the labels stop being legible, so the container scrolls instead. */
  minWidth: number;
  body: React.ReactNode;
};

const diagrams: Record<DiagramKey, Diagram> = {
  emis,
  impala,
  messaging,
  skyl,
  ovrin,
  cullo,
  agriculture,
};

const CaseStudyDiagram: React.FC<{ name: DiagramKey }> = ({ name }) => {
  const diagram = diagrams[name];

  if (!diagram) return null;

  return (
    // Scrolls on phones rather than shrinking: squeezing a 1100-wide viewBox
    // into 320px renders labels at ~30% size, which is unreadable.
    <div className="no-scrollbar mt-6 -mx-1 overflow-x-auto">
      <svg
        role="img"
        aria-label={diagram.label}
        viewBox={diagram.viewBox}
        style={{ minWidth: diagram.minWidth }}
        className="w-full h-auto"
      >
        <title>{diagram.title}</title>
        <desc>{diagram.desc}</desc>
        <Markers />
        {diagram.body}
      </svg>
    </div>
  );
};

export default CaseStudyDiagram;
