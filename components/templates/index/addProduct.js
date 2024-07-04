import React, { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { uploadProduct } from "@/pages/api/productService/index";
import styles from "@/styles/Modal.module.css";
import useTranslation from "@/hooks/useTranslation";

const AddProduct = ({ hideAddProduct, onConfirm }) => {
  const { t } = useTranslation("common");
  const [productType, setProductType] = useState("");
  const [product, setProduct] = useState({
    title: "",
    nameCategory: "",
    text: "",
    price: "",
    img: null,
    branch: "",
    offer: "",
    adminId: "",
    dimensions: { height: "", width: "" },
    materials: "",
    sku: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("dimensions.")) {
      const dimName = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [dimName]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setProduct((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const isFormValid = () => {
    const { title, price, nameCategory, branch, img, text, adminId } = product;
    return title && price && nameCategory && branch && img && text && adminId;
  };

  const addNewProduct = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      Swal.fire(t("warning"), t("completeAllFields"), "warning");
      return;
    }

    const formData = new FormData();
    formData.append("productType", productType);
    Object.keys(product).forEach((key) => {
      if (key === "img" && product[key]) {
        formData.append(key, product[key], product[key].name); // Append file with name
      } else if (key === "dimensions") {
        formData.append("dimensionsHeight", product.dimensions.height);
        formData.append("dimensionsWidth", product.dimensions.width);
      } else {
        formData.append(key, product[key]);
      }
    });

    // Log FormData entries to debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const result = await uploadProduct(formData);
      if (result.success) {
        Swal.fire(t("success"), t("productCreatedSuccessfully"), "success");
        setProduct({
          title: "",
          text: "",
          price: "",
          nameCategory: "",
          branch: "",
          adminId: "",
          offer: "",
          img: null,
          dimensions: { height: "", width: "" },
          materials: "",
          sku: "",
          stockQuantity: "",
        });
        setProductType("");
        hideAddProduct();
        onConfirm();
      } else {
        Swal.fire(t("error"), t("issueCreatingProduct"), "error");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire(t("error"), t("tryAgain"), "error");
    }
  };

  return (
    <div className={styles.containerAddModal}>
      <div className={styles.modal_container} id="add-new-product-modal">
        <div className={styles.modal_content}>
          <h1 className={styles.modal_title}>{t("addProduct")}</h1>
          <form className={styles.edit_product_form} onSubmit={addNewProduct}>
            <div className={styles.input_field}>
              <span>
                <FontAwesomeIcon icon={faTag} />
              </span>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder={t("productTitle")}
              />
            </div>
            <div className={styles.input_field}>
              <span>
                <FontAwesomeIcon icon={faTag} />
              </span>
              <select
                name="nameCategory"
                value={product.nameCategory}
                onChange={(e) => {
                  handleChange(e);
                  setProductType(e.target.value);
                }}
              >
                <option value="">{t("selectCategory")}</option>
                <option value="stickers">{t("stickers")}</option>
                <option value="floorings">{t("floorings")}</option>
                <option value="personalItems">{t("personalItems")}</option>
                <option value="kitchenwares">{t("kitchenwares")}</option>
                <option value="mobiles">{t("mobiles")}</option>
              </select>
            </div>
            <div className={styles.input_field}>
              <input
                type="text"
                name="branch"
                value={product.branch}
                onChange={handleChange}
                placeholder={t("branch")}
              />
            </div>
            <div className={styles.input_field}>
              <textarea
                name="text"
                value={product.text}
                onChange={handleChange}
                placeholder={t("productDescription")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder={t("price")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="number"
                name="offer"
                value={product.offer}
                onChange={handleChange}
                placeholder={t("offer")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="text"
                name="adminId"
                value={product.adminId}
                onChange={handleChange}
                placeholder={t("adminId")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                placeholder={t("sku")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="text"
                name="materials"
                value={product.materials}
                onChange={handleChange}
                placeholder={t("materials")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                placeholder={t("stockQuantity")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="number"
                name="dimensions.height"
                value={product.dimensions.height}
                onChange={handleChange}
                placeholder={t("height")}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="number"
                name="dimensions.width"
                value={product.dimensions.width}
                onChange={handleChange}
                placeholder={t("width")}
              />
            </div>
            <div className={styles.action_buttons}>
              <button type="submit" className={styles.submit_btn}>
                {t("createProduct")}
              </button>
              <button
                type="button"
                onClick={hideAddProduct}
                className={styles.cancel_btn}
              >
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
