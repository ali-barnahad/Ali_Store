import React from "react";
import Head from "next/head";
import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/panelUser/tickets/Tickets";
import TicketModel from "@/models/Ticket";
import connectToDB from "@/utils/db";
import { parseCookies } from "nookies";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/userModel";

function TicketsPage({ tickets, user }) {
  return (
    <Layout user={user}>
      <Head>
        <title>{`Tickets - ${user.name}'s Dashboard - Ali Store`}</title>
        <meta
          name="description"
          content="View and manage your tickets on Ali Store. Stay updated with the latest information on your requests and queries."
        />
        <meta
          property="og:title"
          content={`Tickets - ${user.name}'s Dashboard - Ali Store`}
        />
        <meta
          property="og:description"
          content="View and manage your tickets on Ali Store. Stay updated with the latest information on your requests and queries."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://sticker-next.liara.run/panelUser/tickets`}
        />
        <meta
          property="og:image"
          content={`https://sticker-next.liara.run/images/tickets-og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://sticker-next.liara.run/panelUser/tickets`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://sticker-next.liara.run/panelUser/tickets",
              "name": "Tickets - ${user.name}'s Dashboard - Ali Store",
              "description": "View and manage your tickets on Ali Store. Stay updated with the latest information on your requests and queries.",
              "author": {
                "@type": "Person",
                "name": "${user.name}"
              }
            }
          `}
        </script>
      </Head>
      <Tickets tickets={tickets} />
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

  const tickets = await TicketModel.find({ userId })
    .populate("department", "title")
    .sort({ _id: -1 });
  return {
    props: {
      tickets: JSON.parse(JSON.stringify(tickets)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default TicketsPage;
