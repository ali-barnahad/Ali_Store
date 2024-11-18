import React, { useState, useRef } from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { handleClick } from "../buttonLoadProduct/ButtonLoadProduct";

function SampleMoreCard({
  stickers,
  floorings,
  personalItems,
  kitchenwares,
  mobiles,
  watches,
}) {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  // Define available categories
  const categories = {
    Mobiles: mobiles,
    Watches: watches,
    PersonalItems: personalItems,
    Kitchenwares: kitchenwares,
    Stickers: stickers,
    Floorings: floorings,
  };

  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState("Mobiles");

  // Create a ref for the h1 element
  const sectionRef = useRef(null);
  const sectionRef2 = useRef(null);

  // Select the category data
  const selectedProducts = categories[selectedCategory];

  // Function to handle scrolling to the h1 section
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log(category);
    // Smooth scroll to the h1 section
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-[1200px] bg-blue-950 m-auto my-24 rounded-2xl pt-10 shadow-inner pb-24">
      <h1 className="block m-auto w-max text-6xl md:text-7xl font-extrabold  mt-12 mb-12 p-4 rounded-2xl antialiased tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#c10037] to-[#ffdd00]">
        {t("new")} {t("products")}
      </h1>
      {/* Buttons to Select Category */}
      <div className=" gap-2 grid grid-cols-12  px-5 md:px-20  ">
        {Object.keys(categories).map((category) => (
          <Card
            key={category}
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <CardHeader
              className={`absolute z-10 left-2 top-2 bg-blue-950	rounded-2xl	 w-max flex-col items-start ${
                selectedCategory === category ? "invisible" : "visible"
              }`}
              style={{ direction: "ltr" }}
            >
              <p className="text-xs text-[#ffec71a5] uppercase font-extrabold">
                New
              </p>
              <h4 className="text-2xl tracking-wide text-[#ffdd00c2] uppercase font-bold">
                {t(category)}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className={`z-0 w-full h-full scale-110 -translate-y-6 cursor-pointer object-cover ${
                selectedCategory === category ? "" : "blur-sm "
              }`}
              key={t(category) + category}
              src={`/uploads/${category.toLowerCase()}.webp`}
              onClick={() => handleCategoryChange(category)}
            />

            <CardFooter className="absolute bg-blue-100/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p
                  className={`text-2xl  font-extrabold ${
                    selectedCategory === category
                      ? "invisible	"
                      : " text-[#08334491]  p-3 rounded-2xl"
                  }`}
                >
                  Available now
                </p>
              </div>
              <Button
                key={t(category)}
                onClick={() => handleCategoryChange(category)}
                className={`text-base cursor-pointer ${
                  selectedCategory === category
                    ? "invisible"
                    : "bg-[#ffdd0087] text-[#082f49] font-semibold "
                }`}
                radius="full"
                size="md"
              >
                {t("view")} {t("new")} {t(category)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Target Section to Scroll To */}
      <h1
        ref={sectionRef} // Reference to this element
        className="block pt-32 pb-8 text-[#dcfce7]"
      >
        {t("new")} {t(selectedCategory)}
      </h1>

      {/* Dynamically render selected category's products */}
      <div
        className="gap-5 grid grid-cols-12 grid-rows-2 px-5 md:px-20"
        ref={sectionRef2}
      >
        {selectedProducts?.map((product, index) => (
          <Card
            key={index}
            isFooterBlurred
            className="w-full h-[230px] sm:h-[280px] md:h-[300px] lg:h-[340px]  col-span-6 md:col-span-4"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="p-2 rounded-2xl font-bold text-xl text-[#ffffff] text-center bg-[#dc2626]">
                New
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full mb-3 h-full scale-100 cursor-pointer object-cover"
              src={product.img}
              onClick={handleClick(router, isLoading, setLoading, t, product)}
            />
            <CardFooter className="absolute bg-blue-500/10 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div className="ml-2">
                <h6
                  className="text-blue-100 p-2 rounded-2xl bg-[#1725548b] font-medium text-sm w-48 text-center sm:w-52 md:w-56 lg:w-64 lg:text-lg overflow-hidden whitespace-nowrap text-ellipsis"
                  style={{ direction: "ltr" }}
                >
                  {product.title}
                </h6>
              </div>
              <Button
                className="text-sm lg:text-xl py-5 bg-blue-950 cursor-pointer text-blue-100 "
                radius="full"
                size="sm"
                onClick={handleClick(router, isLoading, setLoading, t, product)}
              >
                {t("view")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SampleMoreCard;
