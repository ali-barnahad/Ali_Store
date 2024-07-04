import React from "react";
import styles from "@/styles/404.module.css";
import Link from "next/link";
import useTranslation from "@/hooks/useTranslation";

function NotFound() {
  const { t } = useTranslation("common");

  return (
    <div>
      <div className={styles.contents}>
        <p className={styles.left_number}>4</p>
        <div className={styles.mug}></div>
        <p className={styles.right_number}>4</p>
      </div>
      <div className={styles.texts}>
        <p>{t("pageNotFound")}</p>
        <Link href="/">{t("backToHome")}</Link>
      </div>
    </div>
  );
}

export default NotFound;
