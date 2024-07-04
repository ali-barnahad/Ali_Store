import React from "react";
import styles from "@/styles/footer.module.css"; // Import CSS module
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BsArrowUp } from "react-icons/bs";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div className="page-container">
      <main className="content-wrap"></main>
      <Card className={`text-center align-items-center ${styles.footer}`}>
        <Button
          type="button"
          onClick={scrollToTop}
          className={`mySubTop ${styles.button}`}
        >
          <BsArrowUp />
          {t("goToTop")}
          <BsArrowUp />
        </Button>
        <Card.Body className={styles.cardBody}>
          <Card.Text className={styles.cardText}>
            {t("sellingProductsGlobally")}
          </Card.Text>
          <nav className={styles.nav}>
            <span
              className={styles.navLink}
              onClick={() => router.push("/terms")}
            >
              {t("termsOfService")}
            </span>
            <span
              className={styles.navLink}
              onClick={() => router.push("/privacy")}
            >
              {t("privacyPolicy")}
            </span>
            <span
              className={styles.navLink}
              onClick={() => router.push("/contact")}
            >
              {t("contactUs")}
            </span>
            <span
              className={styles.navLink}
              onClick={() => router.push("/about")}
            >
              {t("aboutUs")}
            </span>
          </nav>
        </Card.Body>
        <Card.Footer className={`text-muted ${styles.cardFooter}`}>
          2021-2024 @ Plasco Mahdi
          <br /> {t("allRightsReserved")}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Footer;
