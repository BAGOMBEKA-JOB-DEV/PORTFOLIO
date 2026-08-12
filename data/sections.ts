import { approvedTestimonials } from "data/testimonials";
import { FaCode, FaLayerGroup, FaPaperPlane, FaPenNib, FaQuoteLeft } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Section, SectionArray, SectionMap } from "types/Sections";

const sectionsList: SectionMap = {
  [Section.Projects]: {
    icon: FaLayerGroup,
    title: "Selected Case Studies",
  },
  [Section.Testimonials]: {
    icon: FaQuoteLeft,
    title: "Testimonials",
  },
  [Section.Skills]: {
    icon: FaCode,
    title: "Technical Stack",
  },
  [Section.Blog]: {
    icon: FaPenNib,
    title: "Writing",
  },
  [Section.AboutMe]: {
    icon: MdPerson,
    title: "About",
  },
  [Section.Contact]: {
    icon: FaPaperPlane,
    title: "Contact",
  },
};

// Testimonials only earns a nav entry once someone has approved a quote — the
// section renders on the same condition, so the link can never dangle.
const isNavigable = (id: Section) => id !== Section.Testimonials || approvedTestimonials.length > 0;

export const sectionsArray: SectionArray = Object.entries(sectionsList)
  .filter(([id]) => isNavigable(id as Section))
  .map(([id, { icon, title }]) => ({
    id: id as Section,
    icon,
    title,
  }));

export default sectionsList;
