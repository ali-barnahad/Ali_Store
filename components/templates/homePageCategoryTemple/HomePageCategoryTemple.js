import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "@/styles/HomePageCategoryTemple.module.css";
import useTranslation from "@/hooks/useTranslation";
import HomePageCategorySection from "@/components/modules/homePageCategorySection/HomePageCategorySection";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, A11y } from "swiper/modules";

function HomePageCategoryTemple({
  products,
  view,
  viewXs,
  viewSm,
  viewLg,
  viewXl,
}) {
  const { t } = useTranslation("common");

  if (!products || !products.length) {
    return (
      <Container className={styles.myContainerNoProduct}>
        <p className={styles.noProduct}>{t("noProductsAvailable")}</p>
      </Container>
    );
  }

  // Extract the nameCategory from the first product
  const firstProductNameCategory = products[0].nameCategory;

  return (
    <>
      <Link href={`/${firstProductNameCategory}`} passHref>
        <h1 className={styles.headerCategory}>
          {t(`${firstProductNameCategory}`)}
        </h1>
      </Link>
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
    </>
  );
}

export default HomePageCategoryTemple;
