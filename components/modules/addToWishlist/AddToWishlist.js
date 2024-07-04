import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "@/styles/AddToWishList.module.css";
import Swal from "sweetalert2";
import { CiHeart } from "react-icons/ci";
import useTranslation from "@/hooks/useTranslation";
import useToken from "@/hooks/useToken";

function AddToWishList({ myload, nload, data }) {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useToken();

  const addToCart = async () => {
    setLoading(true);

    if (!token) {
      Swal.fire({
        title: t("authenticationError"),
        text: t("pleaseLoginToAddItemsToYourCart"),
        icon: "error",
        customClass: {
          popup: "swal2-custom-zindex",
        },
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/wishList/addToWishList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: data._id,
          nameCategory: data.nameCategory,
          img: data.img,
          title: data.title,
          price: data.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("failedToAddItemToCart"));
      }

      Swal.fire({
        title: t("success"),
        text: t("productAddedToCart"),
        icon: "success",
        customClass: {
          popup: "swal2-custom-zindex",
        },
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      Swal.fire({
        title: t("error"),
        text: error.message,
        icon: "error",
        customClass: {
          popup: "swal2-custom-zindex",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? addToCart : null}
      className={styles.buttonLoad}
    >
      {isLoading ? myload : <CiHeart className={styles.heart} />}
    </Button>
  );
}

export default AddToWishList;
