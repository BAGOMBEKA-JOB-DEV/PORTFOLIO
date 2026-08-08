import "animate.css";
import "tippy.js/dist/tippy.css";
import "styles/globals.css";

import Navigation from "components/Navigation";
import NoSSR from "components/NoSSR";
import ThemeProvider from "contexts/ThemeProvider";
import links from "data/links";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

const SITE_URL = "https://www.bagombekajob.com";
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

const TITLE = "Bagombeka Job — Software Engineer | Laravel, Go, Java, Vue, React | Kampala, Uganda";

const DESCRIPTION =
  "Software engineer building national-scale platforms and distributed systems. I built the learners module of Uganda's national EMIS (30M+ records), co-lead a 100K-line multi-tenant SaaS in Go, and maintain skyl, an open-source Go library for AI model providers. Laravel, Go, Java, Vue, React.";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bagombeka Job",
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: "Software Engineer",
  description: DESCRIPTION,
  worksFor: { "@type": "Organization", name: "SMS ONE (U) Limited" },
  address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
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
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="author" content="Bagombeka Job" />
        <link rel="canonical" href={SITE_URL} />
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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

        {/* TWAK MESSAGING API */}
        <script type="text/javascript">
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
        </script>
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />

        <NoSSR>
          <Navigation />
        </NoSSR>
      </ThemeProvider>

      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  );
};

export default App;
