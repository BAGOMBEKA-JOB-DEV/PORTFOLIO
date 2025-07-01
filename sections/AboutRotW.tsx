import Button from "components/Button";
import ImageLink from "components/ImageLink";
import links from "data/links";
import { MdStar } from "react-icons/md";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";

const AboutRotW = () => (
  <div id={Section.AboutRotW}>
    {getSectionHeading(Section.AboutRotW)}

    <div className="lg:flex lg:gap-10 ">
      <div className="w-full lg:w-3/4 max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
        <p>
          <strong>
            <b>
              <i>This Website</i>
            </b>
          </strong>{" "}
          has been a passion project of mine since early 2024. I didn&apos;t want my story to live on a boring piece of
          paper only seen by HRs or talent scouts. I wanted everyone to have access to it — and that’s how this project
          came to life.
        </p>

        <p>
          I keep it updated to reflect who I am, because like this site, I’m always evolving. I build it with the latest
          tech, constantly pushing myself to explore new frameworks, tools, and design ideas — all while keeping one
          core goal in mind: making it easy for you to get to know me.
        </p>

        <p>
          This version was crafted using{" "}
          <a className="text-green-600 hover:text-blue-600 italic" href="https://www.nextjs.org">
            Next JS (React)
          </a>
          ., styled with
          <a className="text-green-600 hover:text-blue-600 italic" href="https://www.tailwindcss.com">
            Tailwind CSS
          </a>
          . for its utility-first magic, and deployed via
          <a className="text-green-600 hover:text-blue-600 italic" href="https://www.vercel.com">
            VERCEL
          </a>
          .
        </p>

        <p>
          I truly hope you enjoyed exploring this site as much as I loved creating and learning through it. If it
          resonated with you, drop me a message using the contact form — I’d be thrilled to hear from you.
        </p>

        <p>
          Curious about how it works behind the scenes? The full source code is available on GitHub. You’re free to
          tinker with it or even build your own version — it’s released under the open and friendly MIT License.
        </p>

        <p className="animate-pulse text-purple-800 dark:text-green-600">
        If it breaks... that’s a feature, not a bug 😅⚠️. <br/>
        If it works... wow, I’m surprised too 😂🚀.
        </p>

        <p className="font-light text-green-500 dark:text-green-500 italic mt-3">
          If you fork or clone this project, please throw a little credit my way 🙏. I poured my soul, sweat, and
          possibly some tears into building this thing 💻💔. You didn’t write this code—I did 😤. And no, I’m not
          joking... okay maybe just a little 🤡😂. But seriously, don’t be that person. Give props where props are due!
          🫡✨
        </p>
      </div>

      <div>
        <ImageLink
          href="https://www.bagombekajob.com"
          alt="You have reached the end of this website!"
          src="https://i.imgur.com/Dr8j5iv.gif"
          dimensions={{ width: 600, height: 800 }}
        />
      </div>
    </div>

    <Button icon={MdStar} className="mt-8" onClick={() => openURLInNewTab(links.repository)}>
      Star this Project on GitHub
    </Button>
  </div>
);

export default AboutRotW;
