import React from "react";
import Head from "next/head";
import connectToDB from "@/utils/db";
import stickerModel from "@/models/stickerModel";
import CommentModel from "@/models/commentModel";
import dynamic from "next/dynamic";
import BreadcrumbsComponent from "@/components/modules/breadcrumbs/Breadcrumbs";
import defaultImg from "../../public/uploads/default.jpg";

const ProductDetails = dynamic(
  () => import("@/components/templates/productDetailsTemple/ProductDetails2"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const Product = React.memo(({ product, comments, mostVisitedProducts }) => (
  <>
    <Head>
      <title>{`${product.title}  - Buy Online at Ali Store`}</title>
      <meta
        name="description"
        content={`Purchase ${product.title} at Ali Store. ${product.description}`}
      />
      <meta name="robots" content="index, follow" />
      <meta
        property="og:title"
        content={`${product.title}  - Buy Online at Ali Store`}
      />
      <meta
        property="og:description"
        content={`Purchase ${product.title} at Ali Store. ${product.description}`}
      />
      <meta property="og:type" content="product" />
      <meta
        property="og:url"
        content={`https://alistore.liara.run/stickers/${product._id}`}
      />
      <meta property="og:image" content={product.imageURL || defaultImg} />
      <link
        rel="canonical"
        href={`https://alistore.liara.run/stickers/${product._id}`}
      />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "${product.title} ",
            "description": "${product.description}",
            "image": "${product.imageURL || defaultImg}",
            "url": "https://alistore.liara.run/stickers/${product._id}",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "${product.price}",
              "availability": "http://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${product.rating}",
              "reviewCount": "${product.reviewCount}"
            },
            "review": ${JSON.stringify(
              comments.map((comment) => ({
                "@type": "Review",
                author: { "@type": "Person", name: comment.authorName },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: comment.rating,
                },
                reviewBody: comment.body,
              }))
            )}
          }
        `}
      </script>
    </Head>
    <BreadcrumbsComponent route={`/stickers/${product.title}`} />

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
    const products = await stickerModel.find({}).select("_id"); // Fetch only the IDs
    const paths = products.map((product) => ({
      params: { id: String(product._id) },
    }));

    return {
      paths,
      fallback: "blocking", // Use 'blocking' to serve new pages
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return {
      paths: [],
      fallback: "blocking", // Use 'blocking' to serve new pages
    };
  }
}

export async function getStaticProps({ params }) {
  await connectToDB();
  try {
    const product = await stickerModel.findById(params.id).lean();
    if (!product) {
      return { notFound: true };
    }

    const comments =
      (await CommentModel.find({ productID: params.id }).lean()) || [];
    const mostVisitedProducts = await stickerModel
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
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return { notFound: true };
  }
}

export default Product;
