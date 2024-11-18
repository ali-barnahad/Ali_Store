import React from "react";
import PropTypes from "prop-types";
import CardsProduct from "@/components/modules/cardsProduct/CardsProduct";
import useTranslation from "@/hooks/useTranslation";
import { Divider } from "@nextui-org/react";

function ProductTemple({ productDetail }) {
  const { t } = useTranslation("common");

  if (!productDetail || !productDetail.length) {
    return (
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500">{t("noProductsAvailable")}</p>
      </div>
    );
  }

  return (
    <div className="sm:container mx-auto sm:px-4">
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   xl:grid-cols-5 2xl:grid-cols-6 sm:gap-4 ">
        {productDetail.map((product) => (
          <div key={product._id} className="p-0">
            <div className="shadow-lg rounded-lg  overflow-hidden">
              <CardsProduct product={product} />
              <Divider className="p-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductTemple.propTypes = {
  productDetail: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

export default ProductTemple;
