import styles from "@/styles/answerPanelUserTicket.module.css";
import useTranslation from "@/hooks/useTranslation";
import { BsPersonCircle } from "react-icons/bs";

const Answer = ({ type, title, body, createdAt, user }) => {
  const { t } = useTranslation("common");

  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")} </p>
        <div>
          <div>
            <p>{user.name}</p>
            <span>{type === "user" ? t("user") : t("admin")}</span>
          </div>
          <BsPersonCircle alt={t("profileImageAlt")} />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Answer;
