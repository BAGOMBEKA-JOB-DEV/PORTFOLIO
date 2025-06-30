import Button from "components/Button";
import links from "data/links";
import { FaLinkedinIn } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";

const Photography: React.FC = () => (
  <div id={Section.Photography}>
    {getSectionHeading(Section.Photography)}

    <div className="mt-12 flex flex-col xl:flex-row xl:justify-center  xl:lg:gap-6 items-center space-y-8 xl:space-y-0">
  <div className="flex justify-center w-full">
    <iframe
    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7339567106482405376?collapsed=1"
    className="w-full h-[672px] "
      frameBorder="0"
      allowFullScreen
      title="Linkedin Post 1"
    />
  </div>

  <div className="flex justify-center w-full">
    <iframe
      src="https://www.linkedin.com/embed/feed/update/urn:li:share:7316508569388916737?collapsed=1"
       className="w-full h-[672px]"
      frameBorder="0"
      allowFullScreen
      title="Linkedin Post 2"
    />
  </div>
</div>

<div className="mt-5 flex flex-col xl:flex-row xl:justify-center  xl:lg:gap-6 items-center space-y-8 xl:space-y-0">
  <div className="flex justify-center w-full">
    <iframe
     src="https://www.linkedin.com/embed/feed/update/urn:li:share:7322278790452117504?collapsed=1"
    className="w-full h-[672px] "
      frameBorder="0"
      allowFullScreen
      title="Linkedin Post 1"
    />
  </div>

  <div className="flex justify-center w-full">
    <iframe
      src="https://www.linkedin.com/embed/feed/update/urn:li:share:7319324799925673985?collapsed=1"
       className="w-full h-[672px]"
      frameBorder="0"
      allowFullScreen
      title="Linkedin Post 2"
    />
  </div>
</div>


    <Button icon={FaLinkedinIn} className="mt-8" onClick={() => openURLInNewTab(links.linkedin)}>
      See full posts on Linkedin
    </Button>
  </div>
);

export default Photography;
