import { FaCode, FaLayerGroup, FaPaperPlane, FaPenNib } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Section, SectionArray, SectionMap } from "types/Sections";

const sectionsList: SectionMap = {
  [Section.Projects]: {
    icon: FaLayerGroup,
    title: "Selected Case Studies",
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

export const sectionsArray: SectionArray = Object.entries(sectionsList).map(([id, { icon, title }]) => ({
  id: id as Section,
  icon,
  title,
}));

export default sectionsList;
