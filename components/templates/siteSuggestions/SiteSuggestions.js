import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "@/styles/SiteSuggestions.module.css";
import { Navigation, A11y } from "swiper/modules";
import Image from "next/image";
import ButtonLoadHome, {
  handleClick,
} from "@/components/modules/buttonLoadHome/ButtonLoadHome";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SiteSuggestions({ items }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className={styles.containerOffer}>
      <div className={styles.headerOffer}>
        <h1 className={styles.textOffer}>{t("springDiscounts")}</h1>
        <Image
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className={styles.imageOffer}
          src="/categoryImages/discount_11741696.png"
          alt="offer"
          width={80}
          height={80}
          loading="lazy"
        />
      </div>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, A11y]}
          breakpoints={{
            0: {
              slidesPerView: 3.3,
            },
            576: {
              slidesPerView: 4.3,
            },
            768: {
              slidesPerView: 5.3,
            },
            992: {
              slidesPerView: 4.3,
            },
            1200: {
              slidesPerView: 5.3,
            },
          }}
          className={styles.swiper}
        >
          {items.map((item) => (
            <SwiperSlide
              key={item._id}
              className={`d-flex justify-content-around align-items-center flex-column ${styles.swiperSlide}`}
            >
              <Image
                src={item.img}
                width={200}
                height={200}
                className={styles.image}
                loading="lazy"
                alt={item.title}
                onClick={handleClick(router, isLoading, setLoading, item)}
                style={{ cursor: "pointer" }}
              />
              <ButtonLoadHome
                myload={t("processing")}
                nload={item.title}
                data={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
