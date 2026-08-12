import "styles/globals.css";

import Navigation from "components/Navigation";
import NoSSR from "components/NoSSR";
import ThemeProvider from "contexts/ThemeProvider";
import links from "data/links";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

// Self-hosted at build time: same-origin, preloaded, and size-adjusted against a
// local fallback so swapping in the webfont causes no layout shift.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

const SITE_URL = "https://www.bagombekajob.com";
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

const TITLE = "Bagombeka Job — Software Engineer | Laravel, Go, Java, Vue, React | Kampala, Uganda";

const DESCRIPTION =
  "Software engineer building national-scale platforms and distributed systems. I built the learners module of Uganda's national EMIS (30M+ records), co-lead a 100K-line multi-tenant SaaS in Go, and maintain skyl, an open-source Go library for AI model providers. Laravel, Go, Java, Vue, React.";

const PERSON_ID = `${SITE_URL}/#person`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Bagombeka Job",
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en",
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

const App = ({ Component, pageProps }: AppProps) => {
  // One observer for the whole page. Each element reveals once and is then
  // unobserved — replaying on scroll-up is the clearest "cheap template" tell.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");

    if (!targets.length) return;

    const reveal = (element: Element) => element.classList.add("is-visible");

    // Belt and braces. Hidden-until-revealed content is only acceptable if it is
    // guaranteed to become visible, so anything already at or above the fold is
    // shown immediately rather than waiting on an observer callback.
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top < window.innerHeight) reveal(target);
    });

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach(reveal); // no observer support: show everything rather than hide it
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      // threshold must stay 0. A percentage threshold requires that share of the
      // element to be on screen at once, so a section taller than the viewport can
      // never satisfy it and stays hidden forever — which is exactly what happened
      // to the projects section once its copy was expanded. rootMargin does the
      // "wait until it is properly entering" job instead, at any element height.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        {/* viewport-fit=cover lets the page paint into the notch/rounded corners;
            safe-area insets in globals.css keep content out of them. */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="author" content="Bagombeka Job" />
        {/* Keyed so a page can replace it rather than add a second one — the 404 does. */}
        <link rel="canonical" key="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#0d9488" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bagombeka Job" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bagombeka Job — Software Engineer" />
        <meta property="og:locale" content="en_UG" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Bagombeka Job — Software Engineer" />
        <meta name="twitter:site" content="@job_bags" />
        <meta name="twitter:creator" content="@job_bags" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <ThemeProvider>
        <div className={inter.className}>
          <Component {...pageProps} />

          <NoSSR>
            <Navigation />
          </NoSSR>
        </div>
      </ThemeProvider>

      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      {/* Tawk live chat. This must go through next/script: as an inline <script>
          child of next/head React serialised it HTML-escaped, so the browser hit
          `document.createElement(&quot;script&quot;)` and threw
          "Uncaught SyntaxError: Unexpected token '&'" on every page load. */}
      <Script id="tawk-to" strategy="afterInteractive">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function() {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/67c5c24b9809b71907145924/1ile7u0gj';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `}
      </Script>
    </>
  );
};

export default App;
