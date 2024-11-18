import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";

export default function DataTable({ comments, title }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const showCommentBody = (body) => {
    showSwal(body, undefined, t("read"));
  };

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comments/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      Swal.fire({
        title: t("commentAccepted"),
        icon: "success",
        buttons: t("gotIt"),
      }).then(() => {
        router.refresh();
      });
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comments/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      Swal.fire({
        title: t("commentRejected"),
        icon: "success",
        buttons: t("gotIt"),
      }).then(() => {
        router.refresh();
      });
    }
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
              <th>{t("email")}</th>
              <th>{t("score")}</th>
              <th>{t("product")}</th>
              <th>{t("date")}</th>
              <th>{t("view")}</th>
              <th>{t("edit")}</th>
              <th>{t("delete")}</th>
              <th>{t("acceptReject")}</th>
              <th>{t("reply")}</th>
              <th>{t("ban")}</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td
                  className={comment.isAccept ? styles.accept : styles.reject}
                >
                  {index + 1}
                </td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.productID.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    {t("view")}
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
                <td>
                  {comment.isAccept ? (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => rejectComment(comment._id)}
                    >
                      {t("reject")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => acceptComment(comment._id)}
                    >
                      {t("accept")}
                    </button>
                  )}
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    {t("reply")}
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
