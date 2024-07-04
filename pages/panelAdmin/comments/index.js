import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/panelAdmin/comments/table.module.css";
import Table from "@/components/templates/panelAdmin/comments/Table";
import connectToDB from "@/utils/db";
import CommentModel from "@/models/commentModel";
import useTranslation from "@/hooks/useTranslation";

function Comment({ comments }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>{t("noComments")}</p>
        ) : (
          <Table comments={comments} title="commentList" />
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  console.log("Fetching comments for admin panel");
  await connectToDB();
  const comments = await CommentModel.find({})
    .sort({ _id: -1 })
    // .populate("user") // Uncomment if user context is needed
    .populate("productID")
    .lean();

  return {
    props: { comments: JSON.parse(JSON.stringify(comments)) }, // Return fetched comments as props
  };
}

export default Comment;
