import links from "data/links";
import projectsList from "data/projects";
import { FaGithub } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const STEPS = [
  { key: "situation", label: "Situation" },
  { key: "task", label: "Task" },
  { key: "action", label: "Action" },
] as const;

const Projects = () => (
  <div id={Section.Projects}>
    {getSectionHeading(Section.Projects)}

    <div className="grid gap-8">
      {projectsList.map((project) => (
        <article
          key={project.id}
          className="p-6 md:p-8 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors"
        >
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.name}</h3>

          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{project.subtitle}</p>

          <p className="mt-3 text-sm font-semibold text-teal-600 dark:text-teal-400">{project.role}</p>

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

          <div className="mt-6 p-4 rounded-lg bg-teal-600/10 dark:bg-teal-400/10 border-l-2 border-teal-600 dark:border-teal-400">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">Result</p>
            <p className="mt-1.5 text-sm md:text-base font-medium leading-relaxed">{project.result}</p>
          </div>

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
        </article>
      ))}
    </div>

    <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-400">
      These platforms are proprietary and closed-source.{" "}
      <a
        href={links.github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        <FaGithub />
        Open-source and personal projects on GitHub
      </a>
    </p>
  </div>
);

export default Projects;
