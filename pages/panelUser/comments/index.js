import React from "react";
import Head from "next/head";
import Layout from "@/components/layouts/UserPanelLayout";
import DataTable from "@/components/templates/panelUser/comments/DataTable";
import connectToDB from "@/utils/db";
import CommentModel from "@/models/commentModel";
import useTranslation from "@/hooks/useTranslation";
import { parseCookies } from "nookies";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/userModel";

function CommentsPage({ comments, user }) {
  const { t } = useTranslation("common");

  return (
    <Layout user={user}>
      <Head>
        <title>{`${user.name}'s Comments - Ali Store`}</title>
        <meta
          name="description"
          content="View and manage your comments on Ali Store. Stay updated with your contributions and feedback."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={`${user.name}'s Comments - Ali Store`}
        />
        <meta
          property="og:description"
          content="View and manage your comments on Ali Store. Stay updated with your contributions and feedback."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://sticker-next.liara.run/panelUser/comments`}
        />
        <meta
          property="og:image"
          content={`https://sticker-next.liara.run/images/comments-og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://sticker-next.liara.run/panelUser/comments`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://sticker-next.liara.run/panelUser/comments",
              "name": "${user.name}'s Comments - Ali Store",
              "description": "View and manage your comments on Ali Store. Stay updated with your contributions and feedback.",
              "author": {
                "@type": "Person",
                "name": "${user.name}"
              }
            }
          `}
        </script>
      </Head>
      <main>
        <DataTable comments={comments} title={t("commentList")} />
      </main>
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

  if (!user) {
    return { redirect: { destination: "/login-register", permanent: false } };
  }

  try {
    const comments = await CommentModel.find({ user: userId }); // Use userId directly as string
    return {
      props: {
        comments: JSON.parse(JSON.stringify(comments)),
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    console.error("Error fetching user-specific comments:", error);
    return { notFound: true };
  }
}

export default CommentsPage;
