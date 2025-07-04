import Tippy from "@tippyjs/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const DISPLAY_COUNT = 3;

type WorkExperience = {
  id: number;
  logo: string;
  name: string;
  period: { start: string; end: string };
  position: string;
  location: string;
  summary: string;
  keyFocus: string[];
};

const workExperiences: WorkExperience[] = [
  {
    id: 1,
    logo: "/images/work-experience/smsone.png",
    name: "SMSONE LTD",
    period: { start: "2024 August 22", end: "Present" },
    position: "Software Engineer",
    location: "Kampala, Uganda",
    summary: "",
    keyFocus: [
      "Vue",
      "Tailwind CSS",
      "Laravel",
      "PostGres",
      "Docker",
      "Java",
      "RabbitMQ",
      "Elastic Stack",
      "React",
      "Python",
      "GoLang",
      "Kotlin",
      "Flutter",
      "MongoDB",
      "React Native",
      "NextJs",
      "PHP",
      "Typescript",
    ],
  },
  {
    id: 2,
    logo: "/images/work-experience/eloi.png",
    name: "ELOI MINISTRIES",
    period: { start: "2024 Jan 22", end: "July 24" },
    position: "Junior Full-Stack Developer",
    location: "Remote: Burlington, Vermont, USA",
    summary: "",
    keyFocus: [
      "Vue",
      "React",
      "Tailwind CSS",
      "Bootstrap",
      "Angular Js",
      "Laravel",
      "MongoDB",
      "PostGres",
      "Java",
      "Docker",
      "Wordpress",
      "Django",
      "Elastic Stack",
      "RabbitMQ",
      ".......",
    ],
  },
  {
    id: 3,
    logo: "/images/work-experience/tuko.png",
    name: "Tuko Supper App",
    period: { start: "2023 Jan 23", end: "Dec 12" },
    position: "Frontend Developer",
    location: "Kampala, Uganda",
    summary: "",
    keyFocus: ["React/React Native", "NestJS", "Flutter", "Wordpress", "Bootstrap"],
  },
  {
    id: 4,
    logo: "/images/work-experience/voice.jpeg",
    name: "VOICE MALL",
    period: { start: "2022 Jan 20", end: "2023 Feb 23" },
    position: "Database Administrator",
    location: "Entebbe,  Uganda",
    summary: "",
    keyFocus: ["Postres", "SQL", "PLSQL"],
  },
];

type Props = {
  data: WorkExperience;
  isFirst: boolean;
  isLast: boolean;
};

const WorkExperience: React.FC<Props> = ({ data, isFirst, isLast }) => (
  <div className="flex group">
    <div className={clsx("ml-1 w-1 flex-shrink-0 bg-neutral-500/25", { "rounded-t": isFirst, "rounded-b": isLast })} />

    <div className="-ml-2 mt-8 flex-shrink-0 relative w-3 h-3 rounded-full shadow-lg bg-teal-500/80 dark:bg-white/80 group-hover:w-6 transition-[width]" />

    <div className="mt-5 ml-8 grid gap-2 pb-2">
      <div className="relative w-[100px] h-10">
        <Image src={data.logo} alt={data.name} width={100} height={40} className="object-contain w-10 h-10" />
      </div>

      <div>
        <h3>
          <span className="text-base font-bold">{data.name}</span>{" "}
          <span className="text-xs">
            ({data.period.start} - {data.period.end})
          </span>
        </h3>
        <h4>{data.position}</h4>
      </div>

      <h5 className="my-1 flex gap-2 items-center text-xs">
        <FaLocationArrow />
        <span>{data.location}</span>
      </h5>

      <p className="prose prose-sm prose-neutral dark:prose-invert">{data.summary}</p>

      <p className="text-xs leading-relaxed prose-sm prose-neutral dark:prose-invert">
        <strong>Key Focus:</strong> {data.keyFocus.join(", ")}
      </p>
    </div>
  </div>
);

const WorkExperienceTimeline = () => {
  const [showMore, setShowMore] = useState(workExperiences.length > DISPLAY_COUNT ? false : true);

  return (
    <div id={Section.WorkExperience}>
      {getSectionHeading(Section.WorkExperience)}

      <div className="flex flex-col">
        {workExperiences
          .filter((_, index) => (showMore ? true : index < DISPLAY_COUNT))
          .map((data, index) => (
            <WorkExperience key={data.id} data={data} isFirst={index === 0} isLast={index === 2} />
          ))}
      </div>

      {!showMore && (
        <Tippy content={`Show ${workExperiences.length - DISPLAY_COUNT} More`} placement="right">
          <div className="inline-block ml-8 p-2 cursor-pointer" onClick={() => setShowMore(true)}>
            <MdMoreHoriz size="24" />
          </div>
        </Tippy>
      )}
    </div>
  );
};

export default WorkExperienceTimeline;
