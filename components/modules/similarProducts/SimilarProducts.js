import React from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/SimilarProducts.module.css";
import useTranslation from "@/hooks/useTranslation";
import HomePageCategorySection from "@/components/modules/homePageCategorySection/HomePageCategorySection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, A11y } from "swiper/modules";

function SimilarProducts({ products, view, viewXs, viewSm, viewLg, viewXl }) {
  const { t } = useTranslation("common");

  if (!products || !products.length) {
    return (
      <Container className={styles.myContainerNoProduct}>
        <p className={styles.noProduct}>{t("noProductsAvailable")}</p>
      </Container>
    );
  }

  return (
    <div div className={styles.myContainer}>
      <h1 className={styles.headerCategory}> {t("similarProducts")}</h1>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, A11y]}
          navigation
          breakpoints={{
            1200: {
              slidesPerView: viewXl,
            },
            992: {
              slidesPerView: viewLg,
            },
            768: {
              slidesPerView: viewSm,
            },
            576: {
              slidesPerView: viewXs,
            },
            0: {
              slidesPerView: view,
            },
          }}
          className={styles.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className={styles.swiperSlide}>
              <HomePageCategorySection product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SimilarProducts;
