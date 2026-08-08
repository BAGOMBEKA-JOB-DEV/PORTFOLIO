import Image from "next/image";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

type WorkExperience = {
  id: number;
  logo: string;
  name: string;
  period: string;
  position: string;
  location: string;
  highlights: string[];
  stack: string[];
};

// NOTE: [VERIFY] markers flag details inferred from the CV that must be confirmed
// before shipping — especially the SMS ONE start date, which differs between the
// old site (Sept 2024) and the CV (Jan 2025). Pick one and use it everywhere.
const workExperiences: WorkExperience[] = [
  {
    id: 1,
    logo: "/images/work-experience/smsone.png",
    name: "SMS ONE (U) Limited",
    period: "September 2024 — Present", // [VERIFY] CV says January 2025
    position: "Software Engineer",
    location: "Kampala, Uganda",
    highlights: [
      "Built the national learners module of Uganda's Ministry of Education EMIS platform in Laravel and Vue, registering 30M+ learner records across every school level on a PostgreSQL schema exceeding 1,000 tables.",
      "Integrated NIRA national identity verification at the ingestion layer, validating identity records at the point of entry and eliminating duplicate registrations at source.",
      "Integrated examination registration and results processing with UNEB, handling roughly 300,000 candidates per examination cycle.",
      "Engineered structured bulk ingestion for 45M+ contacts and moved delivery onto asynchronous queue workers, architected for 100,000+ concurrent users.",
    ],
    stack: ["Laravel", "Vue", "PostgreSQL", "Go", "RabbitMQ", "Docker"],
  },
  {
    id: 2,
    logo: "/images/work-experience/eloi.png",
    name: "Eloi Ministries",
    period: "January 2024 — July 2024",
    position: "Full-Stack Developer",
    location: "Remote — Burlington, Vermont, USA",
    highlights: [
      "Delivered full-stack features across Laravel and Vue applications for a distributed, fully remote team spanning an eight-hour time difference.",
      "Built and maintained REST APIs backed by PostgreSQL and MongoDB.",
      "[VERIFY — replace with a concrete, quantified outcome from this role.]",
    ],
    stack: ["Laravel", "Vue", "React", "PostgreSQL", "MongoDB", "Docker"],
  },
  {
    id: 3,
    logo: "/images/work-experience/tuko.png",
    name: "Tuko Super App",
    period: "January 2023 — December 2023",
    position: "Frontend Developer",
    location: "Kampala, Uganda",
    highlights: [
      "Built consumer-facing interfaces in React and React Native for a multi-service super app.",
      "Integrated frontend clients against NestJS backend services.",
      "[VERIFY — replace with a concrete, quantified outcome from this role.]",
    ],
    stack: ["React", "React Native", "NestJS", "Flutter", "TypeScript"],
  },
];

const WorkExperienceTimeline = () => (
  <div id={Section.WorkExperience}>
    {getSectionHeading(Section.WorkExperience)}

    <div className="grid gap-10">
      {workExperiences.map((job) => (
        <article
          key={job.id}
          className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-8 pb-10 last:pb-0 border-b last:border-b-0 border-neutral-900/10 dark:border-neutral-50/10"
        >
          <Image
            src={job.logo}
            alt={job.name}
            width={48}
            height={48}
            className="object-contain w-12 h-12 rounded"
          />

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg md:text-xl font-bold tracking-tight">{job.name}</h3>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{job.period}</span>
            </div>

            <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
              {job.position} · {job.location}
            </p>

            <ul className="mt-4 grid gap-2.5">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm md:text-base leading-relaxed">
                  <span aria-hidden className="mt-2 w-1 h-1 rounded-full bg-teal-600 dark:bg-teal-400 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">{job.stack.join(" · ")}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default WorkExperienceTimeline;
