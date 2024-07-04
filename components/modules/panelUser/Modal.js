import React from "react";
import { IoClose } from "react-icons/io5";
import styles from "@/styles/ModalPanelUser.module.css";
import useTranslation from "@/hooks/useTranslation";

function Modal({ hideModal, title, children }) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.modal}>
      <div onClick={hideModal} className={styles.modal_overlay}></div>
      <div className={styles.modal_main}>
        <div className={styles.modal_header}>
          <span>{t(title)}</span>
          <IoClose onClick={hideModal} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
