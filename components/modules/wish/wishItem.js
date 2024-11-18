import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/wishList.module.css";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { deleteWishItem } from "@/services/wishService";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";

const WishItem = ({ item = [] }) => {
  const { t } = useTranslation("common");
  const [items, setItems] = useState(item);
  const router = useRouter();

  useEffect(() => {
    setItems(item || []);
  }, [item]);

  const confirmAction = async (title, text, confirmButtonText) => {
    return await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText: t("cancelButton"),
    });
  };

  const handleDeleteItem = async (productId) => {
    const result = await confirmAction(
      t("confirmDeleteTitle"),
      t("confirmDeleteText"),
      t("confirmDeleteButton")
    );
    if (result.isConfirmed) {
      const isSuccess = await deleteWishItem(productId);
      if (isSuccess) {
        setItems((currentItems) =>
          currentItems.filter((item) => item._id !== productId)
        );
        Swal.fire(t("successDeleteTitle"), t("successDeleteText"), "success");
      } else {
        Swal.fire(t("errorDeleteTitle"), t("errorDeleteText"), "error");
      }
    }
  };

  const handleGoToProduct = (item) => {
    router.push(`/${item.nameCategory}/${item._id}`);
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>
          <span>{t("wishList")}</span>
        </h1>
      </div>
      <div className={styles.wishes}>
        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className={styles.item}>
              <div className={styles.image}>
                <Image
                  src={item.img || "/public/images/"}
                  alt={item.title}
                  width={100}
                  height={100}
                  className={styles.image}
                  loading="lazy" // Explicitly setting lazy loading
                />
              </div>
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <div className={styles.buttons}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className={styles.goToProduct}
                    onClick={() => handleGoToProduct(item)}
                  >
                    {t("goToProductButton")}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className={styles.emptyMessage}>{t("emptyCartMessage")}</h1>
        )}
      </div>
    </>
  );
};

export default WishItem;
