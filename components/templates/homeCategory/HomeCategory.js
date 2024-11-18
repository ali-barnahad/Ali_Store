import React, { useState } from "react";
import { Container } from "@nextui-org/react";
import styles from "@/styles/CardHome.module.css";
import ButtonLoadHome, {
  handleClick,
} from "@/components/modules/buttonLoadHome/ButtonLoadHome";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import Image from "next/image";

const HomeCategory = React.memo(({ items }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  if (!items || !items.length) {
    return (
      <Container className="flex justify-center mt-10">
        <p className="text-center">{t("noProductsAvailable")}</p>
      </Container>
    );
  }
  const defaultImage = "/uploads/default.jpg";
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{t("shopByCategory")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <Image
                src={`/uploads/${item.categoryName}.webp` || defaultImage}
                width={200}
                height={200}
                className={styles.image}
                loading="lazy"
                alt={item.title}
                onClick={handleClick(router, isLoading, setLoading, item)}
                style={{ cursor: "pointer" }}
              />
              <ButtonLoadHome
                myload={t("processing")}
                nload={t(`${item.title}`)}
                data={item}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
});

export default HomeCategory;
