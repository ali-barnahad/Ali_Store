import React from "react";
import { Text } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { Navigation, A11y, Parallax, EffectCreative } from "swiper/modules";
import HomePageCategorySection from "@/components/modules/homePageCategorySection/HomePageCategorySection";
import useTranslation from "@/hooks/useTranslation";

function SimilarProducts({ products, view, viewXs, viewSm, viewLg, viewXl }) {
  const { t } = useTranslation("common");

  if (!products || !products.length) {
    return (
      <div className="flex justify-center items-center py-16">
        <Text size="$lg" color="error">
          {t("noProductsAvailable")}
        </Text>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h3 className="my-5 px-10 self-end text-start underline underline-offset-4 decoration-rose-600">
        {t("similarProducts")}
      </h3>
      <div className="relative">
        <Swiper
          modules={[Navigation, A11y, Parallax, EffectCreative]}
          navigation
          parallax={true} // Enable parallax effect
          speed={800} // Adjust speed for a smoother experience
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
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="p-2">
              <div className="parallax-bg" data-swiper-parallax="-23%"></div>
              <HomePageCategorySection product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SimilarProducts;
