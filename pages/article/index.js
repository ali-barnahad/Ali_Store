import React from "react";
import Head from "next/head";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import Image from "next/image";
import { VscInfo } from "react-icons/vsc";
import Link from "next/link";
function Article() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Get 15% extra discount on selected Samsung Galaxy products. Visit Ali Store for the best deals."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Samsung Galaxy Produkte - Ali Store"
        />
        <meta
          property="og:description"
          content="Get 15% extra discount on selected Samsung Galaxy products. Visit Ali Store for the best deals."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://alistore.liara.run/article" />
        <meta
          property="og:image"
          content="https://alistore.liara.run/images/article-og-image.jpg"
        />
        <link rel="canonical" href="https://alistore.liara.run/article" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Samsung Galaxy Produkte - Ali Store",
              "description": "Get 15% extra discount on selected Samsung Galaxy products. Visit Ali Store for the best deals.",
              "image": "https://alistore.liara.run/images/article-og-image.jpg",
              "author": {
                "@type": "Organization",
                "name": "Ali Store"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ali Store",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://alistore.liara.run/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://alistore.liara.run/article"
              }
            }
          `}
        </script>
      </Head>
      <Link href="/mobiles" passHref>
        <div className="block max-w-3xl mx-auto my-4 p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Card className="bg-white">
            <CardHeader className="text-xl block text-center font-semibold ">
              Samsung Galaxy Produkte
            </CardHeader>
            <CardBody className="items-center">
              <p className="text-gray-600">15% Extra auf ausgewählte</p>
            </CardBody>
            <Image
              src="/uploads/ADs.webp"
              alt="Samsung Galaxy Produkte"
              width={700}
              height={300}
              className="rounded-lg"
              loading="lazy"
            />
            <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-[#dbfcff]">
              -15% Extra
            </Button>
            <span className="text-sm text-gray-500 flex items-center justify-center mt-2">
              <VscInfo className="mr-1" /> gesponsert
            </span>
          </Card>
        </div>
      </Link>
    </>
  );
}

export default Article;
