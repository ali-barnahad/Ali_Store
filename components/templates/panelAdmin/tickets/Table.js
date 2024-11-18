import React from "react";
import styles from "@/styles/tablePanelAdminTicket.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";

export default function DataTable({ tickets, title }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const showTicketBody = (body) => {
    showSwal(body, undefined, t("close"));
  };

  const answerToTicket = async (ticket) => {
    Swal.fire({
      title: t("enterYourAnswer"),
      input: "textarea",
      confirmButtonText: t("submitAnswer"),
    }).then(async (result) => {
      if (result.value) {
        const answer = {
          ...ticket,
          body: result.value,
          ticketID: ticket._id,
        };

        const res = await fetch("/api/tickets/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        });

        if (res.status === 201) {
          Swal.fire({
            title: t("answerSubmitted"),
            icon: "success",
            confirmButtonText: t("gotIt"),
          });
        }
      }
    });
  };

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
              <th>{t("user")}</th>
              <th>{t("title")}</th>
              <th>{t("department")}</th>
              <th>{t("view")}</th>
              <th>{t("answer")}</th>
              <th>{t("ban")}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    {t("view")}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => answerToTicket(ticket)}
                  >
                    {t("answer")}
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    {t("ban")}
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
