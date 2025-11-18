import "animate.css";
import "tippy.js/dist/tippy.css";
import "styles/globals.css";

import Navigation from "components/Navigation";
import NoSSR from "components/NoSSR";
import ThemeProvider from "contexts/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>
          Bagombeka Job
        </title>
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

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.Calendly) {
            window.Calendly.initBadgeWidget({
              url: 'https://calendly.com/bagombekajob16/30min',
              text: '🗒️ Schedule a meeting with me',
              color: '#0069ff',
              // margin-right:'56px',
              textColor: '#ffffff',
              branding: false
            });
          }
        }}
      />
    </>
  );
};

export default App;
