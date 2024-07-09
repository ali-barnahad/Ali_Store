import React, { useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonLoadProduct, {
  handleClick,
} from "../buttonLoadProduct/ButtonLoadProduct";
import Image from "next/image";
import styles from "@/styles/HomePageCategorySection.module.css";
import AddToWishList from "../addToWishlist/AddToWishlist";
import useTranslation from "@/hooks/useTranslation";
import { FaEuroSign } from "react-icons/fa";
import { useRouter } from "next/router";
import { truncateTitle } from "@/utils/truncateTitle";
import QuickViewModal from "../quickViewModal/QuickViewModal";
import DefaultImage from "../../../public/uploads/default.jpg";
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

  const truncatedTitle = useMemo(() => truncateTitle(title), [title]);
  const openQuickView = (product) => {
    setSelectedItem(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setSelectedItem(null);
  };

  return (
    <Card className={styles.card}>
      <Image
        src={img || DefaultImage}
        width={300}
        height={300}
        alt={`Picture of ${title}`}
        className={styles.img}
        onClick={handleClick(router, isLoading, setLoading, t, product)}
        style={{ cursor: "pointer" }}
        loading="lazy"
      />
      <div className={styles.cardTexts}>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{truncatedTitle}</Card.Title>
          <div className={styles.priceContainer}>
            {offer > 0 ? (
              <>
                <Card.Text className={styles.discountedPrice}>
                  {discountedPrice}
                  <span className="ms-1">
                    <FaEuroSign />
                  </span>
                </Card.Text>
                <Card.Text>
                  <span className={styles.price}>{formattedPrice}</span>
                  <span className={styles.offer}>
                    {t("offer")}({offer}%)
                  </span>
                </Card.Text>
              </>
            ) : (
              <Card.Text className={styles.noOffer}>
                {formattedPrice}
                <span className="ms-1">
                  <FaEuroSign />
                </span>
              </Card.Text>
            )}
          </div>
        </Card.Body>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => openQuickView(product)}
            className={styles.quickViewButton}
          >
            Quick View
          </button>
          <span>
            <ButtonLoadProduct
              myload={t("loading")}
              nload={t("details")}
              data={product}
            />
          </span>
        </div>
        <AddToWishList myload={t("adding")} nload="" data={product} />
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
