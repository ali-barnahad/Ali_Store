import CardsProduct from "@/components/modules/cardsProduct/CardsProduct";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "@/styles/ProductTemple.module.css";
import useTranslation from "@/hooks/useTranslation";

function ProductTemple({ productDetail }) {
  const { t } = useTranslation("common");

  if (!productDetail || !productDetail.length) {
    return (
      <Container className={styles.myContainerNoProduct}>
        <p className={styles.noProduct}>{t("noProductsAvailable")}</p>
      </Container>
    );
  }

  return (
    <Container className={styles.myContainer}>
      <Row xs={1} sm={2} lg={3} xl={4} xxl={5} className={styles.myRow}>
        {productDetail.map((product) => (
          <Col key={product._id} className={styles.myCol}>
            <div className={styles.card}>
              <CardsProduct product={product} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

ProductTemple.propTypes = {
  productDetail: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ),
};

export default ProductTemple;
