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
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Bagombeka Job",
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: "Software Engineer",
      email: links.email,
      telephone: links.phone,
      description: DESCRIPTION,
      worksFor: { "@type": "Organization", name: "SMS ONE (U) Limited", url: links.smsone },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Sai Pali Institute of Technology & Science",
      },
      address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
      homeLocation: { "@type": "Place", name: "Kampala, Uganda" },
      knowsLanguage: ["English", "Luganda", "Runyankore-Rukiga"],
      knowsAbout: [
        "Laravel",
        "Go",
        "Vue.js",
        "React",
        "PHP",
        "TypeScript",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Kafka",
        "RabbitMQ",
        "Docker",
        "Kubernetes",
        "Distributed Systems",
        "API Design",
        "System Architecture",
      ],
      sameAs: [links.linkedin, links.github, links.dev, links.twitter],
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
