import React, { useMemo, useState } from "react";
import { Card, Button, Link } from "@nextui-org/react"; // Updated to use NextUI Card
import ButtonLoadProduct, {
  handleClick,
} from "../buttonLoadProduct/ButtonLoadProduct";
import { Image } from "@nextui-org/react";
import AddToWishList from "../addToWishlist/AddToWishlist";
import useTranslation from "@/hooks/useTranslation";
import { FaEuroSign } from "react-icons/fa";
import { useRouter } from "next/router";
import QuickViewModal from "../quickViewModal/QuickViewModal";
import { NextImage } from "next/image";

function HomePageCategorySection({ product }) {
  const { t } = useTranslation("common");
  const { price, offer, img, title } = product;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { discountedPrice, formattedPrice } = useMemo(() => {
    const priceCalculation = Number(price);
    const discountedPriceCalculation = ((100 - offer) * priceCalculation) / 100;

    return {
      discountedPrice: discountedPriceCalculation.toLocaleString("en-US"),
      formattedPrice: priceCalculation.toLocaleString("en-US"),
    };
  }, [price, offer]);

  const openQuickView = (product) => {
    setSelectedItem(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setSelectedItem(null);
  };

  return (
    <Card className="p-4 mb-6 rounded-lg shadow-lg">
      <div className="flex justify-center">
        <Image
          as={NextImage}
          src={img || "/public/uploads/default.jpg"}
          width={200}
          height={200}
          alt={`Picture of ${title}`}
          className="cursor-pointer rounded-lg "
          onClick={handleClick(router, isLoading, setLoading, t, product)}
          loading="lazy"
        />
        <span className="relative">
          {offer > 0 ? (
            <span className="text-[#ffe0ae] w-12 text-center font-bold bg-[#c10037e0] absolute z-30 left-0 bottom-0  text-xl  ">
              {offer}%
            </span>
          ) : (
            ""
          )}
        </span>
      </div>

      <div className="flex justify-center mt-4">
        <Link
          className="block font-semibold text-[#083344] cursor-pointer text-center w-64 overflow-hidden whitespace-nowrap text-ellipsis"
          onClick={handleClick(router, isLoading, setLoading, t, product)}
          underline="hover"
          color="foreground"
          size="lg"
          dir="rtl"
          style={{ textAlignLast: "center", direction: "ltr" }}
        >
          {product.title}
        </Link>
      </div>
      <div className="flex flex-row-reverse items-center ml-6 justify-around">
        <div className="mt-2 w-max">
          {offer > 0 ? (
            <div className="flex flex-col align-middle items-start justify-center mb-5 w-max">
              <p className="text-[#08334491] line-through inline text-xl mb-1">
                {formattedPrice} <FaEuroSign className="inline" />
              </p>
              <p className="text-[#083344e2] inline text-xl">
                {discountedPrice} <FaEuroSign className="inline " />
                {/* <span className="ml-2 text-sm text-red-500">
                  {t("offer")} ({offer}%)
                </span> */}
              </p>
            </div>
          ) : (
            <p className="text-[#083344e2] text-xl">
              {formattedPrice} <FaEuroSign />
            </p>
          )}
        </div>
        <div className="flex flex-col-reverse ml-2 sm:flex-row  items-center justify-center  space-x-4">
          <Button
            auto
            shadow
            variant="ghost"
            className=" text-gray-600	text-lg	 rounded-lg ml-2"
            onClick={() => openQuickView(product)}
          >
            {t("QuickView")}
          </Button>
          <div>
            <AddToWishList data={product} />
          </div>
        </div>
      </div>

      <QuickViewModal
        show={showQuickView}
        product={selectedItem}
        handleClose={closeQuickView}
      />
    </Card>
  );
}

export default HomePageCategorySection;
