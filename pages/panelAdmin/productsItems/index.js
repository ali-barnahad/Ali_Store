import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/tablePanelAdminProduct.module.css";
import Table from "@/components/templates/panelAdmin/products/Table";
import connectToDB from "@/utils/db";
import ProductModel from "@/models/stickerModel";
import AddProduct from "@/components/templates/panelAdmin/products/AddProduct";
import useTranslation from "@/hooks/useTranslation";

function AdminProduct({ products }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <main>
        <AddProduct />
        {products.length === 0 ? (
          <p className={styles.empty}>{t("noProducts")}</p>
        ) : (
          <Table products={products} title="productList" />
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const products = await ProductModel.find({}).sort({ _id: -1 }).lean();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default AdminProduct;
