import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y } from "swiper/modules";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";
import ButtonLoadHome from "@/components/modules/buttonLoadHome/ButtonLoadHome";

const BestSellingProducts = React.memo(({ items }) => {
  const { t } = useTranslation("common");

  if (!items || !items.length) {
    return (
      <div className="text-center mt-20">
        <p>{t("noProductsAvailable")}</p>
      </div>
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
      <h1 className="text-center my-10 text-3xl font-bold">
        {t("bestSellingProducts")}
      </h1>
      <Swiper modules={[A11y]} breakpoints={breakpoints} className="w-full">
        {items.map((item) => (
          <SwiperSlide key={item.id} className="p-4">
            <div className="flex flex-col items-center justify-around p-4 bg-white shadow-lg rounded-lg">
              <Image
                src={item.img}
                width={300}
                height={300}
                className="rounded-lg"
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
