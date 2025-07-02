import Button from "components/Button";
import { FaSpotify } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";

const Music = () => (
  <div id={Section.Music}>
    {getSectionHeading(Section.Music)}

    <div className="grid md:grid-cols-3 gap-12">
      <div className="max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
      <p>
  If you’ve made it this far through my profile and found it intriguing, research suggests that a person’s taste in music can reveal a lot about who they are.
</p>

<p>
  I’ve often been complimented for having a solid ear for good tunes, and I’ve always wanted a simple way to share my current favorites—so I put together a Spotify playlist called Melancholy: a regularly updated mix of what’s been living rent-free in my headphones.
</p>


        <Button
          icon={FaSpotify}
          className="mt-8 text-sm"
          onClick={() => openURLInNewTab("https://open.spotify.com/playlist/37i9dQZF1EVJHK7Q1TBABQ")}
        >
          Listen to My Favourites on Spotify
        </Button>
      </div>
      <iframe
       src="https://open.spotify.com/embed/playlist/137XmvjjfqELu9vfZ1ATWr?utm_source=generator"
        width="100%"
        height="512"
        allow="encrypted-media"
        className=" md:block rounded col-span-2 "
      />
    </div>
  </div>
);

export default Music;
