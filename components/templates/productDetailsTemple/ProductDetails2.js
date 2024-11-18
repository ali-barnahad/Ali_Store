import React, { useEffect, useMemo, useState } from "react";
import { Image, ModalBody, ModalHeader } from "@nextui-org/react";
import ButtonAddToCart from "@/components/modules/buttonAddToCart/buttonAddToCart";
import SimilarProducts from "@/components/modules/similarProducts/SimilarProducts";
import Comments from "../comments/comments";
import { FaEuroSign } from "react-icons/fa";
import useTranslation from "@/hooks/useTranslation";
import NextImage from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import ProductInfo from "./ProductInfo";
import {
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { SlEye } from "react-icons/sl";
import SelectColor from "./SelectColor";
import ReadMoreLess from "@/components/ReadMoreLess";
import { FaCartPlus } from "react-icons/fa6";
const Image1 = "https://alistore.storage.c2.liara.space/aliStore1.jpg";
const Image2 = "https://alistore.storage.c2.liara.space/aliStore2.jpg";
const Image3 = "https://alistore.storage.c2.liara.space/aliStore3.jpg";
const Image4 = "https://alistore.storage.c2.liara.space/aliStore4.jpg";
export default function App({ product, comments, mostVisitedProducts }) {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { discountedPrice, formattedPrice } = useMemo(() => {
    const priceCalculation = Number(product.price);
    const discountedPriceCalculation =
      ((100 - product.offer) * priceCalculation) / 100;

    return {
      discountedPrice: discountedPriceCalculation.toLocaleString("en-US"),
      formattedPrice: priceCalculation.toLocaleString("en-US"),
    };
  }, [product.price, product.offer]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, []);
  useEffect(() => {
    setSelectedImage(product.img);
  }, [product.img]);
  const [selectedImage, setSelectedImage] = useState(product.img);

  return (
    <div className="border-none bg-background/60 self-start dark:bg-default-100/50 p-0">
      <div className="p-0">
        <div>
          <div className="flex flex-col w-full lg:flex-row mt-5 lg:mt-10 ">
            <div className="flex self-center items-center sm:w-[340px] md:w-[468px] lg:w-5/12 justify-center lg:self-auto ">
              {/* Sticky container */}
              <div className="relative min-h-full">
                <div className="flex items-center flex-col lg:flex-row-reverse lg:sticky lg:mt-5 lg:top-24">
                  {/* Display the large selected image */}
                  <Image
                    alt={product.title}
                    as={NextImage}
                    className="lg:mb-auto"
                    height={300}
                    width={300}
                    shadow="sm"
                    src={selectedImage}
                  />

                  <div className="flex">
                    {/* Tabs with thumbnails */}
                    <Tabs
                      aria-label="Options"
                      color="primary"
                      variant="underlined"
                      classNames={{
                        tabList:
                          "w-max relative flex lg:flex-col rounded-none p-0",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: " px-1 h-max",
                        tabContent:
                          "group-data-[selected=true]:text-[#06b6d4] pt-10 pb-1 lg:pt-0",
                        cursor: "none",
                        base: "lg:ml-10",
                      }}
                    >
                      {/* Thumbnails for each image */}
                      <Tab
                        key="photo"
                        title={
                          <div className="flex items-center space-x-2">
                            <Image
                              alt={product.title}
                              as={NextImage}
                              className="object-cover cursor-pointer"
                              height={60}
                              width={60}
                              shadow="sm"
                              src={product.img}
                              onClick={() => setSelectedImage(product.img)} // Update selected image
                            />
                          </div>
                        }
                      />
                      <Tab
                        key="photos"
                        title={
                          <div className="flex items-center space-x-2">
                            <Image
                              alt={product.title}
                              as={NextImage}
                              className="object-cover cursor-pointer"
                              height={60}
                              width={60}
                              shadow="sm"
                              src={Image1}
                              onClick={() => setSelectedImage(Image1)} // Update selected image
                            />
                          </div>
                        }
                      />
                      <Tab
                        key="photoss"
                        title={
                          <div className="flex items-center space-x-2">
                            <Image
                              alt={product.title}
                              as={NextImage}
                              className="object-cover cursor-pointer"
                              height={60}
                              width={60}
                              shadow="sm"
                              src={Image2}
                              onClick={() => setSelectedImage(Image2)} // Update selected image
                            />
                          </div>
                        }
                      />
                      <Tab
                        key="photosss"
                        title={
                          <div className="flex items-center space-x-2">
                            <Image
                              alt={product.title}
                              as={NextImage}
                              className="object-cover cursor-pointer"
                              height={60}
                              width={60}
                              shadow="sm"
                              src={Image3}
                              onClick={() => setSelectedImage(Image3)} // Update selected image
                            />
                          </div>
                        }
                      />
                      <Tab
                        key="photossss"
                        title={
                          <div className="flex items-center space-x-2">
                            <Image
                              alt={product.title}
                              as={NextImage}
                              className="object-cover cursor-pointer"
                              height={60}
                              width={60}
                              shadow="sm"
                              src={Image4}
                              onClick={() => setSelectedImage(Image4)} // Update selected image
                            />
                          </div>
                        }
                      />
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center lg:w-7/12">
              <div className="flex justify-center  mt-6 px-10">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90 self-center">
                    {product.title}
                  </h3>
                  <div className="my-10">
                    <Button
                      onPress={onOpen}
                      className="flex flex-row-reverse float-end"
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                      <p className="text-xl">
                        {t("ViewFullProductInformation")}
                      </p>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                    </Button>
                    <Modal
                      isOpen={isOpen}
                      placement="top-center"
                      onOpenChange={onOpenChange}
                      size="5xl"
                      className="mx-5 mt-20 lg:mx-8 md:mx-14"
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col self-end gap-1">
                              <span className="flex gap-5">
                                <SlEye className="text-2xl" />
                                {t("ProductInfo")}
                              </span>
                            </ModalHeader>
                            <ModalBody>
                              <ProductInfo />
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" onClick={onClose}>
                                {t("close")}
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                  <div className="self-end">
                    <SelectColor />
                  </div>
                  <div className="mb-3">
                    <p className="text-[#052814] inline text-3xl  w-max p-3 rounded">
                      {discountedPrice} <FaEuroSign className="inline" />
                    </p>
                  </div>
                  <div className="mb-10">
                    <p className="text-xl  text-[#052814c7]">
                      {t(
                        "10YearLimitedWarrantyReadTheTermsInTheLimitedWarrantyBrochure"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-row items-center mb-8">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather mx-1 feather-check-square"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <polyline points="9 11 12 14 22 4"></polyline>
                        </svg>
                      </span>
                      <span className="text-xl">{t("AvailableToShip")}</span>
                    </p>
                  </div>
                  <div>
                    <ReadMoreLess text={product.text} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center  items-center fixed bottom-0 bg-gradient-to-r from-[#17C964] to-[#0a6f48] z-50 w-full py-4 px-8 shadow-lg">
            <div className="flex flex-col items-center w-max space-y-2">
              <p className="text-white inline text-3xl font-semibold w-max p-3 rounded">
                {discountedPrice} <FaEuroSign className="inline" />
              </p>
            </div>

            <div className="px-10 w-max">
              <ButtonAddToCart
                myload={t("addingToCart")}
                nload={t("addToCart")}
                data={product}
              />
            </div>

            <div className="flex flex-col items-center w-max space-y-2">
              <p className="text-[#e8e8e8b3] line-through inline rounded w-max p-3 text-2xl">
                {formattedPrice} <FaEuroSign className="inline" />
              </p>
            </div>
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="mt-4">
              <SimilarProducts
                products={mostVisitedProducts}
                view={1.5}
                viewXs={2.5}
                viewSm={3.5}
                viewLg={4.5}
                viewXl={5.5}
              />
              <Comments
                productID={product._id}
                productType={product.nameCategory}
                comments={comments}
                name={name}
                email={email}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
