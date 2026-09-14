import links from "data/links";
import projectsList from "data/projects";

// Shared SEO constants and JSON-LD builders.
//
// _app owns the site-wide tags; individual pages import from here to build
// their own canonical, og:url and page-level JSON-LD. Keeping the origin in one
// place is what stops a page from silently claiming to be the homepage — which
// is exactly the bug this module was extracted to fix.

export const SITE_URL = "https://www.bagombekajob.com";
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

export const TITLE = "Bagombeka Job — Software Engineer | Laravel, Go, Java, Vue, React | Kampala, Uganda";

export const DESCRIPTION =
  "Software engineer building national-scale platforms and distributed systems. I built the learners module of Uganda's national EMIS (30M+ records), co-lead a 100K-line multi-tenant SaaS in Go, and maintain skyl, an open-source Go library for AI model providers. Laravel, Go, Java, Vue, React.";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const WIKIDATA = "https://www.wikidata.org/wiki/";

// Every skill is pinned to a Wikidata entity. A bare string makes a crawler
// guess, and the guesses go badly: resolved naively, "Go" is a state in Brazil,
// "Docker" the job of unloading ships, "PHP" the Philippine peso, "Prometheus" a
// moth genus and "Terraform" planetary engineering. Each ID below was checked
// against the Wikidata API by label, English Wikipedia title and description.
//
// Mirrors sections/Skills.tsx, so the markup describes what the page shows.
const SKILLS: [name: string, wikidataId: string][] = [
  // Languages
  ["Go", "Q37227"],
  ["Java", "Q251"],
  ["TypeScript", "Q978185"],
  ["JavaScript", "Q2005"],
  ["PHP", "Q59"],
  // Backend
  ["Laravel", "Q13634357"],
  ["Spring Boot", "Q98731994"],
  ["NestJS", "Q107015664"],
  ["Django", "Q842014"],
  // Frontend and mobile
  ["Vue.js", "Q24589705"],
  ["React", "Q19399674"],
  ["React Native", "Q55774523"],
  ["Flutter", "Q39072787"],
  ["Next.js", "Q56062435"],
  ["Tailwind CSS", "Q102173844"],
  // Data
  ["PostgreSQL", "Q192490"],
  ["MySQL", "Q850"],
  ["MongoDB", "Q1165204"],
  ["Redis", "Q2136322"],
  // Messaging
  ["Apache Kafka", "Q16235208"],
  ["RabbitMQ", "Q2081413"],
  // Infrastructure
  ["Docker", "Q15206305"],
  ["Kubernetes", "Q22661306"],
  ["Terraform", "Q28957072"],
  ["Amazon Web Services", "Q456157"],
  ["Google Cloud Platform", "Q17054505"],
  ["Linux", "Q388"],
  // Observability and identity
  ["Prometheus", "Q52534999"],
  ["Grafana", "Q43399271"],
  ["Elasticsearch", "Q3050461"],
  ["Keycloak", "Q42916195"],
  // Practice
  ["Continuous integration", "Q965769"],
  ["Microservices", "Q18344624"],
  ["Distributed computing", "Q180634"],
  ["REST API design", "Q165194"],
  ["Software architecture", "Q846636"],
  ["Software engineering", "Q80993"],
];

const knowsAbout = SKILLS.map(([name, id]) => ({ "@type": "DefinedTerm", name, sameAs: `${WIKIDATA}${id}` }));

/** The subject every node reinforces, so the site and its case studies all point at one topic. */
const SOFTWARE_ENGINEERING = { "@type": "Thing", name: "Software engineering", sameAs: `${WIKIDATA}Q80993` };

/** Site-wide nodes. These are true on every route, so _app renders them once. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Bagombeka Job",
      description: DESCRIPTION,
      inLanguage: "en",
      about: SOFTWARE_ENGINEERING,
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Bagombeka Job",
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: "Software Engineer",
      // The formal statement of the profession. jobTitle alone is free text;
      // O*NET-SOC 15-1252.00 is "Software Developers", the taxonomy Google reads.
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationalCategory: "15-1252.00",
        skills: SKILLS.map(([name]) => name).join(", "),
      },
      email: links.email,
      // No telephone here, deliberately. Name + phone + postal address is the
      // shape of a local-business listing, which pulls the site toward places.
      // The number is still shown to people in the Contact section.
      description: DESCRIPTION,
      worksFor: { "@type": "Organization", name: "SMS ONE (U) Limited", url: links.smsone },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Sai Pali Institute of Technology & Science",
      },
      address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
      workLocation: { "@type": "Place", name: "Kampala, Uganda" },
      knowsLanguage: ["English", "Luganda", "Runyankore-Rukiga"],
      knowsAbout,
      // Only live profiles that are verifiably this person. A dead or unrelated
      // sameAs target weakens the identity instead of confirming it.
      sameAs: [links.linkedin, links.github, links.dev, links.twitter, links.hashnode, links.medium],
    },
  ],
};

// One CreativeWork per project. The case studies carry most of the site's text
// and had no markup at all — every field here is read from data/projects.ts
// rather than written fresh, so the schema cannot drift from the page copy.
const projectSchema = projectsList.map((project) => ({
  "@type": "CreativeWork",
  "@id": `${SITE_URL}/#project-${project.id}`,
  name: project.name,
  description: project.subtitle,
  keywords: project.tags.join(", "),
  about: SOFTWARE_ENGINEERING,
  author: { "@id": PERSON_ID },
  inLanguage: "en",
  isPartOf: { "@id": WEBSITE_ID },
  ...(project.links?.[0] && { url: project.links[0].href }),
}));

/** Homepage-only nodes. ProfilePage must not render on other routes — it hard-codes
 *  the site root as its url, which is what made every page claim to be the homepage. */
export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      hasPart: projectSchema.map(({ "@id": id }) => ({ "@id": id })),
      inLanguage: "en",
    },
    ...projectSchema,
  ],
};

/** Builds the WebPage + BreadcrumbList pair for a sub-page. */
export const pageSchema = ({ path, name, description }: { path: string; name: string; description: string }) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}#webpage`,
      url: `${SITE_URL}${path}`,
      name,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${path}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
      ],
    },
  ],
});
