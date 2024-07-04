import DeleteModal from "@/components/templates/index/deleteProduct";
import EditModal from "@/components/templates/index/editProduct";
import { useState } from "react";
import styles from "@/styles/Course.module.css";
import useTranslation from "@/hooks/useTranslation";

const UploadForm = ({ title, text, price, _id }) => {
  const { t } = useTranslation("common");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hideEditModal = () => setShowEditModal(false);
  const hideDeleteModal = () => setShowDeleteModal(false);

  const removeCourse = async () => {
    const res = await fetch(`/api/courses/${_id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setShowDeleteModal(false);
      showSwal(t("successDeleteTitle"), "success", t("okButton"));
    }
  };

  const updateCourse = async (event, title, text, price) => {
    event.preventDefault();

    const res = await fetch(`/api/courses/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text, price }),
    });

    if (res.status === 200) {
      setShowEditModal(false);
      showSwal(t("successUpdateTitle"), "success", t("okButton"));
    }
  };

  return (
    <>
      <li className={styles.courses_item}>
        <div className={styles.courses_img_title}>
          <img
            src="/images/courses/PWA.jpg"
            alt="course-item-img"
            className={styles.courses_img}
          />
          <h5 className={styles.courses_name}>{title}</h5>
        </div>
        <div className={styles.courses_btns}>
          <a
            href="#"
            className={styles.courses_btn_edit}
            onClick={() => setShowEditModal(true)}
          >
            {t("editButton")}
          </a>
          <a
            href="#"
            className={styles.courses_btn_delete}
            onClick={() => setShowDeleteModal(true)}
          >
            {t("deleteButton")}
          </a>
        </div>
      </li>
      {showEditModal && (
        <EditModal updateHandler={updateCourse} hideEditModal={hideEditModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          removeHandler={removeCourse}
          hideDeleteModal={hideDeleteModal}
        />
      )}
    </>
  );
};

export default UploadForm;
