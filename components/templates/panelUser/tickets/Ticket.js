import Link from "next/link";
import styles from "@/styles/ticketPanelUserTicket.module.css";
import useTranslation from "@/hooks/useTranslation";

const Ticket = ({ _id, title, createdAt, department, hasAnswer }) => {
  const { t } = useTranslation("common");

  return (
    <Link href={`/panelUser/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={hasAnswer ? styles.answer : styles.no_answer}>
          {hasAnswer ? t("answered") : t("notAnswered")}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
