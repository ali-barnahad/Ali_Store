import React from "react";
import styles from "@/styles/tablePanelAdminProduct.module.css";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

export default function DataTable({ products, title }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("name")}</th>
              <th>{t("price")}</th>
              <th>{t("score")}</th>
              <th>{t("viewDetails")}</th>
              <th>{t("edit")}</th>
              <th>{t("delete")}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.score}</td>

                <td>
                  <button type="button" className={styles.edit_btn}>
                    {t("viewDetails")}
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    {t("edit")}
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
