import useTranslation from "@/hooks/useTranslation";
import { useState } from "react";
import styles from "@/styles/topbarPanelUser.module.css";
import Modal from "./Modal";
import { IoIosNotifications } from "react-icons/io";

function Topbar() {
  const { t } = useTranslation("common");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => setShowModal(false);

  return (
    <>
      <div className={styles.topbar}>
        <section>
          <div
            onClick={() => setShowNotifications(true)}
            className={styles.notification}
          >
            <IoIosNotifications />
            <span>0</span>
          </div>
        </section>
      </div>

      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                {t("notificationMessage")}
              </p>
              <button onClick={() => setShowNotifications(false)}>
                {t("seenButton")}
              </button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                {t("notificationMessage")}
              </p>
              <button onClick={() => setShowNotifications(false)}>
                {t("seenButton")}
              </button>
            </div>
          </section>
        </div>
      )}
      {showModal && (
        <Modal title={t("supportUnitTitle")} hideModal={hideModal}>
          <p className={styles.modal_text}>{t("modalMessage")}</p>
        </Modal>
      )}
    </>
  );
}

export default Topbar;
