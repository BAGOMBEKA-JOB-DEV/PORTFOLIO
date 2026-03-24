import Button from "components/Button";
import links from "data/links";
import { FaLinkedinIn } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";

const Linkedin: React.FC = () => (
  <div id={Section.Linkedin}>
    {getSectionHeading(Section.Linkedin)}

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
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7354079691420446720?collapsed=1"
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
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7316508569388916737?collapsed=1"
          className="w-full h-[672px] "
          frameBorder="0"
          allowFullScreen
          title="Linkedin Post 1"
        />
      </div>

      <div className="flex justify-center w-full">
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7373081809175175168?collapsed=1"

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
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7344732419645759488?collapsed=1"
          className="w-full h-[672px] "
          frameBorder="0"
          allowFullScreen
          title="Linkedin Post 1"
        />
      </div>

      <div className="flex justify-center w-full">
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7322278790452117504?collapsed=1"
          className="w-full h-[672px]"
          frameBorder="0"
          allowFullScreen
          title="Linkedin Post 2"
        />
      </div>
    </div>

  <div className="flex space-x-4">
  <Button icon={FaLinkedinIn} className="mt-8" onClick={() => openURLInNewTab(links.linkedin)}>
      See full posts on Linkedin
    </Button>
      <Button icon={FaLinkedinIn} className="mt-8  bg-blue-600" onClick={() => openURLInNewTab(links.follow_me_on_linkedin)}>
      Follow me on Linkedin
    </Button>
  </div>
  </div>
);

export default Linkedin;
