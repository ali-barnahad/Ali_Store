import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/cart.module.css";
import { deleteCartItem, updateCartItemQuantity } from "@/services/cartService";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useAuth } from "@/context/AuthContext";
import useTranslation from "@/hooks/useTranslation";

const CartComponent = ({ initialItems }) => {
  const { t } = useTranslation("common");
  const { setCartCount, token } = useAuth(); // Retrieve the token from useAuth context
  const [items, setItems] = useState(initialItems || []);
  useEffect(() => {
    setItems(initialItems);
    setCartCount(initialItems.length);
  }, [initialItems]);

  useEffect(() => {
    setCartCount(items.length);
  }, [items]);

  const confirmAction = async (title, text, confirmButtonText) => {
    return await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText: t("cancel"),
    });
  };

  const handleUpdateQuantity = async (productId, delta) => {
    const itemToUpdate = items.find((item) => item._id === productId);
    if (!itemToUpdate) return;

    const newQuantity = itemToUpdate.quantity + delta;
    if (newQuantity <= 0) {
      const result = await confirmAction(
        t("areYouSure"),
        t("deleteProductFromCart"),
        t("yesDeleteIt")
      );
      if (result.isConfirmed) {
        const isSuccess = await deleteCartItem(productId);
        if (isSuccess) {
          setItems(items.filter((item) => item._id !== productId));
          Swal.fire(t("deleted"), t("productDeletedFromCart"), "success");
        } else {
          Swal.fire(t("error"), t("failedToDeleteProductFromCart"), "error");
        }
      }
    } else {
      const isSuccess = await updateCartItemQuantity(productId, newQuantity);
      if (isSuccess) {
        setItems(
          items.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
        Swal.fire(t("updated"), t("productQuantityUpdated"), "success");
      } else {
        Swal.fire(t("error"), t("failedToUpdateProductQuantity"), "error");
      }
    }
  };

  const handleDeleteItem = async (productId) => {
    const result = await confirmAction(
      t("areYouSure"),
      t("deleteProductFromCart"),
      t("yesDeleteIt")
    );
    if (result.isConfirmed) {
      const isSuccess = await deleteCartItem(productId);
      if (isSuccess) {
        setItems((currentItems) =>
          currentItems.filter((item) => item._id !== productId)
        );
        Swal.fire(t("deleted"), t("productDeletedFromCart"), "success");
      } else {
        Swal.fire(t("error"), t("failedToDeleteProductFromCart"), "error");
      }
    }
  };

  return (
    <div className={styles.cart}>
      {items.length > 0 && (
        <button className={styles.checkoutBtn}>{t("proceedToCheckout")}</button>
      )}
      <div></div>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className={styles.item}>
            <div className={styles.image}>
              <Image
                src={item.img || "/public/images/"}
                alt={item.title}
                width={100}
                height={100}
                layout="fixed"
                className={styles.image}
                loading="lazy" // Explicitly setting lazy loading
              />
            </div>
            <div className={styles.details}>
              <h3>{item.title}</h3>
              <h2 className={styles.quantity}>
                {t("quantity")}: {item.quantity}
              </h2>
              <div className={styles.buttons}>
                <button
                  className={styles.increaseBtn}
                  onClick={() => handleUpdateQuantity(item._id, 1)}
                >
                  <CiCirclePlus />
                </button>
                <button
                  className={styles.decreaseBtn}
                  onClick={() => handleUpdateQuantity(item._id, -1)}
                >
                  <CiCircleMinus />
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteItem(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.emptyMessage}>{t("cartIsEmpty")}</p>
      )}
    </div>
  );
};

export default CartComponent;
