// components/modules/buttonAddToCart/buttonAddToCart.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "@/styles/ButtonAddToCart.module.css";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";
import useToken from "@/hooks/useToken";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

function ButtonAddToCart({ myload, nload, data }) {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useToken();
  const { refreshCartCount } = useAuth(); // Destructure the refresh function

  const addToCart = async () => {
    setLoading(true);

    if (!token) {
      Swal.fire(
        t("authenticationError"),
        t("pleaseLoginToAddItemsToYourCart"),
        "error"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: data._id,
          quantity: 1,
          nameCategory: data.nameCategory,
          img: data.img,
          title: data.title,
          text: data.text || "",
          price: data.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("failedToAddItemToCart"));
      }
      Swal.fire(t("success"), t("productAddedToCart"), "success");
      refreshCartCount(); // Refresh the cart count after success
    } catch (error) {
      console.error("Add to cart error:", error);
      Swal.fire(t("error"), error.message, "error");
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
      {isLoading ? myload : nload}
    </Button>
  );
}

export default ButtonAddToCart;
