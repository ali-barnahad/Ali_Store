import React, { useState } from "react";
import Swal from "sweetalert2";
import { HeartIcon } from "./HeartIcon";
import useTranslation from "@/hooks/useTranslation";
import useToken from "@/hooks/useToken";
import { Button } from "@nextui-org/react";
function AddToWishList({ data }) {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useToken();

  const addToWish = async () => {
    setLoading(true);

    if (!token) {
      Swal.fire({
        title: t("authenticationError"),
        text: t("pleaseLoginToAddItemsToYourWishList"),
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
        throw new Error(errorData.message || t("failedToAddItemToWishList"));
      }

      Swal.fire({
        title: t("success"),
        text: t("productAddedToWishList"),
        icon: "success",
        customClass: {
          popup: "swal2-custom-zindex",
        },
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      Swal.fire({
        title: t("error"),
        text: t("failedToAddItemToWishList"),
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
    // <Button
    //   variant="primary"
    //   disabled={isLoading}
    //   onClick={!isLoading ? addToWish : null}
    //   className={styles.buttonLoad}
    // >
    <Button
      isIconOnly
      color="#000000"
      aria-label="Like"
      disabled={isLoading}
      onClick={!isLoading ? addToWish : null}
      className=" bg-[#ff6666da] text-[#0c2549] rounded-lg ml-4 hover:bg-[#ff0909] hover:text-[#dbfcff] hover:scale-110 transition-transform duration-300 ease-in-out"
    >
      {isLoading ? <Button color="primary" isLoading></Button> : <HeartIcon />}
    </Button>
  );
}

export default AddToWishList;
