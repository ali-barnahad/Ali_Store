import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useAuth } from "@/context/AuthContext";
import useTranslation from "@/hooks/useTranslation";
import useToken from "@/hooks/useToken";

const CommentForm = ({ productID, productType }) => {
  const { t } = useTranslation("common");
  const { isLoggedIn, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(4);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);
  const [token, setToken] = useToken();
  useEffect(() => {
    if (isLoggedIn && user) {
      setName(user.name || "");
      setEmail(user.email || "");
    } else {
      const userInfoJSON = localStorage.getItem("userInfo");
      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);
        setName(userInfo.name || "");
        setEmail(userInfo.email || "");
      }
    }
  }, [isLoggedIn, user]);

  const setCommentScore = (score) => {
    setScore(score);
    showSwal(t("ratingRecorded"), "success", t("continueToSubmitComment"));
  };

  const submitComment = async () => {
    if (!token) {
      showSwal(t("mustBeLoggedInToComment"), "error", "OK");
      return;
    }

    const commentData = {
      body: body,
      score: score,
      email: email,
      productID: productID,
      productType: productType,
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        showSwal(t("commentAddedSuccessfully"), "success", t("gotIt"));
      } else {
        const error = await res.json();
        showSwal(`${t("error")}: ${error.message}`, "error", t("gotIt"));
      }
    } catch (error) {
      showSwal(`${t("error")}: ${error.toString()}`, "error", t("gotIt"));
    }
  };

  return (
    <div className={styles.form}>
      <h3 className={styles.title}>{t("writeReview")}</h3>
      <p className="text-2xl">{t("emailWillNotBePublished")}</p>
      <span className={styles.rate}>
        <p className="text-cyan-800">{t("yourRating")}:</p>
        {[5, 4, 3, 2, 1].map((star) => (
          <IoMdStar key={star} onClick={() => setCommentScore(star)} />
        ))}
      </span>
      <div className={styles.group}>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required
          className={styles.textarea}
        ></textarea>
      </div>
      <div className={styles.group}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          id="name"
          required
          className={styles.input}
          placeholder={t("namePlaceholder")}
        />
      </div>
      <div className={styles.group}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="email"
          required
          className={styles.input}
          placeholder={t("emailPlaceholder")}
        />
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={isSaveUserInfo}
          onChange={() => setIsSaveUserInfo(!isSaveUserInfo)}
          id="save-info"
          className={styles.checkboxInput}
        />
        <label htmlFor="save-info" className={styles.checkboxLabel}>
          {t("saveInfoForNextTime")}
        </label>
      </div>
      <button onClick={submitComment} className={styles.button}>
        {t("submitButton")}
      </button>
    </div>
  );
};

export default CommentForm;
