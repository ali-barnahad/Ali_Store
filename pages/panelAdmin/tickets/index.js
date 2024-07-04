import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/tablePanelAdminTicket.module.css";
import Table from "@/components/templates/panelAdmin/tickets/Table";
import connectToDB from "@/utils/db";
import TicketModel from "@/models/Ticket";
import useTranslation from "@/hooks/useTranslation";

function AdminTickets({ tickets }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>{t("noTickets")}</p>
        ) : (
          <Table tickets={tickets} title="ticketList" />
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const tickets = await TicketModel.find({ isAnswer: false })
    .sort({ _id: -1 })
    .populate("user")
    .populate("department")
    .lean();

  return {
    props: { tickets: JSON.parse(JSON.stringify(tickets)) }, // Serialize the MongoDB data into JSON
  };
}

export default AdminTickets;
