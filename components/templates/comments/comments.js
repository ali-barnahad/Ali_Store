import React from "react";
import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "../commentForm/commentForm";
import useTranslation from "@/hooks/useTranslation";

const Comments = ({ productID, comments = [], productType, name, email }) => {
  const { t } = useTranslation("common");

  return (
    <div className="my-10">
      <h3 className="my-5 px-10 self-end text-start underline underline-offset-4 decoration-rose-600">
        {t("comments")} ({comments.length})
      </h3>
      <main className={styles.comments}>
        <div className={styles.form_bg}>
          <CommentForm
            productID={productID}
            productType={productType}
            name={name}
            email={email}
          />
        </div>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {comments.length} {t("commentsForProduct")}
          </p>
          <div>
            {comments.map((comment) => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comments;
