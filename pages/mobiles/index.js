import React, { useState } from "react";
import Head from "next/head";
import productsModel from "@/models/mobileModel";
import connectToDB from "@/utils/db";
import dynamic from "next/dynamic";
import useTranslation from "@/hooks/useTranslation";
import { Select, SelectItem } from "@nextui-org/react"; // Import NextUI components
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"; // For ascending and descending sort
import { FiEye } from "react-icons/fi"; // For visits/views
import { MdLocalOffer } from "react-icons/md"; // For offer
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai"; // For name sort
const Breadcrumbs = dynamic(
  () => import("@/components/modules/breadcrumbs/Breadcrumbs"),
  { ssr: false }
);
const ProductTemple = dynamic(
  () => import("@/components/templates/productTemple/ProductTemple"),
  { ssr: false }
);
const sortFunctions = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "name-asc": (a, b) => a.title.localeCompare(b.title),
  "name-desc": (a, b) => b.title.localeCompare(a.title),
  "visits-asc": (a, b) => a.view - b.view,
  "visits-desc": (a, b) => b.view - a.view,
  "offer-asc": (a, b) => a.offer - b.offer,
  "offer-desc": (a, b) => b.offer - a.offer,
};

function Mobiles({ products }) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortCriteria, setSortCriteria] = useState("");
  const { t } = useTranslation("common");

  const handleSortChange = (selectedValue) => {
    const value = Array.from(selectedValue)[0]; // Extract single selected key from Set
    setSortCriteria(value);

    if (sortFunctions[value]) {
      setSortedProducts([...products].sort(sortFunctions[value]));
    } else {
      setSortedProducts(products);
    }
  };
  return (
    <>
      <Head>
        <title>{t("mobilesPageTitle")}</title>
        <meta name="description" content={t("mobilesPageDescription")} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("mobilesPageTitle")} />
        <meta property="og:description" content={t("mobilesPageDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alistore.liara.run/mobiles" />
        <meta
          property="og:image"
          content="https://alistore.liara.run/images/mobiles-og-image.jpg"
        />
        <link rel="canonical" href="https://alistore.liara.run/mobiles" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "url": "https://alistore.liara.run/mobiles",
              "name": "${t("mobilesPageTitle")}",
              "description": "${t("mobilesPageDescription")}",
              "itemListElement": ${JSON.stringify(
                products.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: "https://alistore.liara.run/mobiles/" + product._id,
                  name: product.name,
                  image: product.imageURL,
                  description: product.description,
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "USD",
                    price: product.price,
                    availability: "http://schema.org/InStock",
                  },
                }))
              )}
            }
          `}
        </script>
      </Head>
      <Breadcrumbs route="mobiles" />
      <div
        className="flex flex-row align-middle items-center w-[280px] md:w-[400px] mb-10 m-auto gap-2"
        style={{ direction: "ltr" }}
      >
        <p className="text-xl md:text-3xl w-24 text-blue-950 md:w-36">
          {t("sortBy")}:
        </p>
        <Select
          variant="bordered"
          placeholder={t("select")}
          size="lg"
          title={new Set([sortCriteria])}
          selectedKeys={new Set([sortCriteria])} // Keep only the text as the selected value
          onSelectionChange={handleSortChange} // Handles the selection event
        >
          <SelectItem
            textValue={t("priceLowToHigh")}
            key="price-asc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <FaSortAmountUp className="text-2xl" />
              <span>{t("priceLowToHigh")}</span>
            </div>
          </SelectItem>
          <SelectItem
            key="price-desc"
            textValue={t("priceHighToLow")}
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <FaSortAmountDown className="text-2xl" />
              <span>{t("priceHighToLow")}</span>
            </div>
          </SelectItem>
          <SelectItem
            textValue={t("nameAToZ")}
            key="name-asc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <AiOutlineSortAscending className="text-2xl" />
              <span>{t("nameAToZ")}</span>
            </div>
          </SelectItem>
          <SelectItem
            textValue={t("nameZToA")}
            key="name-desc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <AiOutlineSortDescending className="text-2xl" />
              <span>{t("nameZToA")}</span>
            </div>
          </SelectItem>
          <SelectItem
            textValue={t("visitsLowToHigh")}
            key="visits-asc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <FiEye className="text-2xl" />
              <span>{t("visitsLowToHigh")}</span>
            </div>
          </SelectItem>
          <SelectItem
            textValue={t("visitsHighToLow")}
            key="visits-desc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <FiEye className="text-2xl" />
              <span>{t("visitsHighToLow")}</span>
            </div>
          </SelectItem>
          <SelectItem
            textValue={t("offerLowToHigh")}
            key="offer-asc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <MdLocalOffer className="text-2xl" />
              <span>{t("offerLowToHigh")}</span>
            </div>
          </SelectItem>
          <SelectItem
            textValue={t("offerHighToLow")}
            key="offer-desc"
            classNames={{ title: ["text-xl"] }}
          >
            <div className="flex justify-between w-full">
              <MdLocalOffer className="text-2xl" />
              <span>{t("offerHighToLow")}</span>
            </div>
          </SelectItem>
        </Select>
      </div>
      <ProductTemple productDetail={sortedProducts} />
    </>
  );
}

export async function getStaticProps() {
  await connectToDB();

  let products = [];
  try {
    products = await productsModel.find({});
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 10, // seconds
  };
}

export default Mobiles;
