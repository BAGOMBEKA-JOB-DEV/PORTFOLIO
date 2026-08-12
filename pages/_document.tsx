import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" href="/images/mylogo.png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />

      {/* Stylesheets belong in _document, not next/head — Next warns about the latter. */}
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />

      {/* Runs before first paint. Scroll-reveal styles are scoped to html.js, so
          without JavaScript nothing is ever hidden — crawlers and no-JS visitors
          get the fully visible page. */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
    </Head>

    <body>
      <Main />

      <NextScript />
    </body>
  </Html>
);

export default Document;
