// components/layouts/UserPanelLayout.js
import React, { useState } from "react";
import styles from "@/styles/userPanelLayout.module.css";
import Sidebar from "@/components/modules/panelUser/Sidebar";
import Topbar from "@/components/modules/panelUser/Topbar";

function Layout({ children, user }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          Panel ☰
        </button>
        <div className={` ${isSidebarVisible ? styles.show : styles.sidebar}`}>
          <Sidebar user={user} />
        </div>
        <div className={styles.contents}>
          <Topbar />
          <div className={styles.content}>{children}</div>
        </div>
      </section>
    </div>
  );
}

export default Layout;
