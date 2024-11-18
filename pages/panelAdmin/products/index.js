import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import styles from "@/styles/dropAdminPage.module.css";
import AddProductModal from "@/components/templates/index/addProduct";
import { parseCookies } from "nookies";
import jwtDecode from "jwt-decode"; // Ensure you have installed jwt-decode
import useTranslation from "@/hooks/useTranslation";

function AdminPage() {
  const { t } = useTranslation("common");
  const [formShow, setFormShow] = useState(false);

  const toggleForm = () => setFormShow(!formShow);
  const handleConfirm = () => setFormShow(false);

  return (
    <>
      <div className="flex justify-center space-x-4">
        <Button auto flat color="success" onClick={toggleForm}>
          {t("addProduct")}
        </Button>
        <Button auto flat color="success" onClick={toggleForm}>
          {t("deleteProduct")}
        </Button>
        <Button auto flat color="success" onClick={toggleForm}>
          {t("editProduct")}
        </Button>
      </div>
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
  const token = cookies["refresh-token"];

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
