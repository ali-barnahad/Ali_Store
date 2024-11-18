import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import AddToWishList from "../addToWishlist/AddToWishlist";
import ButtonAddToCart from "../buttonAddToCart/buttonAddToCart";
import useTranslation from "@/hooks/useTranslation";

function QuickViewModal({ show, product, handleClose }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  if (!product) return null;

  const handleDetailsClick = () => {
    router.push(`/${product.nameCategory}/${product._id}`);
  };

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <ModalContent className="bg-white rounded-lg shadow-lg">
        <ModalHeader className="flex items-center justify-between p-4 border-b">
          <button
            onClick={handleDetailsClick}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {t("Details")}
          </button>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center p-4">
          <Image
            className="rounded"
            src={product.img}
            width={400}
            height={400}
            alt={product.title}
            loading="lazy"
          />
          <p className="mt-4 text-xl font-semibold">{product.title}</p>
          <div className="mt-2 text-2xl text-red-600">${product.price}</div>
          <ButtonAddToCart
            myload="addingToCart"
            nload="addToCart"
            data={product}
            className="mt-4"
          />
          <AddToWishList data={product} className="mt-2" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default QuickViewModal;
