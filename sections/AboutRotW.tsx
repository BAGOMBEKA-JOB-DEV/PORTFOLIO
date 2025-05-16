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
          <strong><b><i>This Website</i></b></strong> has been a passion project of mine since early 2024. I didn&apos;t want my
          story to live on a boring piece of paper only seen by HRs or talent scouts. I wanted everyone to have access to it — and that’s how this project came to life.
        </p>

        <p>
          I keep it updated to reflect who I am, because like this site, I’m always evolving. I build it with the latest tech, constantly pushing myself to explore new frameworks, tools, and design ideas — all while keeping one core goal in mind: making it easy for you to get to know me.
        </p>

        <p>
          This version was crafted using NextJS (React), styled with Tailwind CSS for its utility-first magic, and deployed via VERCEL.
        </p>

        <p>
          I truly hope you enjoyed exploring this site as much as I loved creating and learning through it. If it resonated with you, drop me a message using the contact form — I’d be thrilled to hear from you.
        </p>

        <p>
          Curious about how it works behind the scenes? The full source code is available on GitHub. You’re free to tinker with it or even build your own version — it’s released under the open and friendly MIT License.
        </p>

        <p className="font-light text-blue-800 dark:text-purple-500 italic mt-3">
          If you fork or clone this project, please give me credit. I poured a lot of heart and energy into building it. You didn’t write this code—I did.😂
        </p>
      </div>

      <div >
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
