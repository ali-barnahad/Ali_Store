import { useState } from "react";
import styles from "./register.module.css";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/router";
import useTranslation from "@/hooks/useTranslation";
import { useAuth } from "@/context/AuthContext";

const Register = ({ showloginForm }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const signUp = async () => {
    if (!name.trim()) {
      return showSwal(t("enter_name"), "error", t("retry"));
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return showSwal(t("invalid_phone"), "error", t("retry"));
    }

    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        return showSwal(t("invalid_email"), "error", t("retry"));
      }
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return showSwal(
        passwordValidation.errors.join("\n"),
        "error",
        t("retry")
      );
    }

    const user = { name, phone, email, password };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.status === 201) {
      showSwal(t("signup_success"), "success", t("go_to_home"));
      login(data.token);

      window.location.replace("/");
    } else if (res.status === 422) {
      showSwal(t("user_exists"), "error", t("retry"));
    }
  };

  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder={t("name")}
        />
        <input
          className={styles.input}
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder={t("phone")}
        />
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("email")}
        />

        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={t("password")}
        />

        <button
          style={{ marginTop: ".7rem" }}
          onClick={() => {
            if (isRegisterWithPass) {
              signUp();
            } else {
              setIsRegisterWithPass(true);
            }
          }}
          className={styles.btn}
        >
          {t("register")}
        </button>
        <p onClick={showloginForm} className={styles.back_to_login}>
          {t("back_to_login")}
        </p>
      </div>
      <p className={styles.redirect_to_home}>{t("cancel")}</p>
    </>
  );
};

export default Register;
