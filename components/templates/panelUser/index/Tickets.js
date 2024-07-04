import Ticket from "./Ticket";
import styles from "@/styles/ticketsPanelUserComment.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import useTranslation from "@/hooks/useTranslation";

function Tickets({ tickets }) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>{t("recentTickets")}</p>
        <Link href="/panelUser/tickets">
          {t("allTickets")} <FaArrowLeft />
        </Link>
      </div>

      {tickets.length > 0 ? (
        tickets.map((ticket) => <Ticket key={ticket._id} {...ticket} />)
      ) : (
        <p className={styles.empty}>{t("noTicketsSubmitted")}</p>
      )}
    </div>
  );
}

export default Tickets;
