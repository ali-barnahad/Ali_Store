import React, { useState } from "react";
import styles from "@/styles/tablePanelAdminProduct.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";

function AddProduct() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [offer, setOffer] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [tags, setTags] = useState("");
  const [score, setScore] = useState("");

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("price", price);
    formData.append("img", img); // Assuming image is uploaded as a file and stored as URL/path
    formData.append("nameCategory", nameCategory);
    formData.append("branch", branch);
    formData.append("offer", offer);
    formData.append("longDescription", longDescription);
    formData.append("tags", tags.split(","));
    formData.append("score", score);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      Swal.fire({
        title: t("productCreatedSuccessfully"),
        icon: "success",
        confirmButtonText: t("gotIt"),
      }).then(() => {
        router.refresh();
      });
    } else {
      Swal.fire({
        title: t("errorAddingProduct"),
        text: t("tryAgain"),
        icon: "error",
        confirmButtonText: t("ok"),
      });
    }
  };

  return (
    <section className={styles.discount}>
      <p>{t("addNewProduct")}</p>
      <div className={styles.discount_main}>
        <div>
          <label>{t("productName")}</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t("enterProductName")}
            type="text"
          />
        </div>
        <div>
          <label>{t("productPrice")}</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder={t("enterProductPrice")}
            type="text"
          />
        </div>
        <div>
          <label>{t("productLongDescription")}</label>
          <input
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
            placeholder={t("enterProductLongDescription")}
            type="text"
          />
        </div>
        <div>
          <label>{t("productShortDescription")}</label>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={t("enterProductShortDescription")}
            type="text"
          />
        </div>
        <div>
          <label>{t("productImage")}</label>
          <input
            value={img}
            onChange={(event) => setImg(event.target.value)}
            placeholder={t("enterProductImage")}
            type="text"
          />
        </div>
        <div>
          <label>{t("categoryName")}</label>
          <input
            value={nameCategory}
            onChange={(event) => setNameCategory(event.target.value)}
            placeholder={t("enterCategoryName")}
            type="text"
          />
        </div>
        <div>
          <label>{t("branch")}</label>
          <input
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
            placeholder={t("enterBranchName")}
            type="text"
          />
        </div>
        <div>
          <label>{t("discountPercent")}</label>
          <input
            value={offer}
            onChange={(event) => setOffer(event.target.value)}
            placeholder={t("enterDiscountPercent")}
            type="text"
          />
        </div>
        <div>
          <label>{t("tags")}</label>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder={t("enterTags")}
            type="text"
          />
        </div>
        <div>
          <label>{t("productScore")}</label>
          <input
            value={score}
            onChange={(event) => setScore(event.target.value)}
            placeholder={t("enterProductScore")}
            type="text"
          />
        </div>
      </div>
      <button onClick={addProduct}>{t("add")}</button>
    </section>
  );
}

export default AddProduct;
