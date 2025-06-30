import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiDonateHeart } from "react-icons/bi";
import { FaAward, FaDev, FaFilePdf, FaLinkedinIn, FaPaintBrush, FaPaperPlane, FaSignLanguage, FaTools } from "react-icons/fa";
import { MdBook, MdInfo, MdMusicNote, MdPerson, MdSchool, MdWork } from "react-icons/md";
import { Section, SectionArray, SectionMap } from "types/Sections";

const sectionsList: SectionMap = {
  [Section.AboutMe]: {
    icon: MdPerson,
    title: "About Me",
  },
  [Section.WorkExperience]: {
    icon: MdWork,
    title: "Work Experience",
  },
  [Section.Education]: {
    icon: MdSchool,
    title: "Education",
  },
  [Section.Skills]: {
    icon: FaTools,
    title: "Here’s a snapshot of the skills I’ve honed over time.",
  },
  [Section.Projects]: {
    icon: FaDev,
    title: "Projects",
  },
  [Section.Blog]: {
    icon: MdBook,
    title: "Blog",
  },
  [Section.Languages]: {
    icon: FaSignLanguage,
    title: "Languages",
  },
  [Section.Achievements]: {
    icon: FaAward,
    title: "Achievements",
  },
  [Section.Certifications]: {
    icon: AiFillSafetyCertificate,
    title: "Certifications",
  },
  [Section.Philantrophy]: {
    icon: BiDonateHeart,
    title: "Philanthropy — This is where I put my heart into action. Giving back isn’t just something I do; it’s part of who I am.",
  },
  [Section.Photography]: {
    icon: FaLinkedinIn,
    title: "Check out my Linkedin Profile",
  },
  [Section.Music]: {
    icon: MdMusicNote,
    title: "You guessed it right — I’m a music lover!💃. Now hit play on some of my favorite tracks 🕺",
  },
  [Section.Designs]: {
    icon: FaPaintBrush,
    title: "Dribbble Designs",
  },
  [Section.Resume]: {
    icon: FaFilePdf,
    title: "Resume",
  },
  [Section.Contact]: {
    icon: FaPaperPlane,
    title: "Contact",
  },
  [Section.AboutRotW]: {
    icon: MdInfo,
    title: "About <This Website>",
  },
};

export const sectionsArray: SectionArray = Object.entries(sectionsList).map(([id, { icon, title }]) => ({
  id: id as Section,
  icon,
  title,
}));

export default sectionsList;
