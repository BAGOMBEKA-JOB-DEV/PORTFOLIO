import clsx from "clsx";
import links from "data/links";
import projectsList from "data/projects";
import { useRef, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { Project, ProjectKind, Section } from "types/Sections";
import { getSectionHeading } from "utils";

const STEPS = [
  { key: "situation", label: "Situation" },
  { key: "task", label: "Task" },
  { key: "action", label: "Action" },
] as const;

const TABS: { kind: ProjectKind; label: string; note?: string }[] = [
  {
    kind: "case-study",
    label: "Case Studies",
    note: "These platforms are proprietary and closed-source, so the code is described rather than linked.",
  },
  { kind: "open-source", label: "Open Source" },
  { kind: "personal", label: "Personal Projects" },
];

const byKind = (kind: ProjectKind) => projectsList.filter((project) => project.kind === kind);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className="p-6 md:p-8 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.name}</h3>

      {project.badge && (
        <span className="px-2.5 py-1 rounded-full bg-teal-600/10 dark:bg-teal-400/10 text-xs font-bold text-teal-700 dark:text-teal-400">
          {project.badge}
        </span>
      )}
    </div>

    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{project.subtitle}</p>

    <p className="mt-3 text-sm font-semibold text-teal-600 dark:text-teal-400">
      {project.role}
      {project.org && (
        <>
          {" — "}
          <a
            href={project.org.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-teal-600/40 dark:decoration-teal-400/40 underline-offset-4 hover:decoration-teal-600 dark:hover:decoration-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            {project.org.name}
          </a>
        </>
      )}
    </p>

    {project.situation ? (
      <>
        <dl className="mt-6 grid gap-5">
          {STEPS.map(({ key, label }) => (
            <div key={key}>
              <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project[key]}
              </dd>
            </div>
          ))}
        </dl>

        {project.result && (
          <div className="mt-6 p-4 rounded-lg bg-teal-600/10 dark:bg-teal-400/10">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">Result</p>
            <p className="mt-1.5 text-sm md:text-base font-medium leading-relaxed">{project.result}</p>
          </div>
        )}
      </>
    ) : (
      <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
        {project.summary}
      </p>
    )}

    <ul className="mt-6 flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <li
          key={tag}
          className="px-2.5 py-1 rounded border border-neutral-900/15 dark:border-neutral-50/15 text-xs font-medium"
        >
          {tag}
        </li>
      ))}
    </ul>

    {project.links && (
      <div className="mt-6 pt-5 border-t border-neutral-900/10 dark:border-neutral-50/10 flex flex-wrap gap-x-6 gap-y-3">
        {project.links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            <BiLinkExternal />
            {label}
          </a>
        ))}
      </div>
    )}
  </article>
);

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving focus: arrow keys move between tabs, Home/End jump to the ends.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const offset = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    const next =
      offset !== undefined
        ? (activeIndex + offset + TABS.length) % TABS.length
        : { Home: 0, End: TABS.length - 1 }[event.key];

    if (next === undefined) return;

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div id={Section.Projects}>
      {getSectionHeading(Section.Projects)}

      <div
        role="tablist"
        aria-label="Project categories"
        onKeyDown={onKeyDown}
        className="no-scrollbar mb-8 flex gap-2 overflow-x-auto border-b border-neutral-900/10 dark:border-neutral-50/10"
      >
        {TABS.map(({ kind, label }, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={kind}
              type="button"
              role="tab"
              id={`tab-${kind}`}
              aria-controls={`panel-${kind}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "flex-shrink-0 px-4 py-3 -mb-px border-b-2 text-sm md:text-base font-semibold whitespace-nowrap transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-t",
                isActive
                  ? "border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
              )}
            >
              {label}
              <span className="ml-2 text-xs font-medium opacity-60">{byKind(kind).length}</span>
            </button>
          );
        })}
      </div>

      {/* Every panel stays mounted and is hidden rather than unmounted, so all
          project content remains in the served HTML for crawlers. */}
      {TABS.map(({ kind, note }, index) => (
        <div
          key={kind}
          role="tabpanel"
          id={`panel-${kind}`}
          aria-labelledby={`tab-${kind}`}
          hidden={index !== activeIndex}
        >
          <div className="grid gap-8">
            {byKind(kind).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {note && <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">{note}</p>}
        </div>
      ))}

      <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-400">
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <FaGithub />
          More projects on GitHub
        </a>
      </p>
    </div>
  );
};

export default Projects;
