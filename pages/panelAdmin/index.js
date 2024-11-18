import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/panelAdmin/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import SaleChart from "@/components/templates/panelAdmin/index/SaleChart";
import GrowthChart from "@/components/templates/panelAdmin/index/GrowthChart";
import TicketModel from "@/models/Ticket";
import UserModel from "@/models/userModel";
import ProductModel from "@/models/stickerModel";
import connectToDB from "@/utils/db";
import useTranslation from "@/hooks/useTranslation";

function AdminHomePage({ tickets, users, products }) {
  const { t } = useTranslation("common");

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title={t("totalTickets")} value={tickets.length} />
          <Box title={t("totalProducts")} value={products.length} />
          <Box title={t("totalOrders")} value="333" />
          <Box title={t("totalUsers")} value={users.length} />
        </section>
        <div className={styles.dashboard_charts}>
          <section>
            <p>{t("salesStatistics")}</p>
            <SaleChart />
          </section>
          <section>
            <p>{t("growthRate")}</p>
            <GrowthChart />
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const tickets = await TicketModel.find({}).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();

  return {
    props: {
      tickets: JSON.parse(JSON.stringify(tickets)),
      users: JSON.parse(JSON.stringify(users)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default AdminHomePage;
