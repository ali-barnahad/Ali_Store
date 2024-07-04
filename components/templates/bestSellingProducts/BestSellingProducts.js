import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y } from "swiper/modules";
import { Container } from "react-bootstrap";
import styles from "@/styles/CardHomeBest.module.css";
import ButtonLoadHome from "@/components/modules/buttonLoadHome/ButtonLoadHome";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";

const BestSellingProducts = React.memo(({ items }) => {
  const { t } = useTranslation("common");

  if (!items || !items.length) {
    return (
      <Container className="text-center mt-5">
        <p>{t("noProductsAvailable")}</p>
      </Container>
    );
  }

  const breakpoints = {
    576: {
      slidesPerView: 5.5,
    },
    0: {
      slidesPerView: 3.5,
    },
  };

  return (
    <>
      <h1 className="text-center my-5">{t("bestSellingProducts")}</h1>
      <Swiper
        modules={[A11y]}
        breakpoints={breakpoints}
        className={styles.swiper}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className={styles.swiperSlide}>
            <div
              className={`d-flex justify-content-around align-items-center flex-column ${styles.sliderHome}`}
            >
              <Image
                src={item.img}
                width={300}
                height={300}
                className={styles.image}
                alt={item.title}
                loading="lazy"
              />
              <ButtonLoadHome
                myload={t("processing")}
                nload={item.title}
                data={item}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
});

export default BestSellingProducts;
