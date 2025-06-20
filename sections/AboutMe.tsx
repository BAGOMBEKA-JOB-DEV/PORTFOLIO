import Image from "next/image";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const AboutMe = () => (
  <div id={Section.AboutMe}>
    {getSectionHeading(Section.AboutMe)}

    <div className="grid md:grid-cols-4 gap-12">
      <div className="relative col-span-1 hidden md:block">
        <Image
          fill
          alt="Selfie Boy"
          src="/images/about-me/selfie-boy.svg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="col-span-3 max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
      <p>Hey there!👀</p>

<p>
  I&apos;m Bagombeka Job, and as you might have already read, I&apos;m a software developer, designer, and
  writer. This website was made to showcase all of what I can do and plan to do. Don&apos;t judge my writing
  based on this section though, this is by far my shoddiest work yet.
</p>

<p>
  Am a passionate software developer and internet entrepreneur who’s always been driven by curiosity and creativity. I built this website as a space to share my journey, ideas, and everything I care about in this fast-changing digital world.
</p>

<p>
  I got into design because I consider myself a pseudo-perfectionist, if that&apos;s even a word? As in, I hate
  to see things &apos;not look good&apos;. So I set out on a journey to make products that people use that
  &apos;look great&apos;, and I&apos;m forever on that path.
</p>

<p>
  I dove into  development because computers have always fascinated me.<code>int i = 10;</code> creates an integer
  of value 10? LIKE, WOW! But seriously, just seeing code getting converted to things we use regularly, like
  Facebook or Amazon, was no less than magic to me and that&apos;s where my quest to invent began.
</p>

<p>
  I love building things that matter — tools, experiences, and platforms that connect people, solve real problems, and spark inspiration. For me, technology isn’t just about code, it’s about possibility. Every project I take on is a chance to learn, create, and grow.
</p>


<p>
  Outside the screen, I’m deeply passionate about personal growth and helping others find clarity and purpose. I believe in honest work, bold dreams, and leaving the world a little better than I found it.
</p>

<p>
  I created this website so I could showcase all this and through this process, make it easier for you to
  connect with me. If you like what you see, head over to the <a className="text-green-500 italic" href="#contact">contact section</a> below and
  send me a text. I would love to hear from you!
</p>

      </div>
    </div>
  </div>
);

export default AboutMe;
