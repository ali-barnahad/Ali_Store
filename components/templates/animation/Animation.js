// import Motor from "./Motor.svg";
// import Image from "next/image";
// import MotorX from "./MotorX.svg";
{
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 576);
  //   };
  //   handleResize(); // Check initial width
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  /* <div className={`${styles.path} ${styles.motor}`}>
  <Image src={isMobile ? MotorX : Motor} alt="Motor" loading="lazy" />
</div> */
}
// const [isMobile, setIsMobile] = useState(false);
import React, { useState, useEffect } from "react";
import styles from "./Animation.module.css";
import useTranslation from "@/hooks/useTranslation";

function Animation() {
  const { t } = useTranslation("common");
  const texts = [
    t("Direct communication"),
    t("Safe and Fast delivery"),
    t("After sales service"),
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("typing");

  useEffect(() => {
    const typingDuration = 3000; // Duration for typing effect (matches the CSS)
    const displayDuration = 2000; // Duration to display the text before fading out
    const fadeOutDuration = 1000; // Duration for fade-out effect (matches the CSS)

    const displayTimer = setTimeout(() => {
      setAnimationClass("fadeOut");
    }, typingDuration + displayDuration);

    const nextTextTimer = setTimeout(() => {
      setAnimationClass("typing");
      setCurrentTextIndex((prevIndex) =>
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, typingDuration + displayDuration + fadeOutDuration);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(nextTextTimer);
    };
  }, [currentTextIndex, texts.length]);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={`${styles.text} ${styles[animationClass]}`}>
          {texts[currentTextIndex]}
        </h2>
      </div>
      <div className={styles.picContainer}>
        <div className={styles.factory} role="img" aria-label="Factory"></div>
        <div className={styles.picRow}>
          <div
            className={styles.alistore}
            role="img"
            aria-label="Alistore"
          ></div>
          <div
            className={styles.customer}
            role="img"
            aria-label="Customer"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Animation;
