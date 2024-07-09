import React from "react";
import Head from "next/head";
import connectToDB from "@/utils/db";
import mobileModel from "@/models/mobileModel";
import dynamic from "next/dynamic";
import CommentModel from "@/models/commentModel";

const ProductDetails = dynamic(
  () => import("@/components/templates/productDetailsTemple/ProductDetails"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const Product = React.memo(({ product, comments, mostVisitedProducts }) => (
  <>
    <Head>
      <title>{`${product.title}  - Ali Store`}</title>
      <meta
        name="description"
        content={`Buy${product.title} at Ali Store. Features: ${product.features}.`}
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={`${product.title}  - Ali Store`} />
      <meta
        property="og:description"
        content={`Buy${product.title} at Ali Store. Features: ${product.features}.`}
      />
      <meta property="og:type" content="product" />
      <meta
        property="og:url"
        content={`https://sticker-next.liara.run/mobiles/${product._id}`}
      />
      <meta property="og:image" content={product.imageURL} />
      <link
        rel="canonical"
        href={`https://sticker-next.liara.run/mobiles/${product._id}`}
      />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "${product.title} ",
            "image": "${product.imageURL}",
            "description": "${product.description}",
            "sku": "${product.sku}",
            "mpn": "${product.mpn}",
            "brand": {
              "@type": "Brand",
              "name": "${product.brand}"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://sticker-next.liara.run/mobiles/${product._id}",
              "priceCurrency": "${product.currency}",
              "price": "${product.price}",
              "priceValidUntil": "2024-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Ali Store"
              }
            }
          }
        `}
      </script>
    </Head>
    <ProductDetails
      product={product}
      comments={comments}
      mostVisitedProducts={mostVisitedProducts}
    />
  </>
));

export async function getStaticPaths() {
  await connectToDB();

  try {
    const products = await mobileModel.find({});
    const paths = products.map((product) => ({
      params: { id: String(product._id) },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  await connectToDB();
  try {
    const product = await mobileModel.findById(params.id).lean();
    if (!product) {
      return { notFound: true };
    }

    const comments =
      (await CommentModel.find({ productID: params.id }).lean()) || [];
    const mostVisitedProducts = await mobileModel
      .find({})
      .sort({ view: -1 })
      .limit(10)
      .lean();

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        comments: JSON.parse(JSON.stringify(comments)),
        mostVisitedProducts: JSON.parse(JSON.stringify(mostVisitedProducts)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return { notFound: true };
  }
}

export default Product;
