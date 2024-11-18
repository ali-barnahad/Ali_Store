import React from "react";
import styles from "@/styles/LoadingSpinner.module.css";
import useTranslation from "@/hooks/useTranslation";

function LoadingSpinner() {
  const { t } = useTranslation("common");

  return (
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1}></div>
      <div className={styles.doubleBounce2}></div>
      <p>{t("loading")}</p>
    </div>
  );
}

export default LoadingSpinner;
