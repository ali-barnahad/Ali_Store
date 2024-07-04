import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { appWithTranslation } from "next-i18next";
import { TranslationProvider } from "@/context/TranslationContext";
import Head from "next/head";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: ["400", "700"], subsets: ["latin"] });

const Footer = dynamic(() => import("@/components/modules/footer/Footer"), {
  ssr: false,
});
const MyNavbar = dynamic(() => import("@/components/modules/navbar/Navbar"), {
  ssr: false,
});

function App({ Component, pageProps }) {
  useEffect(() => {
    const setLanguageClass = (lang) => {
      const html = document.documentElement;
      html.classList.remove("fa", "de", "en");
      html.classList.add(lang);
    };

    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguageClass(storedLanguage);

    const languageChangeHandler = (event) => {
      setLanguageClass(event.detail);
    };

    window.addEventListener("languageChange", languageChangeHandler);

    return () => {
      window.removeEventListener("languageChange", languageChangeHandler);
    };
  }, []);

  return (
    <TranslationProvider>
      <Head>
        <title>{pageProps.title || "Ali Store - High-Quality Stickers"}</title>
        <meta
          name="description"
          content={
            pageProps.description ||
            "Discover high-quality stickers for all purposes on Ali Store. Shop now for unique designs and fast delivery."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={pageProps.title || "Ali Store - High-Quality Stickers"}
        />
        <meta
          property="og:description"
          content={
            pageProps.description ||
            "Discover high-quality stickers for all purposes on Ali Store. Shop now for unique designs and fast delivery."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            process.env.NEXT_PUBLIC_SITE_URL || "https://sticker-next.liara.run"
          }
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`}
        />
        <meta
          name="keywords"
          content="stickers, high-quality stickers, custom stickers, unique sticker designs"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          as="style"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
            type="text/css"
          />
        </noscript>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://sticker-next.liara.run",
              "name": "${
                pageProps.title || "Ali Store - High-Quality Stickers"
              }",
              "description": "${
                pageProps.description ||
                "Discover high-quality stickers for all purposes on Ali Store. Shop now for unique designs and fast delivery."
              }",
              "publisher": {
                "@type": "Organization",
                "name": "Ali Store"
              }
            }
          `}
        </script>
      </Head>
      <AuthProvider>
        <div className={`page-container ${montserrat.className}`}>
          <MyNavbar />
          <div className="content-wrapper">
            <Component {...pageProps} />
          </div>
          <Footer className="footer" />
        </div>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default appWithTranslation(App);
