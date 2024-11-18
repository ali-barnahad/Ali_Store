import React, { useEffect, useState } from "react";
import styles from "@/styles/panelUser/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import useTranslation from "@/hooks/useTranslation";

function sentTicket() {
  const { t } = useTranslation("common");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState(-1);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments([...data]);
    };

    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      const res = await fetch(`/api/departments/sub/${departmentID}`);

      if (res.status === 200) {
        const data = await res.json();
        setSubDepartments([...data]);
      }
    };

    getSubDepartments();
  }, [departmentID]);

  const sendTicket = async () => {
    // Validation (You)

    const ticket = {
      title,
      body,
      department: departmentID,
      subDepartment: subDepartmentID,
      priority,
    };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      showSwal(t("ticketSuccess"), "success", t("viewTickets")).then(() => {
        location.replace("/panelUser/tickets");
      });
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>{t("sendNewTicket")}</span>
        <Link href="/panelUser/tickets"> {t("allTickets")}</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>{t("selectDepartment")}:</label>
          <select onChange={(event) => setDepartmentID(event.target.value)}>
            <option value={-1}>{t("pleaseSelectDepartment")}</option>

            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label>{t("selectTicketType")}:</label>
          <select onChange={(event) => setSubDepartmentID(event.target.value)}>
            <option value={-1}>{t("pleaseSelectOption")}</option>

            {subDepartments.map((subDepartment) => (
              <option key={subDepartment._id} value={subDepartment._id}>
                {subDepartment.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label>{t("enterTicketTitle")}:</label>
          <input
            placeholder={t("titlePlaceholder")}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>{t("selectPriorityLevel")}:</label>
          <select onChange={(event) => setPriority(event.target.value)}>
            <option value={-1}>{t("pleaseSelectOption")}</option>
            <option value={1}>{t("low")}</option>
            <option value={2}>{t("medium")}</option>
            <option value={3}>{t("high")}</option>
          </select>
        </div>
      </div>
      <div className={styles.group}>
        <label>{t("enterTicketContent")}:</label>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={10}
        ></textarea>
      </div>
      <div className={styles.uploader}>
        <span>
          {t("maxFileSize")}: 6 {t("megabytes")}
        </span>
        <span>{t("allowedFormats")}: jpg, png, jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn} onClick={sendTicket}>
        <IoIosSend />
        {t("sendTicket")}
      </button>
    </main>
  );
}

export default sentTicket;
