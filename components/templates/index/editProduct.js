import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Modal.module.css";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const EditModal = ({ hideEditProduct, updateHandler }) => {
  const { t } = useTranslation("common");
  const [title, setTitle] = useState("");

  return (
    <div className={styles.modal_container} id="edit-modal">
      <div className={styles.modal_bg} onClick={hideEditProduct}></div>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_title}>{t("enterNewInformation")}</h1>
        <form className={styles.edit_user_form}>
          <div className={styles.input_field}>
            <span>
              <FontAwesomeIcon icon={faTag} />
            </span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t("courseTitle")}
              spellCheck="false"
            />
          </div>
          <button
            type="submit"
            className={styles.update_btn}
            onClick={(event) => updateHandler(event, title)}
          >
            {t("updateCourse")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
