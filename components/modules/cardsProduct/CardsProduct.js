import React, { useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonLoadProduct, {
  handleClick,
} from "../buttonLoadProduct/ButtonLoadProduct";
import Image from "next/image";
import styles from "@/styles/CardsProduct.module.css";
import AddToWishList from "../addToWishlist/AddToWishlist";
import useTranslation from "@/hooks/useTranslation";
import { FaEuroSign } from "react-icons/fa";
import { useRouter } from "next/router";

function CardsProduct({ product }) {
  const { t } = useTranslation("common");
  const { price, offer, img, title } = product;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { discountedPrice, formattedPrice } = useMemo(() => {
    const priceCalculation = Number(price);
    const discountedPriceCalculation = ((100 - offer) * priceCalculation) / 100;

    return {
      discountedPrice: discountedPriceCalculation.toLocaleString("en-US"),
      formattedPrice: priceCalculation.toLocaleString("en-US"),
    };
  }, [price, offer]);

  return (
    <Card className={styles.card}>
      <div className={styles.imgContainer}>
        <Image
          src={img}
          width={300}
          height={200}
          alt={`Picture of ${title}`}
          className={styles.img}
          loading="lazy" // Explicitly setting lazy loading
          onClick={handleClick(router, isLoading, setLoading, t, product)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.cardTexts}>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{title}</Card.Title>
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
        <ButtonLoadProduct
          myload={t("loading")}
          nload={t("details")}
          data={product}
        />
        <AddToWishList myload={t("adding")} nload="" data={product} />
      </div>
    </Card>
  );
}

export default CardsProduct;
