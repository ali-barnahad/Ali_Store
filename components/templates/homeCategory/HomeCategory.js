// components/templates/homeCategory/HomeCategory.js
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/CardHome.module.css";
import ButtonLoadHome, {
  handleClick,
} from "@/components/modules/buttonLoadHome/ButtonLoadHome";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";

const HomeCategory = React.memo(({ items }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  if (!items || !items.length) {
    return (
      <Container className="text-center mt-5">
        <p>{t("noProductsAvailable")}</p>
      </Container>
    );
  }

  return (
    <main className={styles.main}>
      <h2 className="text-center bold-text mb-4 ">{t("shopByCategory")}</h2>
      <div className={styles.gridContainer}>
        {items.map((item) => (
          <div key={item._id} className={styles.gridItem}>
            <div className="d-flex justify-content-around align-items-center flex-column">
              <Image
                src={item.img}
                width={200}
                height={200}
                className={styles.image}
                loading="lazy"
                alt={item.title}
                onClick={() => handleClick(router, isLoading, setLoading, item)}
                style={{ cursor: "pointer" }}
              />
              <ButtonLoadHome
                myload={t("processing")}
                nload={item.title}
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
