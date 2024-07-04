import styles from "@/styles/topbarComponent.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import useTranslation from "@/hooks/useTranslation";
import { BsPersonCircle } from "react-icons/bs";

const Topbar = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.topbar}>
      <section>
        <div className={styles.searchBox}>
          <input type="text" placeholder={t("searchPlaceholder")} />
          <div>
            <IoIosSearch />
          </div>
        </div>
        <div className={styles.notification}>
          <IoIosNotifications />
          <span>2</span>
        </div>
      </section>
    </div>
  );
};

export default Topbar;
