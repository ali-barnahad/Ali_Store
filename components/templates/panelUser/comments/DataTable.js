import React from "react";
import styles from "@/styles/panelUser/dataTable.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { showSwal } from "@/utils/helpers";
import useTranslation from "@/hooks/useTranslation";

export default function DataTable({ comments, title }) {
  const { t } = useTranslation("common");

  const showCommentBody = (commentBody) => {
    showSwal(commentBody, undefined, t("ok"));
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("date")}</th>
              <th>{t("score")}</th>
              <th>{t("status")}</th>
              <th>{t("view")}</th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.no_comments}>
                  {t("noCommentsAvailable")}
                </td>
              </tr>
            ) : (
              comments.map((comment, index) => (
                <tr key={index}>
                  <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                  <td>
                    {new Array(comment.score).fill(0).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {new Array(5 - comment.score).fill(0).map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                  </td>
                  <td>
                    <button type="button" className={styles.no_check}>
                      {comment.isAccept ? t("approved") : t("pendingApproval")}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => showCommentBody(comment.body)}
                      className={styles.btn}
                    >
                      {t("view")}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
