// pages/index.js
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import connectToDB from "@/utils/db";
import HomeCategoryModel from "@/models/homeProductModel";
import StickersModel from "@/models/stickerModel";
import Flooring from "@/models/flooringModel";
import PersonalItem from "@/models/personalItemModel";
import Kitchenware from "@/models/kitchenwareModel";
import Mobile from "@/models/mobileModel";
import Watch from "@/models/watchModel";
import nextI18nextConfig from "../next-i18next.config";

const MainHomeTopSlider = dynamic(
  () => import("@/components/modules/mainHomeTopSlider/MainHomeTopSlider"),
  { ssr: false }
);
const Animation = dynamic(
  () => import("@/components/templates/animation/Animation"),
  { ssr: false }
);
const SampleMoreCard = dynamic(
  () => import("@/components/modules/sampleMoreCard/SampleMoreCard"),
  { ssr: false }
);
const HomeCategory = dynamic(
  () => import("@/components/templates/homeCategory/HomeCategory"),
  { ssr: false }
);
const HomePageCategoryTemple = dynamic(
  () =>
    import(
      "@/components/templates/homePageCategoryTemple/HomePageCategoryTemple"
    ),
  { ssr: false }
);
const Article = dynamic(() => import("./article"), { ssr: false });

function Home({
  products,
  stickers,
  floorings,
  personalItems,
  kitchenwares,
  mobiles,
  watches,
}) {
  return (
    <>
      <Head>
        <title>Home - Ali Store</title>
        <meta
          name="description"
          content="Welcome to Ali Store. Explore our wide range of products including mobiles, kitchenware, personal items, stickers, floorings, and more."
        />
        <meta
          name="keywords"
          content="mobiles, kitchenware, personal items, stickers, floorings, home products"
        />
        <meta property="og:title" content="Home - Ali Store" />
        <meta
          property="og:description"
          content="Explore our wide range of products including mobiles, kitchenware, personal items, stickers, floorings, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alistore.liara.run/" />
        <meta
          property="og:image"
          content="https://alistore.liara.run/images/homepage-banner.jpg"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Store",
            name: "Ali Store",
            url: "https://alistore.liara.run",
            sameAs: [
              "https://www.facebook.com/yourstore",
              "https://www.instagram.com/yourstore",
              "https://www.twitter.com/yourstore",
            ],
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://alistore.liara.run/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Head>
      <header>
        <Animation />
      </header>
      <main style={{ margin: "2rem auto" }}>
        <section>
          <HomeCategory items={products} />
        </section>
        <section>
          <HomePageCategoryTemple
            products={mobiles}
            view={1.5}
            viewXs={2.5}
            viewSm={2.8}
            viewLg={3.3}
            viewXl={4.3}
          />
        </section>
        <section>
          <Article />
        </section>
        <section>
          <HomePageCategoryTemple
            products={watches}
            view={1.5}
            viewXs={2.5}
            viewSm={2.8}
            viewLg={3.3}
            viewXl={4.3}
          />
        </section>
        <section>
          <SampleMoreCard
            kitchenwares={kitchenwares}
            mobiles={mobiles}
            watches={watches}
            personalItems={personalItems}
            floorings={floorings}
            stickers={stickers}
          />
        </section>
        <section>
          <HomePageCategoryTemple
            products={kitchenwares}
            view={1.5}
            viewXs={2.5}
            viewSm={2.8}
            viewLg={3.3}
            viewXl={4.3}
          />
        </section>
        <section>
          <HomePageCategoryTemple
            products={personalItems}
            view={1.5}
            viewXs={2.5}
            viewSm={2.8}
            viewLg={3.3}
            viewXl={4.3}
          />
        </section>
        <section>
          <MainHomeTopSlider />
        </section>
        <section>
          <HomePageCategoryTemple
            products={floorings}
            view={1.5}
            viewXs={2.5}
            viewSm={2.8}
            viewLg={3.3}
            viewXl={4.3}
          />
        </section>
        <section>
          <HomePageCategoryTemple
            products={stickers}
            view={1.5}
            viewXs={2.5}
            viewSm={2.8}
            viewLg={3.3}
            viewXl={4.3}
          />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  try {
    await connectToDB();

    const [
      products,
      stickers,
      floorings,
      personalItems,
      kitchenwares,
      mobiles,
      watches,
    ] = await Promise.all([
      HomeCategoryModel.find({}).limit(12),
      StickersModel.find({}).limit(12),
      Flooring.find({}).limit(12),
      PersonalItem.find({}).limit(12),
      Kitchenware.find({}).limit(12),
      Mobile.find({}).limit(12),
      Watch.find({}).limit(12),
    ]);

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        stickers: JSON.parse(JSON.stringify(stickers)),
        floorings: JSON.parse(JSON.stringify(floorings)),
        personalItems: JSON.parse(JSON.stringify(personalItems)),
        kitchenwares: JSON.parse(JSON.stringify(kitchenwares)),
        mobiles: JSON.parse(JSON.stringify(mobiles)),
        watches: JSON.parse(JSON.stringify(watches)),
        ...(await serverSideTranslations(
          locale,
          ["common"],
          nextI18nextConfig
        )),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return {
      props: {
        products: [],
        stickers: [],
        floorings: [],
        personalItems: [],
        kitchenwares: [],
        mobiles: [],
        watches: [],
        ...(await serverSideTranslations(
          locale,
          ["common"],
          nextI18nextConfig
        )),
      },
    };
  }
}

export default Home;
