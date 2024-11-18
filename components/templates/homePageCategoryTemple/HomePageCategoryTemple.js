import React from "react";
import HomePageCategorySection from "@/components/modules/homePageCategorySection/HomePageCategorySection";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, A11y } from "swiper/modules";
import useTranslation from "@/hooks/useTranslation";

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
      <Container className="flex justify-center items-center py-5">
        <p className="text-center text-gray-500">{t("noProductsAvailable")}</p>
      </Container>
    );
  }

  // Extract the nameCategory from the first product
  const firstProductNameCategory = products[0].nameCategory;

  return (
    <div className="mt-16">
      <Link
        className="m-auto block w-max mb-5"
        href={`/${firstProductNameCategory}`}
        passHref
      >
        <span className="text-3xl px-3 ">&#8595;</span>
        <h1 className="inline  text-2xl font-bold text-center  cursor-pointer hover:text-blue-600 underline underline-offset-4 decoration-rose-600">
          {t(`${firstProductNameCategory}`)}
        </h1>
        <span className="text-3xl  px-3">&#8595;</span>
      </Link>
      <div className="swiper-container px-4">
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
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="swiper-slide p-2">
              <HomePageCategorySection product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomePageCategoryTemple;
