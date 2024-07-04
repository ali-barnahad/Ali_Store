import Link from "next/link";
import styles from "@/styles/orderPanelUserComment.module.css";
import useTranslation from "@/hooks/useTranslation";

const Order = () => {
  const { t } = useTranslation("common");

  return (
    <Link href={`/product/123`} className={styles.card}>
      <div>
        <div>
          <p>{t("arabicaCoffee")}</p>
          <img
            src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
            alt=""
          />
        </div>
        <p>{t("completed")}</p>
      </div>
      <div>
        <p>8:00 1402/10/21</p>
        <p className={styles.price}>200000 {t("currency")}</p>
      </div>
    </Link>
  );
};

export default Order;
