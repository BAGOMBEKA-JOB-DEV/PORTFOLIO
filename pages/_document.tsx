import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" href="/images/mylogo.png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
    </Head>

    <body>
      <Main />

      <NextScript />
    </body>
  </Html>
);

export default Document;
