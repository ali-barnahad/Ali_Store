import React from "react";
import Head from "next/head";
import productsModel from "@/models/watchModel";
import connectToDB from "@/utils/db";

import dynamic from "next/dynamic";
const Breadcrumbs = dynamic(
  () => import("@/components/modules/breadcrumbs/Breadcrumbs"),
  { ssr: false }
);
const ProductTemple = dynamic(
  () => import("@/components/templates/productTemple/ProductTemple"),
  { ssr: false }
);

function Watches({ products }) {
  return (
    <>
      <Head>
        <title>Watches - Ali Store</title>
        <meta
          name="description"
          content="Browse our extensive collection of watches. Find the latest models and best deals on Ali Store."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Watches - Ali Store" />
        <meta
          property="og:description"
          content="Browse our extensive collection of watches. Find the latest models and best deals on Ali Store."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://sticker-next.liara.run/watches"
        />
        <meta
          property="og:image"
          content="https://sticker-next.liara.run/images/watches-og-image.jpg"
        />
        <link rel="canonical" href="https://sticker-next.liara.run/watches" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "url": "https://sticker-next.liara.run/watches",
              "name": "Watches - Ali Store",
              "description": "Browse our extensive collection of watches. Find the latest models and best deals on Ali Store.",
              "itemListElement": ${JSON.stringify(
                products.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: "https://sticker-next.liara.run/watches/" + product._id,
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
      <Breadcrumbs route="watches" />
      <ProductTemple productDetail={products} />
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

export default Watches;
