import React from "react";
import styles from "@/styles/tablePanelAdminUser.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";

export default function DataTable({ users, title }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const changeRole = async (userID) => {
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      Swal.fire({
        title: t("roleChangedSuccessfully"),
        icon: "success",
        confirmButtonText: t("gotIt"),
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {
    Swal.fire({
      title: t("confirmUserDeletion"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes"),
      cancelButtonText: t("no"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userID }),
        });

        if (res.status === 200) {
          Swal.fire({
            title: t("userDeletedSuccessfully"),
            icon: "success",
            confirmButtonText: t("gotIt"),
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const banUser = async (email, phone) => {
    Swal.fire({
      title: t("confirmUserBan"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes"),
      cancelButtonText: t("no"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        });

        if (res.status === 200) {
          Swal.fire({
            title: t("userBannedSuccessfully"),
            icon: "success",
            confirmButtonText: t("gotIt"),
          }).then(() => {
            router.refresh();
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
              <th>{t("fullName")}</th>
              <th>{t("email")}</th>
              <th>{t("role")}</th>
              <th>{t("edit")}</th>
              <th>{t("changeRole")}</th>
              <th>{t("delete")}</th>
              <th>{t("ban")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : t("emailNotFound")}</td>
                <td>{user.role === "USER" ? t("regularUser") : t("admin")}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    {t("edit")}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRole(user._id)}
                  >
                    {t("changeRole")}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeUser(user._id)}
                  >
                    {t("delete")}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => banUser(user.email, user.phone)}
                    className={styles.delete_btn}
                  >
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
