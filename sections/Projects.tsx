import links from "data/links";
import projectsList from "data/projects";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { Project, Section } from "types/Sections";
import { getSectionHeading } from "utils";

const STEPS = [
  { key: "situation", label: "Situation" },
  { key: "task", label: "Task" },
  { key: "action", label: "Action" },
] as const;

const caseStudies = projectsList.filter((project) => project.kind === "case-study");
const openSource = projectsList.filter((project) => project.kind === "open-source");
const personal = projectsList.filter((project) => project.kind === "personal");

const groupHeadingClassName = "mt-16 mb-8 text-xl md:text-2xl font-bold tracking-tight";

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

    <p className="mt-3 text-sm font-semibold text-teal-600 dark:text-teal-400">{project.role}</p>

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
          <div className="mt-6 p-4 rounded-lg bg-teal-600/10 dark:bg-teal-400/10 border-l-2 border-teal-600 dark:border-teal-400">
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

const Projects = () => (
  <div id={Section.Projects}>
    {getSectionHeading(Section.Projects)}

    <div className="grid gap-8">
      {caseStudies.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>

    <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
      These platforms are proprietary and closed-source, so they are described rather than linked.
    </p>

    {openSource.length > 0 && (
      <>
        <h3 className={groupHeadingClassName}>Open Source</h3>

        <div className="grid gap-8">
          {openSource.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </>
    )}

    {personal.length > 0 && (
      <>
        <h3 className={groupHeadingClassName}>Personal Projects</h3>

        <div className="grid gap-8">
          {personal.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </>
    )}

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

export default Projects;
