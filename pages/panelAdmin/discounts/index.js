import React from "react";
import Table from "@/components/templates/panelAdmin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/tablePanelAdminDiscount.module.css";
import connectToDB from "@/utils/db";
import DiscountModel from "@/models/Discount";
import AddDiscount from "@/components/templates/panelAdmin/discounts/AddDiscount";
import useTranslation from "@/hooks/useTranslation";

function Discounts({ discounts }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <main>
        <AddDiscount />
        {discounts.length === 0 ? (
          <p className={styles.empty}>{t("noDiscounts")}</p>
        ) : (
          <Table discounts={discounts} title="discountList" />
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const discounts = await DiscountModel.find({}).sort({ _id: -1 }).lean();

  return {
    props: { discounts: JSON.parse(JSON.stringify(discounts)) },
  };
}

export default Discounts;
