import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";
import useToken from "@/hooks/useToken";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FaCartPlus } from "react-icons/fa6";

function ButtonAddToCart({ myload, nload, data }) {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useToken();
  const { refreshCartCount } = useAuth();
  const router = useRouter();

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
      refreshCartCount();
    } catch (error) {
      console.error("Add to cart error:", error);
      (await Swal.fire(t("error"), t("errorAddToCartFailed"))).isConfirmed &&
        router.push("/login-register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      auto
      color="danger"
      disabled={isLoading}
      onClick={!isLoading ? addToCart : null}
      style={{ direction: "ltr" }}
      className="mt-2 text-xl p-6 sm:text-2xl sm:p-8 md:text-3xl md:p-10 " // Example Tailwind CSS class, you can modify this
    >
      {myload ? (
        <>
          {t("addingToCart")}
          <FaCartPlus className="text-3xl" />
        </>
      ) : (
        nload
      )}
    </Button>
  );
}

export default ButtonAddToCart;
