import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import styles from "@/styles/Profile.module.css";
import useTranslation from "@/hooks/useTranslation";
import useToken from "@/hooks/useToken";
import { useRouter } from "next/router";

const ProfileTemplate = ({ userProps }) => {
  const { t } = useTranslation("common");
  const { logout } = useAuth();
  const [userDetails, setUserDetails] = useState([]);
  const [token, setToken] = useToken();
  const router = useRouter();

  useEffect(() => {
    setUserDetails(userProps);
  }, [userProps]);

  const handleChange = useCallback((e, index) => {
    const { name, value } = e.target;
    setUserDetails((prevState) =>
      prevState.map((detail, idx) =>
        idx === index ? { ...detail, [name]: value } : detail
      )
    );
  }, []);

  const updateUser = async () => {
    try {
      if (!token) throw new Error(t("authTokenNotFound"));

      const userPayload = userDetails[0];
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userPayload.name,
          surname: userPayload.surname,
          address: userPayload.address,
          city: userPayload.city,
          phone: userPayload.phone,
          email: userPayload.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`${t("failedToUpdate")}: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      setUserDetails([updatedUser]);
      Swal.fire("Success", t("userUpdatedSuccessfully"), "success");
    } catch (error) {
      console.error("Update user info error:", error);
      Swal.fire("Error", error.toString(), "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser();
  };

  const handleLogout = () => {
    logout();
    router.push("/login-register");
  };

  const renderFormField = useCallback(
    (userDetail, index, label, name) => (
      <React.Fragment key={`${name}-${index}`}>
        <label htmlFor={`${name}-${index}`} className={styles.label}>
          {t(label)}
        </label>
        <input
          type="text"
          id={`${name}-${index}`}
          name={name}
          value={userDetail[name] || ""}
          onChange={(e) => handleChange(e, index)}
          className={styles.input}
        />
      </React.Fragment>
    ),
    [handleChange, t]
  );

  return (
    <div className={styles.profileContainer}>
      <div>
        <h1 className={styles.title}>
          <span>{t("profile")}</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {userDetails.map((userDetail, index) =>
          ["name", "surname", "phone", "address", "city", "email"].map(
            (field) => renderFormField(userDetail, index, field, field)
          )
        )}
        <button type="submit" className={styles.submitButton}>
          {t("updateInfo")}
        </button>
      </form>
      <button onClick={handleLogout} className={styles.logoutButton}>
        {t("logout")}
      </button>
    </div>
  );
};

export default ProfileTemplate;
