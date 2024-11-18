import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./comment.module.css";
import { VscAccount } from "react-icons/vsc";

const Comment = ({ name, body, score = 0, date }) => {
  const formattedDate = new Date(date).toLocaleDateString();

  let validScore = isNaN(score) ? 0 : score;

  const clampedScore = Math.max(0, Math.min(validScore, 5));

  return (
    <section className={styles.comment}>
      <div className="w-full mr-5">
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <h1>
              <VscAccount />
            </h1>
            <strong className="text-3xl text-cyan-900">{name}</strong>
            <p className="mx-2 my-0 text-xl">{formattedDate}</p>
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
