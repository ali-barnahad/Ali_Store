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
            src="/categoryImages/flooring.webp"
            alt="Slide 1"
            fill
            className={styles.image}
            loading="lazy" // Explicitly setting lazy loading
          />
        </div>
        <div className={styles.slide} onClick={() => router.push("/mobiles")}>
          <Image
            src="/categoryImages/mobile.webp"
            alt="Slide 2"
            fill
            className={styles.image}
            loading="lazy" // Explicitly setting lazy loading
          />
        </div>
        <div
          className={styles.slide}
          onClick={() => router.push("/personalItems")}
        >
          <Image
            src="/categoryImages/personalItem.webp"
            alt="Slide 3"
            fill
            className={styles.image}
            loading="lazy" // Explicitly setting lazy loading
          />
        </div>
        <div className={styles.slide} onClick={() => router.push("/stickers")}>
          <Image
            src="/categoryImages/sticker.webp"
            alt="Slide 4"
            fill
            className={styles.image}
            loading="lazy" // Explicitly setting lazy loading
          />
        </div>
        <div
          className={styles.slide}
          onClick={() => router.push("/kitchenwares")}
        >
          <Image
            src="/categoryImages/kitchenware.webp"
            alt="Slide 5"
            fill
            className={styles.image}
            loading="lazy" // Explicitly setting lazy loading
          />
        </div>
        <div className={styles.slide} onClick={() => router.push("/watches")}>
          <Image
            src="/categoryImages/watch.webp"
            alt="Slide 3"
            fill
            className={styles.image}
            loading="lazy" // Explicitly setting lazy loading
          />
        </div>
      </Slider>
    </div>
  );
};

export default MainHomeTopSlider;
