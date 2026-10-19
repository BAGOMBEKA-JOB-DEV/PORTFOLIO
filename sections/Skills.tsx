import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

type SkillGroup = {
  id: number;
  name: string;
  technologies: string[];
};

const skillGroups: SkillGroup[] = [
  {
    id: 1,
    name: "Languages",
    technologies: ["Go", "Java", "TypeScript", "JavaScript", "PHP"],
  },
  {
    id: 2,
    name: "Backend",
    technologies: ["Laravel", "Spring Boot", "REST API Design", "Microservices", "Asynchronous Processing"],
  },
  {
    id: 3,
    name: "Frontend",
    technologies: ["Vue.js", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: 4,
    name: "Mobile",
    technologies: ["Flutter", "React Native"],
  },
  {
    id: 5,
    name: "Databases & Caching",
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    id: 6,
    name: "Messaging",
    technologies: ["Apache Kafka", "RabbitMQ"],
  },
  {
    id: 7,
    name: "Cloud & DevOps",
    technologies: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
  },
  {
    id: 8,
    name: "Monitoring & Identity",
    technologies: ["Prometheus", "Grafana", "Elastic Stack", "Keycloak"],
  },
];

const Skills = () => (
  <div id={Section.Skills}>
    {getSectionHeading(Section.Skills)}

    <dl data-reveal-group className="grid gap-8 md:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.id}>
          <dt className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">{group.name}</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {group.technologies.map((technology) => (
              <span
                key={technology}
                className="px-2.5 py-1 rounded border border-neutral-900/15 dark:border-neutral-50/15 text-xs md:text-sm font-medium"
              >
                {technology}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Skills;
