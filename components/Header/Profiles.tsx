import links from "data/links";
import type { IconType } from "react-icons";
import { FaDev, FaGithub, FaLinkedinIn } from "react-icons/fa";

type Profile = {
  title: string;
  icon: IconType;
  link: string;
};

const profiles: Profile[] = [
  { title: "LinkedIn", icon: FaLinkedinIn, link: links.linkedin },
  { title: "GitHub", icon: FaGithub, link: links.github },
  { title: "DEV Community", icon: FaDev, link: links.dev },
];

const Profiles: React.FC = () => (
  <div className="mt-8 -ml-3 flex items-center gap-1">
    {profiles.map(({ title, link, icon: Icon }) => (
      <a
        key={title}
        href={link}
        target="_blank"
        rel="noreferrer"
        className="grid place-items-center w-11 h-11 text-neutral-600 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        <Icon size={20} />
        <span className="sr-only">{title}</span>
      </a>
    ))}
  </div>
);

export default Profiles;
