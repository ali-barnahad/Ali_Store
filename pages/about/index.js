import React from "react";
import styles from "@/styles/aboutUs.module.css";
import Breadcrumbs from "@/components/modules/breadcrumbs/Breadcrumbs";
import useTranslation from "@/hooks/useTranslation";

function About() {
  const { t } = useTranslation("common");

  return (
    <div>
      <Breadcrumbs route="aboutUs" />
      <div className={styles.container}>
        <section>
          <div>
            <span className={styles.title}>{t("aboutUs")}</span>
            <p className={styles.companyName}>{t("companyName")}</p>
          </div>
          <div>
            <p>{t("experienceGenerations")}</p>
          </div>
          <div>
            <p>{t("associationMembership")}</p>
          </div>
        </section>
        <hr />
        <main className={styles.main}>
          <div>
            <p>{t("foundersPath")}</p>
            <p>{t("futureGoals")}</p>
            <p>{t("owner")}</p>
          </div>
          <div>
            <span>{t("brandName")}</span>
            <p className={styles.title}>{t("storyTitle")}</p>
            <p>{t("storyParagraph1")}</p>
            <p>{t("storyParagraph2")}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default About;
