import React from "react";
import Head from "next/head";
import wishListItem from "@/models/wishListModel";
import connectToDB from "@/utils/db";
import { parseCookies } from "nookies";
import { verifyAccessToken } from "@/utils/auth";
import WishItem from "@/components/modules/wish/wishItem";
import Layout from "@/components/layouts/UserPanelLayout";
import UserModel from "@/models/userModel";

function WishList({ wishes, user }) {
  return (
    <Layout user={user}>
      <Head>
        <title>User Wishlist - Ali Store</title>
        <meta
          name="description"
          content="View and manage your wishlist on Ali Store. Discover your saved items and add new ones to your collection."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="User Wishlist - Ali Store" />
        <meta
          property="og:description"
          content="View and manage your wishlist on Ali Store. Discover your saved items and add new ones to your collection."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://alistore.liara.run/panelUser/wishList`}
        />
        <meta
          property="og:image"
          content={`https://alistore.liara.run/images/wishlist-og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://alistore.liara.run/panelUser/wishList`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://alistore.liara.run/panelUser/wishList",
              "name": "User Wishlist - Ali Store",
              "description": "View and manage your wishlist on Ali Store. Discover your saved items and add new ones to your collection.",
              "author": {
                "@type": "Person",
                "name": "${user.name}"
              }
            }
          `}
        </script>
      </Head>
      <WishItem item={wishes} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await connectToDB();

  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["refresh-token"];
  let userId;
  let user;
  try {
    const decoded = verifyAccessToken(token);
    userId = decoded.userId;
    user = await UserModel.findById(userId).lean(); // Convert to plain object
  } catch (error) {
    console.error("Token verification error:", error);
    return {
      redirect: {
        destination: "/login-register",
        permanent: false,
      },
    };
  }

  let wishes = [];
  try {
    wishes = await wishListItem.find({ userId }); // Use userId as a string
  } catch (error) {
    console.error("Error fetching products for user:", userId, error.message);
  }

  return {
    props: {
      wishes: JSON.parse(JSON.stringify(wishes)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default WishList;
