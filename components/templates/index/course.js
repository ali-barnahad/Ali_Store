import CoursesItem from "@/components/modules/coursesItem/CoursesItem";
import { useState } from "react";
import AddCourseModal from "./addProduct";
import styles from "@/styles/Course.module.css";
import useTranslation from "@/hooks/useTranslation";

const Course = ({ courses }) => {
  const { t } = useTranslation("common");
  const [data, setData] = useState([...courses]);

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const hideAddCourseModal = () => setShowAddCourseModal(false);

  const getCourses = async () => {
    const res = await fetch(`/api/courses`);
    const coursesData = await res.json();

    console.log("Res =>", res);

    if (res.status === 200) {
      console.log(coursesData);
      setData(coursesData);
    }
  };

  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>{t("courses")}</h2>
          <a
            href="#"
            className={styles.new_course_btn}
            onClick={() => setShowAddCourseModal(true)}
          >
            {t("addNewCourse")}
          </a>
        </div>
        <ul className={styles.courses_list}>
          {data.map((course) => (
            <CoursesItem key={course._id} {...course} />
          ))}
        </ul>
      </section>

      {showAddCourseModal && (
        <AddCourseModal
          getCourses={getCourses}
          hideAddCourseModal={hideAddCourseModal}
        />
      )}
    </>
  );
};

export default Course;
