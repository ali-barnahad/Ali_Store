import React from "react";
import Head from "next/head";
import CartComponent from "@/components/modules/cart/cart";
import shoppingCartModel from "@/models/shoppingCartModel";
import connectToDB from "@/utils/db";
import { verifyAccessToken } from "@/utils/auth"; // Ensure this is correctly imported
import { parseCookies } from "nookies"; // Ensure nookies is installed
import Layout from "@/components/layouts/UserPanelLayout";
import UserModel from "@/models/userModel";

function Cart({ purchased, user }) {
  return (
    <Layout user={user}>
      <Head>
        <title>{`${user.name}'s Shopping Cart - Ali Store`}</title>
        <meta
          name="description"
          content="View and manage your shopping cart on Ali Store. Review your selected items and proceed to checkout."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={`${user.name}'s Shopping Cart - Ali Store`}
        />
        <meta
          property="og:description"
          content="View and manage your shopping cart on Ali Store. Review your selected items and proceed to checkout."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://alistore.liara.run/panelUser/cart`}
        />
        <meta
          property="og:image"
          content={`https://alistore.liara.run/images/cart-og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://alistore.liara.run/panelUser/cart`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://alistore.liara.run/panelUser/cart",
              "name": "${user.name}'s Shopping Cart - Ali Store",
              "description": "View and manage your shopping cart on Ali Store. Review your selected items and proceed to checkout.",
              "author": {
                "@type": "Person",
                "name": "${user.name}"
              }
            }
          `}
        </script>
      </Head>
      <CartComponent initialItems={purchased} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await connectToDB();

  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["refresh-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login-register",
        permanent: false,
      },
    };
  }
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

  let purchased = [];
  try {
    purchased = await shoppingCartModel.find({ userId }); // Use userId as a string
  } catch (error) {
    console.error("Error fetching products for user:", userId, error.message);
  }

  return {
    props: {
      purchased: JSON.parse(JSON.stringify(purchased)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Cart;
