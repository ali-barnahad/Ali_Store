import React from "react";
import styles from "@/styles/tablePanelAdminDiscount.module.css";
import useTranslation from "@/hooks/useTranslation";

function Table({ discounts }) {
  const { t } = useTranslation("common");

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{t("id")}</th>
          <th>{t("code")}</th>
          <th>{t("percent")}</th>
          <th>{t("maxUse")}</th>
          <th>{t("uses")}</th>
          <th>{t("delete")}</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={discount._id}>
            <td
              className={
                discount.uses === discount.maxUse ? styles.red : styles.green
              }
            >
              {index + 1}
            </td>
            <td>{discount.code}</td>
            <td>{discount.percent}</td>
            <td>{discount.maxUse}</td>
            <td>{discount.uses}</td>
            <td>
              <button type="button" className={styles.delete_btn}>
                {t("delete")}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
