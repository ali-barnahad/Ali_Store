// path pages/panelUser/index.js
import React from "react";
import Head from "next/head";
import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/panelUser/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import Tickets from "@/components/templates/panelUser/index/Tickets";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/commentModel";
import WishlistModel from "@/models/wishListModel";
import { parseCookies } from "nookies";
import { verifyAccessToken, generateAccessToken } from "@/utils/auth";
import connectToDB from "@/utils/db";
import useTranslation from "@/hooks/useTranslation";
import UserModel from "@/models/userModel";

const PanelUser = ({
  userId,
  user,
  tickets,
  allTicketsCount,
  commentsCount,
  wishesCount,
}) => {
  const { t } = useTranslation("common");
  return (
    <Layout user={user}>
      <Head>
        <title>{t("userPanelTitle", { name: user.name })}</title>
        <meta name="description" content={t("userPanelDescription")} />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={t("userPanelTitle", { name: user.name })}
        />
        <meta property="og:description" content={t("userPanelDescription")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://alistore.liara.run/panelUser`}
        />
        <meta
          property="og:image"
          content={`https://alistore.liara.run/images/user-panel-og-image.jpg`}
        />
        <link rel="canonical" href={`https://alistore.liara.run/panelUser`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://alistore.liara.run/panelUser",
              "name": "${t("userPanelTitle", { name: user.name })}",
              "description": "${t("userPanelDescription")}",
              "author": {
                "@type": "Person",
                "name": "${user.name}"
              }
            }
          `}
        </script>
      </Head>
      <main>
        <section className={styles.boxes}>
          <Box title={t("totalTickets")} value={allTicketsCount} />
          <Box title={t("totalComments")} value={commentsCount} />
          <Box title={t("totalWishlist")} value={wishesCount} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={tickets} />
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    await connectToDB();

    const { req } = context;
    const cookies = parseCookies({ req });
    const refreshToken = cookies["refresh-token"];

    if (!refreshToken) {
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
      const decoded = verifyAccessToken(refreshToken);
      userId = decoded.userId; // Ensure userId is from the decoded token
      user = await UserModel.findById(userId).lean(); // Convert to plain object
    } catch (error) {
      console.error("Token verification error:", error.message);
      return {
        redirect: {
          destination: "/login-register",
          permanent: false,
        },
      };
    }

    if (!userId) {
      console.error("userId is undefined after decoding token.");
      return {
        redirect: {
          destination: "/login-register",
          permanent: false,
        },
      };
    }

    const accessToken = generateAccessToken({ userId });

    const tickets = await TicketModel.find({ userId }) // Use userId directly as string
      .limit(3)
      .populate("department", "title")
      .sort({ _id: -1 })
      .lean(); // Convert to plain object
    const allTicketsCount = await TicketModel.countDocuments({ userId }); // Use userId directly as string
    const commentsCount = await CommentModel.countDocuments({ userId }); // Use userId directly as string
    const wishesCount = await WishlistModel.countDocuments({ userId }); // Use userId directly as string

    return {
      props: {
        userId,
        user: JSON.parse(JSON.stringify(user)), // Ensure serializable format
        accessToken,
        tickets: JSON.parse(JSON.stringify(tickets)),
        allTicketsCount,
        commentsCount,
        wishesCount,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return {
      redirect: {
        destination: "/login-register",
        permanent: false,
      },
    };
  }
}

export default PanelUser;
