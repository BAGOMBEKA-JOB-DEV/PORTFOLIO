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
    name: "Primary",
    technologies: ["Laravel", "Go", "Java", "Vue.js", "React"],
  },
  {
    id: 2,
    name: "Backend Engineering",
    technologies: [
      "PHP (OOP)",
      "Go",
      "Java / Spring Boot",
      "NestJS",
      "Django",
      "REST API Design",
      "Microservices",
      "Asynchronous Queues",
    ],
  },
  {
    id: 3,
    name: "Frontend Architecture",
    technologies: [
      "Vue.js",
      "React",
      "React Native",
      "Flutter",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
    ],
  },
  {
    id: 4,
    name: "Data & Infrastructure",
    technologies: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Elastic Stack",
      "Keycloak",
      "CI/CD",
      "Linux",
    ],
  },
];

const Skills = () => (
  <div id={Section.Skills}>
    {getSectionHeading(Section.Skills)}

    <dl className="grid gap-8 md:grid-cols-2">
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
