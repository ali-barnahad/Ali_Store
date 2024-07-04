import React, { useEffect, useState } from "react";
import styles from "@/styles/tablePanelAdminDiscount.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";

function AddDiscount() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      // Fetch to get products data
    };

    getProducts();
  }, []);

  const addDiscount = async () => {
    // Validation (You) ✅

    const discount = {
      code,
      percent,
      maxUse,
    };

    const res = await fetch("/api/discounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discount),
    });

    if (res.status === 201) {
      Swal.fire({
        title: t("discountCodeCreated"),
        icon: "success",
        buttons: t("gotIt"),
      }).then(() => {
        setCode("");
        setPercent("");
        setMaxUse("");
        router.refresh();
      });
    }
  };

  return (
    <section className={styles.discount}>
      <p>{t("addNewDiscountCode")}</p>
      <div className={styles.discount_main}>
        <div>
          <label>{t("discountId")}</label>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={t("enterDiscountId")}
            type="text"
          />
        </div>
        <div>
          <label>{t("discountPercent")}</label>
          <input
            value={percent}
            onChange={(event) => setPercent(event.target.value)}
            placeholder={t("enterDiscountPercent")}
            type="text"
          />
        </div>
        <div>
          <label>{t("maxUse")}</label>
          <input
            value={maxUse}
            onChange={(event) => setMaxUse(event.target.value)}
            placeholder={t("enterMaxUse")}
            type="text"
          />
        </div>
        <div>
          <label>{t("product")}</label>
          <select name="" id="">
            <option value="">{t("turkishCoffee")}</option>
            <option value="">{t("arabicaCoffee")}</option>
            <option value="">{t("espressoCoffee")}</option>
          </select>
        </div>
      </div>
      <button onClick={addDiscount}>{t("add")}</button>
    </section>
  );
}

export default AddDiscount;
