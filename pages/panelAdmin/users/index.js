import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/tablePanelAdminUser.module.css";
import Table from "@/components/templates/panelAdmin/users/Table";
import connectToDB from "@/utils/db";
import UserModel from "@/models/userModel";
import useTranslation from "@/hooks/useTranslation";

function AdminUsers({ users }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <main>
        {users.length === 0 ? (
          <p className={styles.empty}>{t("noUsers")}</p>
        ) : (
          <Table users={users} title={t("userList")} />
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  await connectToDB();
  const users = await UserModel.find({}).lean();

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}

export default AdminUsers;
