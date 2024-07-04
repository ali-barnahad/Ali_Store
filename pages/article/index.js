import React from "react";
import Head from "next/head";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "@/styles/article.module.css";
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
        <meta
          property="og:url"
          content="https://sticker-next.liara.run/article"
        />
        <meta
          property="og:image"
          content="https://sticker-next.liara.run/images/article-og-image.jpg"
        />
        <link rel="canonical" href="https://sticker-next.liara.run/article" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Samsung Galaxy Produkte - Ali Store",
              "description": "Get 15% extra discount on selected Samsung Galaxy products. Visit Ali Store for the best deals.",
              "image": "https://sticker-next.liara.run/images/article-og-image.jpg",
              "author": {
                "@type": "Organization",
                "name": "Ali Store"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ali Store",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sticker-next.liara.run/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://sticker-next.liara.run/article"
              }
            }
          `}
        </script>
      </Head>
      <Link href="/mobiles">
        <Card className={styles.card}>
          <Card.Body className={styles.cardBody}>
            <Card.Title className={styles.cardTitle}>
              Samsung Galaxy Produkte
            </Card.Title>
            <Card.Text className={styles.cardText}>
              15% Extra auf ausgewählte
            </Card.Text>
          </Card.Body>
          <Image
            src="/categoryImages/ADs.webp"
            className={styles.cardImg}
            alt="Samsung Galaxy Produkte"
            width={700}
            height={300}
            loading="lazy" // Explicitly setting lazy loading
          />
          <Button className={styles.button} variant="primary">
            -15% Extra
          </Button>
          <span className={styles.cardSponser}>{<VscInfo />} gesponsert</span>
        </Card>
      </Link>
    </>
  );
}

export default Article;
