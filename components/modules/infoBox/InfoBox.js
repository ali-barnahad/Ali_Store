import React from "react";
import styles from "./infoBox.module.css";
import { IoStatsChart } from "react-icons/io5";
import useTranslation from "@/hooks/useTranslation";

function Box({ title, value }) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.box}>
      <span>{value}</span>
      <div>
        <p>{t(title)}</p>
        <IoStatsChart className={styles.box_chart_icon} />
      </div>
    </div>
  );
}

export default Box;
