// /pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Discover high-quality stickers for all purposes on Ali Store. Shop now for unique designs and fast delivery."
        />
        <meta
          name="keywords"
          content="stickers, high-quality stickers, custom stickers, unique sticker designs"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ali Store - High-Quality Stickers" />
        <meta
          property="og:description"
          content="Discover high-quality stickers for all purposes on Ali Store. Shop now for unique designs and fast delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alistore.liara.run" />
        <meta
          property="og:image"
          content="https://alistore.liara.run/images/og-image.jpg"
        />
        <link rel="canonical" href="https://alistore.liara.run" />
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
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://alistore.liara.run",
            name: "Ali Store - High-Quality Stickers",
            description:
              "Discover high-quality stickers for all purposes on Ali Store. Shop now for unique designs and fast delivery.",
            publisher: {
              "@type": "Organization",
              name: "Ali Store",
            },
          })}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
