import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "@/styles/MainHomeTopSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRouter } from "next/router";

const MainHomeTopSlider = () => {
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div className={styles.slide} onClick={() => router.push("/floorings")}>
          <Image
            src="/uploads/flooring.webp"
            alt="Slide 1"
            fill
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.slide} onClick={() => router.push("/mobiles")}>
          <Image
            src="/uploads/mobile.webp"
            alt="Slide 2"
            fill
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div
          className={styles.slide}
          onClick={() => router.push("/personalItems")}
        >
          <Image
            src="/uploads/personalItem.webp"
            alt="Slide 3"
            fill
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.slide} onClick={() => router.push("/stickers")}>
          <Image
            src="/uploads/sticker.webp"
            alt="Slide 4"
            fill
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div
          className={styles.slide}
          onClick={() => router.push("/kitchenwares")}
        >
          <Image
            src="/uploads/kitchenware.webp"
            alt="Slide 5"
            fill
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.slide} onClick={() => router.push("/watches")}>
          <Image
            src="/uploads/watch.webp"
            alt="Slide 6"
            fill
            className={styles.image}
            loading="lazy"
          />
        </div>
      </Slider>
    </div>
  );
};

export default MainHomeTopSlider;
