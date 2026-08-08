import type { IconType } from "react-icons";

export enum Section {
  "Projects" = "case-studies",
  "Skills" = "stack",
  "WorkExperience" = "experience",
  "Blog" = "writing",
  "AboutMe" = "about",
  "Contact" = "contact",
}

export type SectionMap = Record<Section, { icon: IconType; title: string }>;

export type SectionArray = {
  id: Section;
  title: string;
  icon: IconType;
}[];

export type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  public_reactions_count: number;
  social_image: string;
  published_at: string;
  tag_list: string[];
};


export type ProjectKind = "case-study" | "open-source";

export type Project = {
  id: number;
  kind: ProjectKind;
  name: string;
  subtitle: string;
  role: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  tags: string[];
  badge?: string;
  links?: { label: string; href: string }[];
};





