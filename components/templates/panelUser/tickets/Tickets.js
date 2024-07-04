import React from "react";
import styles from "@/styles/panelUser/tickets.module.css";
import Link from "next/link";
import Ticket from "./Ticket";
import useTranslation from "@/hooks/useTranslation";

function Tickets({ tickets }) {
  const { t } = useTranslation("common");

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>{t("allTickets")}</span>
      </h1>

      <div className={styles.filtering}>
        <div>
          <select>
            <option>{t("all")}</option>
            <option>{t("sent")}</option>
            <option>{t("received")}</option>
          </select>
          <select>
            <option>{t("all")}</option>
            <option>{t("open")}</option>
            <option>{t("closed")}</option>
            <option>{t("answered")}</option>
            <option>{t("ended")}</option>
          </select>
          <select>
            <option>{t("answerDate")}</option>
            <option>{t("creationDate")}</option>
          </select>
        </div>
        <button type="submit">{t("apply")}</button>
      </div>

      <div>
        {tickets.map((ticket) => (
          <Ticket key={ticket._id} {...ticket} />
        ))}
      </div>

      {tickets.length === 0 && (
        <div className={styles.empty}>
          <p>{t("noTickets")}</p>
        </div>
      )}
    </main>
  );
}

export default Tickets;
