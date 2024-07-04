import React from "react";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/QuickViewModal.module.css";
import { useRouter } from "next/router";
import AddToWishList from "../addToWishlist/AddToWishlist";
import ButtonAddToCart from "../buttonAddToCart/buttonAddToCart";

function QuickViewModal({ show, product, handleClose }) {
  const router = useRouter();

  if (!product) return null;

  const handleDetailsClick = () => {
    router.push(`/${product.nameCategory}/${product._id}`);
  };

  return (
    <Modal className={styles.modal} show={show} onHide={handleClose} centered>
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.modalHeaderContent}>
          <button onClick={handleDetailsClick} className={styles.modalTitle}>
            Details
          </button>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Image
          className={styles.productImage}
          src={product.img}
          width={400}
          height={400}
          alt={product.title}
          loading="lazy" // Explicitly setting lazy loading
        />
        <p className={styles.productTitle}>{product.title}</p>
        <div className={styles.productPrice}>${product.price}</div>
        <ButtonAddToCart
          myload="addingToCart"
          nload="addToCart"
          data={product}
        />
        <AddToWishList myload="adding" nload="add to wishlist" data={product} />
      </Modal.Body>
    </Modal>
  );
}

export default QuickViewModal;
