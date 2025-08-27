import Tippy from "@tippyjs/react";
import clsx from "clsx";
import links from "data/links";
import type { IconType } from "react-icons";
import { FaDribbble, FaGithubAlt, FaInstagram, FaLinkedinIn } from "react-icons/fa";

type Profile = {
  title: string;
  icon: IconType;
  link: string;
  className: string;
};

const profiles: Profile[] = [
  {
    title: "Instagram",
    icon: FaInstagram,
    link: links.instagram,
    className: "bg-[#e1306c]",
  },
  {
    title: "LinkedIn",
    icon: FaLinkedinIn,
    link: links.linkedin,
    className: "bg-[#2867b2]",
  },

  {
    title: "GitHub",
    icon: FaGithubAlt,
    link: links.github,
    className: "bg-[#211f1f]",
  },
  {
    title: "Dribbble",
    icon: FaDribbble,
    link: links.dribbble,
    className: "bg-orange-500 hover:bg-orange-800",
  },
];

const Profiles: React.FC = () => (
  <div className="h-[22px] mt-5 flex gap-8">
    {profiles.map(({ title, link, icon: Icon, className }, index) => (
      <Tippy key={title} content={title} placement="bottom">
        <span
          className={clsx("p-1 text-sm text-white rounded-full", "animate__animated animate__fadeIn", className)}
          style={{ animationDelay: `${index * 0.5 + 6}s` }}
        >
          <a href={link} target="_blank" rel="noreferrer">
            <Icon />
            <span className="sr-only">{title}</span>
          </a>
        </span>
      </Tippy>
    ))}
  </div>
);

export default Profiles;
