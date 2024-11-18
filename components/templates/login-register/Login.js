import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { useAuth } from "@/context/AuthContext";

const Login = ({ showRegisterForm }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const { login } = useAuth();

  const loginWithPassword = async () => {
    if (!phoneOrEmail) {
      return showSwal(t("enter_phone_email"), "error", t("ok"));
    }

    const isValidEmail = validateEmail(phoneOrEmail);
    const isValidPhone = validatePhone(phoneOrEmail);
    if (!isValidEmail && !isValidPhone) {
      return showSwal(t("invalid_email_phone"), "error", t("retry"));
    }

    if (!password) {
      return showSwal(t("enter_password"), "error", t("retry"));
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal(t("weak_password"), "error", t("retry"));
    }

    const user = { phoneOrEmail, password };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.status === 200) {
        showSwal(t("login_success"), "success", t("go_to_panel"));
        login(data.token);
        window.location.replace("/");
      } else if (res.status === 422 || res.status === 401) {
        showSwal(t("user_not_found"), "error", t("retry"));
      } else if (res.status === 419) {
        showSwal(t("incorrect_email_password"), "error", t("retry"));
      } else {
        showSwal(t("error_occurred"), "error", t("retry"));
      }
    } catch (error) {
      console.error("Login error:", error);
      showSwal(t("error_occurred"), "error", t("retry"));
    }
  };

  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={phoneOrEmail}
          onChange={(event) => setPhoneOrEmail(event.target.value)}
          placeholder={t("email_phone")}
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={t("password")}
        />
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>{t("remember_me")}</p>
        </div>
        <button className={styles.btn} onClick={loginWithPassword}>
          {t("login")}
        </button>

        <span>{t("no_account")}</span>
        <button onClick={showRegisterForm} className={styles.btn_light}>
          {t("register")}
        </button>
      </div>
      <Link href={"/"} className={styles.redirect_to_home}>
        {t("cancel")}
      </Link>
    </>
  );
};

export default Login;
