import React from "react";
import Head from "next/head";
import ProfileTemple from "@/components/templates/profileTemple/ProfileTemple";
import { parseCookies } from "nookies";
import { verifyAccessToken } from "@/utils/auth";
import Layout from "@/components/layouts/UserPanelLayout";
import UserModel from "@/models/userModel";
import connectToDB from "@/utils/db";

function Profile({ userInfo, user }) {
  return (
    <Layout user={user}>
      <Head>
        <title>{`${user.name}'s Profile - Ali Store`}</title>
        <meta
          name="description"
          content="View and manage your profile on Ali Store. Update your personal information and preferences."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={`${user.name}'s Profile - Ali Store`}
        />
        <meta
          property="og:description"
          content="View and manage your profile on Ali Store. Update your personal information and preferences."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://alistore.liara.run/panelUser/profile`}
        />
        <meta
          property="og:image"
          content={`https://alistore.liara.run/images/profile-og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://alistore.liara.run/panelUser/profile`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://alistore.liara.run/panelUser/profile",
              "name": "${user.name}'s Profile - Ali Store",
              "description": "View and manage your profile on Ali Store. Update your personal information and preferences.",
              "author": {
                "@type": "Person",
                "name": "${user.name}"
              }
            }
          `}
        </script>
      </Head>
      <ProfileTemple
        userProps={Array.isArray(userInfo) ? userInfo : [userInfo]}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await connectToDB();
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["refresh-token"]; // Ensure this is the correct token name

  if (!token) {
    return { redirect: { destination: "/login-register", permanent: false } };
  }
  let user;
  let userId;
  try {
    const decoded = verifyAccessToken(token);
    userId = decoded.userId;
    user = await UserModel.findById(userId).lean();
  } catch (error) {
    console.error("Token verification error:", error);
    return { redirect: { destination: "/login-register", permanent: false } };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}/api/user/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status Code: ${response.status} ${response.statusText}`
      );
    }

    const userInfo = await response.json();
    return {
      props: {
        userInfo: Array.isArray(userInfo) ? userInfo : [userInfo],
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    context.res.statusCode = 302;
    context.res.setHeader(
      "Location",
      `/error?message=${encodeURIComponent(error.message)}`
    );
    return { props: {} };
  }
}

export default Profile;
