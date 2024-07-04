import React from "react";
import Link from "next/link";
import styles from "@/styles/breadcrumb.module.css";
import useTranslation from "@/hooks/useTranslation";

function Breadcrumbs({ route }) {
  const { t } = useTranslation("common");
  const translatedRoute = t(route);

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.containerTitle}>
        <h2 className={styles.title}>{translatedRoute}</h2>
      </div>
      <div>
        <Link className={styles.link} href="/">
          {t("home")}
        </Link>
        <span>/</span>
        <p className={styles.linkRoute}>{translatedRoute}</p>
      </div>
    </div>
  );
}

export default Breadcrumbs;
