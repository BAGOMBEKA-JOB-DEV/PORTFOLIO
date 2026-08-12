import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      {/* Generated from mylogo.png by scripts/generate-icons.mjs on postbuild. */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      {/* Inter is self-hosted through next/font in _app — no third-party font
          request, so nothing render-blocking sits in front of first paint. */}

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
