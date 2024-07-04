// components/templates/productDetailsTemple/ProductDetails.js
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import ButtonAddToCart from "@/components/modules/buttonAddToCart/buttonAddToCart";
import styles from "@/styles/ProductDetails.module.css";
import Comments from "../comments/comments";
import useTranslation from "@/hooks/useTranslation";
import { FaEuroSign } from "react-icons/fa";

function ProductDetails({ product, comments }) {
  const { t } = useTranslation("common");
  const [isFixed, setFixed] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isImageFixed, setImageFixed] = useState(true);

  const imageRef = useRef(null);
  const rowRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

    const handleScroll = () => {
      const rowElement = rowRef.current;
      const imageElement = imageRef.current;
      const endElement = endRef.current;

      if (rowElement && imageElement && endElement) {
        const rowBottom = rowElement.getBoundingClientRect().bottom;
        const endTop = endElement.getBoundingClientRect().top;
        const imageHeight = imageElement.getBoundingClientRect().height;

        if (endTop <= imageHeight + 20) {
          setImageFixed(false);
        } else {
          setImageFixed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { discountedPrice, formattedPrice } = useMemo(() => {
    const priceCalculation = Number(product.price);
    const discountedPriceCalculation =
      ((100 - product.offer) * priceCalculation) / 100;

    return {
      discountedPrice: discountedPriceCalculation.toLocaleString("en-US"),
      formattedPrice: priceCalculation.toLocaleString("en-US"),
    };
  }, [product.price, product.offer]);

  return (
    <Container className={styles.myContainer}>
      <Row className={styles.myRow} ref={rowRef}>
        <Col xs={12} md={6} className={`${styles.myCol}`}>
          <Image
            src={product.img}
            width={400}
            height={400}
            className={`img-fluid ${
              isImageFixed ? styles.myImgFixed : styles.myImgNormal
            }`}
            quality={80}
            loading="lazy"
            alt={product.title}
            ref={imageRef}
          />
        </Col>
        <Col xs={12} md={6} className={styles.myCol}>
          <p className={styles.title}>{product.title}</p>
          <p className={styles.text}>{product.text}</p>
        </Col>
      </Row>
      <Row ref={endRef} style={{ height: "1px" }}></Row>
      <Row
        className={`${styles.myRowButton} ${isFixed ? styles.buttonFixed : ""}`}
      >
        <div className={styles.myDivButton}>
          <div className={styles.discountedPrice}>
            <span className="ms-1">
              <FaEuroSign />
            </span>
            {t("price")}: {discountedPrice}
          </div>
          <div className={styles.myFormattedPrice}>
            <span className={styles.price}>
              <span className="ms-1">
                <FaEuroSign />
              </span>
              {formattedPrice}
            </span>
            <span className={styles.offer}>
              (%{product.offer} {t("discount")})
            </span>
          </div>
        </div>
        <ButtonAddToCart
          myload={t("addingToCart")}
          nload={t("addToCart")}
          data={product}
        />
      </Row>
      <Comments
        productID={product._id}
        productType={product.nameCategory}
        comments={comments}
        name={name}
        email={email}
      />
    </Container>
  );
}

export default ProductDetails;
