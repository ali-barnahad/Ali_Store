// pages/_app.js
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { TranslationProvider } from "@/context/TranslationContext";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/router";
import NavbarNew from "@/components/modules/navbar/NavbarNew";
import BackButton from "@/components/modules/backButton/BackButton";
import Layout from "@/components/modules/layout/Layout";
const ScrollToTopButton = dynamic(
  () => import("@/components/modules/scrollToTopButton/ScrollToTopButton"),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/modules/footer/Footer"), {
  ssr: false,
});

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const setLanguageClass = (lang) => {
      const html = document.documentElement;
      html.classList.remove("de", "en");
      html.classList.add(lang);
    };

    const storedLanguage = localStorage.getItem("language") || "de";
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
            process.env.NEXT_PUBLIC_SITE_URL || "https://alistore.liara.run"
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
            "url": "https://alistore.liara.run",
            "name": "${pageProps.title || "Ali Store - High-Quality Stickers"}",
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
      <NextUIProvider navigate={router.push}>
        <div className={`page-container `}>
          <Layout>
            <AuthProvider>
              <NavbarNew />
              <div className="content-wrapper">
                <Component {...pageProps} />
                <ScrollToTopButton />
                <BackButton /> {/* Add the back button here */}
              </div>
            </AuthProvider>
          </Layout>
          <Footer className="footer" />
        </div>
      </NextUIProvider>
    </TranslationProvider>
  );
}

export default appWithTranslation(App);
