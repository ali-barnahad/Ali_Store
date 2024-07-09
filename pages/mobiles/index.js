import React, { useState } from "react";
import Head from "next/head";
import productsModel from "@/models/mobileModel";
import connectToDB from "@/utils/db";
import dynamic from "next/dynamic";
import useTranslation from "@/hooks/useTranslation";
import styles from "@/styles/Sort.module.css";
const Breadcrumbs = dynamic(
  () => import("@/components/modules/breadcrumbs/Breadcrumbs"),
  { ssr: false }
);
const ProductTemple = dynamic(
  () => import("@/components/templates/productTemple/ProductTemple"),
  { ssr: false }
);

function Mobiles({ products }) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortCriteria, setSortCriteria] = useState("");
  const { t } = useTranslation();

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortCriteria(value);

    let sorted = [...products];
    if (value === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === "name-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "name-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (value === "visits-asc") {
      sorted.sort((a, b) => a.view - b.view);
    } else if (value === "visits-desc") {
      sorted.sort((a, b) => b.view - a.view);
    } else if (value === "offer-asc") {
      sorted.sort((a, b) => a.offer - b.offer);
    } else if (value === "offer-desc") {
      sorted.sort((a, b) => b.offer - a.offer);
    }

    setSortedProducts(sorted);
  };

  return (
    <>
      <Head>
        <title>{t("mobilesPageTitle")}</title>
        <meta name="description" content={t("mobilesPageDescription")} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("mobilesPageTitle")} />
        <meta property="og:description" content={t("mobilesPageDescription")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://sticker-next.liara.run/mobiles"
        />
        <meta
          property="og:image"
          content="https://sticker-next.liara.run/images/mobiles-og-image.jpg"
        />
        <link rel="canonical" href="https://sticker-next.liara.run/mobiles" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "url": "https://sticker-next.liara.run/mobiles",
              "name": "${t("mobilesPageTitle")}",
              "description": "${t("mobilesPageDescription")}",
              "itemListElement": ${JSON.stringify(
                products.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: "https://sticker-next.liara.run/mobiles/" + product._id,
                  name: product.name,
                  image: product.imageURL,
                  description: product.description,
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "USD",
                    price: product.price,
                    availability: "http://schema.org/InStock",
                  },
                }))
              )}
            }
          `}
        </script>
      </Head>
      <Breadcrumbs route="mobiles" />
      <div className={styles.sort}>
        <label className={styles.sortLabel} htmlFor="sort">
          {t("sortBy")}:
        </label>
        <select
          id="sort"
          value={sortCriteria}
          className={styles.sortSelect}
          onChange={handleSortChange}
        >
          <option value="">{t("select")}</option>
          <option value="price-asc">{t("priceLowToHigh")}</option>
          <option value="price-desc">{t("priceHighToLow")}</option>
          <option value="name-asc">{t("nameAToZ")}</option>
          <option value="name-desc">{t("nameZToA")}</option>
          <option value="visits-asc">{t("visitsLowToHigh")}</option>
          <option value="visits-desc">{t("visitsHighToLow")}</option>
          <option value="offer-asc">{t("offerLowToHigh")}</option>
          <option value="offer-desc">{t("offerHighToLow")}</option>
        </select>
      </div>
      <ProductTemple productDetail={sortedProducts} />
    </>
  );
}

export async function getStaticProps() {
  await connectToDB();

  let products = [];
  try {
    products = await productsModel.find({});
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 10, // seconds
  };
}

export default Mobiles;
