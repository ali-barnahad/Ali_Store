import React, { useMemo, useState } from "react";
import { Card, Button, Link, Image } from "@nextui-org/react"; // Updated to use NextUI Card
import { FaEuroSign } from "react-icons/fa";
import { useRouter } from "next/router";
import AddToWishList from "../addToWishlist/AddToWishlist";
import ButtonLoadProduct, {
  handleClick,
} from "../buttonLoadProduct/ButtonLoadProduct";
import useTranslation from "@/hooks/useTranslation";
import QuickViewModal from "../quickViewModal/QuickViewModal";
import ReviewRating from "../reviewRating/ReviewRating";
function CardsProduct({ product }) {
  const { t } = useTranslation("common");
  const { price, offer, img, title } = product;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const randomInt = Math.floor(Math.random() * 9);
  const number = randomInt / 2 + 1;

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
    <Card className="rounded-lg m-0">
      <div className="flex flex-row items-center  p-0 justify-around sm:justify-center  sm:flex-col">
        <div className="flex  justify-center my-2 ml-10 mr-3 sm:mx-0 object-cover w-80 h-auto self-center	">
          <Image
            src={img}
            width={200}
            height={200}
            isZoomed
            alt={`Picture of ${title}`}
            className="cursor-pointer rounded-lg object-contain	 justify-center shadow-inner"
            onClick={handleClick(router, isLoading, setLoading, t, product)}
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
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mt-4">
            <Link
              className="block font-semibold cursor-pointer text-[#083344] text-xl	 text-center w-64 overflow-hidden whitespace-nowrap text-ellipsis"
              onClick={handleClick(router, isLoading, setLoading, t, product)}
              underline="hover"
              color="foreground"
              size="lg"
              dir="ltr"
              style={{ textAlignLast: "center" }}
            >
              {product.title}
            </Link>
          </div>
          <div className="flex flex-row-reverse items-center ml-6 justify-around">
            <div className="mt-2 w-max">
              {offer > 0 ? (
                <div className="flex flex-col align-middle items-start  justify-center mb-5 w-max">
                  <p className="text-[#08334491] line-through inline  text-xl mb-1">
                    {formattedPrice} <FaEuroSign className="inline" />
                  </p>
                  <p className="text-[#083344e2] inline text-xl bg-[#22d3ee3a] rounded">
                    {discountedPrice} <FaEuroSign className="inline" />
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
                className=" text-[#08334490]	text-lg	 rounded-lg ml-2"
                onClick={() => openQuickView(product)}
              >
                {t("QuickView")}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1 mb-5 space-x-4">
            <div>
              <AddToWishList data={product} />
            </div>
            <div>
              <ReviewRating rating={number} maxRating={5} />
            </div>
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

export default CardsProduct;
