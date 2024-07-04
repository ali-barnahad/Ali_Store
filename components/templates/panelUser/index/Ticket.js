import Link from "next/link";
import styles from "@/styles/ticketPanelUserComment.module.css";
import useTranslation from "@/hooks/useTranslation";

const Ticket = ({ _id, title, department, hasAnswer, createdAt }) => {
  const { t } = useTranslation("common");

  return (
    <Link href={`/panelUser/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={styles.no_answer}>
          {hasAnswer ? t("answered") : t("notAnswered")}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
