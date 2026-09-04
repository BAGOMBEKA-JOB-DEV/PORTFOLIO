import "styles/globals.css";

import Navigation from "components/Navigation";
import NoSSR from "components/NoSSR";
import ThemeProvider from "contexts/ThemeProvider";
import { DESCRIPTION, OG_IMAGE, SITE_URL, siteSchema, TITLE } from "data/seo";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

// Self-hosted at build time: same-origin, preloaded, and size-adjusted against a
// local fallback so swapping in the webfont causes no layout shift.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

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
        <meta name="description" key="description" content={DESCRIPTION} />
        <meta name="author" content="Bagombeka Job" />
        {/* max-image-preview:large opts the og image into full-size SERP thumbnails. */}
        <meta name="robots" key="robots" content="index, follow, max-image-preview:large" />
        {/* Single tag by necessity: both head managers in the pages router de-dupe
            meta by name, even with distinct keys, so a prefers-color-scheme pair
            silently collapses to one. Browser chrome only — no SEO impact. */}
        <meta name="theme-color" content="#0d9488" />

        {/* Both third-party scripts load afterInteractive; opening the connections
            during idle time keeps their handshake off the critical path. */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://embed.tawk.to" />

        {/* The identity tags are keyed so a sub-page replaces them instead of
            appending a second set — otherwise every page shares the homepage card. */}
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:site_name" content="Bagombeka Job" />
        <meta property="og:url" key="og:url" content={SITE_URL} />
        <meta property="og:title" key="og:title" content={TITLE} />
        <meta property="og:description" key="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bagombeka Job — Software Engineer" />
        <meta property="og:locale" content="en_UG" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" key="twitter:title" content={TITLE} />
        <meta name="twitter:description" key="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Bagombeka Job — Software Engineer" />
        <meta name="twitter:site" content="@job_bags" />
        <meta name="twitter:creator" content="@job_bags" />

        {/* Site-wide nodes only. Page-level nodes (ProfilePage, WebPage) are
            rendered by the page that owns them. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
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
