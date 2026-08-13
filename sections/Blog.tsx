import links from "data/links";
import { FaDev, FaLinkedinIn } from "react-icons/fa";
import { Article, Section } from "types/Sections";
import { formatDateString, getSectionHeading } from "utils";

type Props = {
  articles: Article[];
};

const Blog: React.FC<Props> = ({ articles }) => (
  <div id={Section.Blog}>
    {getSectionHeading(Section.Blog)}

    <p className="max-w-3xl text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
      I write about engineering practice, architecture and technology trends — on the DEV Community, and in TechTalk, my
      LinkedIn newsletter.
    </p>

    <div data-reveal-group className="mt-8 grid gap-6 md:grid-cols-3">
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/25 dark:hover:border-neutral-50/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <h4 className="font-bold leading-snug">{article.title}</h4>

          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
            {formatDateString(article.published_at)}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-3">
            {article.description}
          </p>
        </a>
      ))}
    </div>

    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
      <a
        href={links.dev}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center min-h-[44px] gap-2 text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        <FaDev />
        More on DEV Community
      </a>

      <a
        href={links.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center min-h-[44px] gap-2 text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        <FaLinkedinIn />
        TechTalk newsletter on LinkedIn
      </a>
    </div>
  </div>
);

export default Blog;
