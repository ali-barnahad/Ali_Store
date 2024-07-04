import Link from "next/link";
import Order from "./Order";
import styles from "@/styles/ordersPanelUserComment.module.css";
import { FaArrowLeft } from "react-icons/fa6";
import useTranslation from "@/hooks/useTranslation";

function Orders() {
  const { t } = useTranslation("common");

  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>{t("recentOrders")}</p>
        <Link href="/panelUser/orders">
          {t("allOrders")} <FaArrowLeft />
        </Link>
      </div>
      {/* <Order />
      <Order />
      <Order /> */}

      <p className={styles.empty}>{t("noOrdersPlaced")}</p>
    </div>
  );
}

export default Orders;
