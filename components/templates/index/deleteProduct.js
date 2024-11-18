import styles from "@/styles/Modal.module.css";
import useTranslation from "@/hooks/useTranslation";

const DeleteModal = ({ hideDeleteModal, removeHandler }) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.modal_container} id="delete-modal">
      <div className={styles.modal_bg} onClick={hideDeleteModal}></div>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_title}>{t("confirmDeleteCourse")}</h1>
        <div className={styles.btn_groups}>
          <button className={styles.accept_btn} onClick={removeHandler}>
            {t("yes")}
          </button>
          <button className={styles.unaccept_btn} onClick={hideDeleteModal}>
            {t("no")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
