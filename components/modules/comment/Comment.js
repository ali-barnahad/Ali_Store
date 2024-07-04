import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./comment.module.css";
import { VscAccount } from "react-icons/vsc";
import useTranslation from "@/hooks/useTranslation";

const Comment = ({ name, body, score = 0, date }) => {
  const { t } = useTranslation("common");

  const formattedDate = new Date(date).toLocaleDateString();

  let validScore = isNaN(score) ? 0 : score;

  const clampedScore = Math.max(0, Math.min(validScore, 5));

  return (
    <section className={styles.comment}>
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <h1>
              <VscAccount />
            </h1>
            <strong>{name}</strong>
            <p className="mx-2">{formattedDate}</p> {/* Use formattedDate */}
          </div>
          <div className={styles.stars}>
            {new Array(clampedScore).fill(0).map((item, index) => (
              <FaStar key={index} />
            ))}
            {new Array(5 - clampedScore).fill(0).map((item, index) => (
              <FaRegStar key={index} />
            ))}
          </div>
        </div>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Comment;
