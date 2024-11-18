import useTranslation from "@/hooks/useTranslation";
import React from "react";
import styles from "./CategoryIcon.module.css";

function Category() {
  const { t } = useTranslation("common");

  return (
    <div className="flex align-baseline items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="32px"
        height="32px"
        style={{ maxWidth: "min-content", display: "inline-block" }}
      >
        <rect
          x="4"
          y="4"
          width="8"
          height="8"
          rx="2"
          ry="2"
          className={`${styles.rect} ${styles.rect1}`} // Animation class for the first square
        />
        <rect
          x="12"
          y="4"
          width="8"
          height="8"
          rx="2"
          ry="2"
          className={`${styles.rect} ${styles.rect2}`} // Animation class for the second square
        />
        <rect
          x="4"
          y="12"
          width="8"
          height="8"
          rx="2"
          ry="2"
          className={`${styles.rect} ${styles.rect3}`} // Animation class for the third square
        />
        <rect
          x="12"
          y="12"
          width="8"
          height="8"
          rx="2"
          ry="2"
          className={`${styles.rect} ${styles.rect4}`} // Animation class for the fourth square
        />
      </svg>
      <span className={styles.category}>{t("Categories")}</span>
    </div>
  );
}

export default Category;
