import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "@/styles/dropAdminPage.module.css";
import AddProductModal from "@/components/templates/index/addProduct";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode"; // Ensure you have installed jwt-decode
import useTranslation from "@/hooks/useTranslation";

function AdminPage() {
  const { t } = useTranslation("common");
  const [formShow, setFormShow] = useState(false);

  const toggleForm = () => setFormShow(!formShow);
  const handleConfirm = () => setFormShow(false);

  return (
    <>
      <Dropdown className={styles.dropMain}>
        <Dropdown.Toggle
          className={styles.dropdownToggle}
          onClick={toggleForm}
          variant="success"
          id="dropdown-autoclose-true"
        >
          {t("addProduct")}
        </Dropdown.Toggle>
        <Dropdown.Toggle
          className={styles.dropdownToggle}
          onClick={toggleForm}
          variant="success"
          id="dropdown-autoclose-true"
        >
          {t("deleteProduct")}
        </Dropdown.Toggle>
        <Dropdown.Toggle
          className={styles.dropdownToggle}
          onClick={toggleForm}
          variant="success"
          id="dropdown-autoclose-true"
        >
          {t("editProduct")}
        </Dropdown.Toggle>
      </Dropdown>
      {formShow && (
        <AddProductModal
          hideAddProduct={toggleForm}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["refresh-token"]; // Replace with your actual cookie name

  if (typeof token !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (!decoded.exp || decoded.exp < currentTime || !decoded.isAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AdminPage;
