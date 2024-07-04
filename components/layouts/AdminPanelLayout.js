import React, { useState } from "react";
import styles from "@/styles/adminPanelLayout.module.css";
import Sidebar from "../modules/panelAdmin/Sidebar";
import Topbar from "../modules/panelAdmin/Topbor";

function Layout({ children }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          ☰
        </button>
        <div className={` ${isSidebarVisible ? styles.show : styles.sidebar}`}>
          <Sidebar />
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
