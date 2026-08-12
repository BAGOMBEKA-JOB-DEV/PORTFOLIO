import links from "data/links";
import { format } from "date-fns";
import { FaDev, FaGithub, FaLinkedinIn } from "react-icons/fa";

const socials = [
  { title: "LinkedIn", icon: FaLinkedinIn, link: links.linkedin },
  { title: "GitHub", icon: FaGithub, link: links.github },
  { title: "DEV Community", icon: FaDev, link: links.dev },
];

const Footer = () => (
  <footer
    id="footer"
    className="chat-clearance pb-safe py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-neutral-900/10 dark:border-neutral-50/10"
  >
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      &copy; {format(Date.now(), "yyyy")} Bagombeka Job — Kampala, Uganda
    </p>

    <div className="flex items-center gap-1">
      {socials.map(({ title, link, icon: Icon }) => (
        <a
          key={title}
          href={link}
          target="_blank"
          rel="noreferrer"
          className="grid place-items-center w-11 h-11 text-neutral-600 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <Icon size={18} />
          <span className="sr-only">{title}</span>
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
