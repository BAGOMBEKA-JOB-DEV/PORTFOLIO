export type ProjectKind = "case-study" | "open-source" | "personal";

/** One documentation-site capture. `alt` describes the image for anyone who
 *  cannot see it; `caption` is the visible line under it in the lightbox. */
export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
  /** Intrinsic pixel size. Defaults to the 1600x1000 captures; set it when a
   *  set was taken at another size, so the lightbox frame matches the image. */
  width?: number;
  height?: number;
};

export type Project = {
  id: number;
  kind: ProjectKind;
  name: string;
  subtitle: string;
  role: string;
  /** Employer or owning organisation, rendered as a link beside the role. */
  org?: { name: string; href: string };
  /** STAR fields — used by case-study and open-source entries.
   *  Each element renders as its own paragraph. */
  situation?: string[];
  task?: string[];
  action?: string[];
  result?: string[];
  /** Compact entries use this instead of the STAR fields. */
  summary?: string[];
  tags: string[];
  badge?: string;
  /** Documentation-site screenshots, shown as a thumbnail strip plus lightbox. */
  screenshots?: Screenshot[];
  /** Key into components/CaseStudyDiagram — case studies only. */
  diagram?: "emis" | "impala" | "messaging" | "skyl" | "ovrin" | "shiin" | "cullo" | "loam" | "carevelo" | "vuewind" | "vaultcore";
  links?: { label: string; href: string }[];
};
