// components/UserLinks.js
import React from "react";
import { NavLink } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogin } from "react-icons/tb";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";

const UserLinks = ({
  isAdmin,
  isLoggedIn,
  t,
  cartCount,
  toggleLanguageDropdown,
  languageDropdownVisible,
  setLanguage,
  language,
}) => {
  const router = useRouter();

  if (isAdmin) {
    return (
      <>
        <NavLink
          className={styles.MyFontNav}
          onClick={() => router.replace("/panelAdmin")}
        >
          <span>{t("adminPanel")}</span>
        </NavLink>
        <LanguageSwitcher
          languageDropdownVisible={languageDropdownVisible}
          toggleLanguageDropdown={toggleLanguageDropdown}
          setLanguage={setLanguage}
          language={language}
          t={t}
        />
      </>
    );
  }

  if (isLoggedIn) {
    return (
      <div className={styles.MyFontNavContainer}>
        <NavLink
          className={styles.MyFontNav}
          onClick={() => router.replace("panelUser")}
        >
          <CgProfile />
        </NavLink>
        <NavLink
          className={styles.MyFontNav}
          onClick={() => router.replace("/panelUser/cart")}
          style={{ position: "relative" }}
        >
          <TiShoppingCart />
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </NavLink>
        <LanguageSwitcher
          languageDropdownVisible={languageDropdownVisible}
          toggleLanguageDropdown={toggleLanguageDropdown}
          setLanguage={setLanguage}
          language={language}
          t={t}
        />
      </div>
    );
  }

  return (
    <div className={styles.MyFontNavContainer}>
      <NavLink
        className={styles.MyFontNav}
        onClick={() => router.replace("/login-register")}
      >
        <TbLogin />
      </NavLink>
      <NavLink
        className={styles.MyFontNav}
        onClick={() => router.replace("/panelUser/cart")}
        style={{ position: "relative" }}
      >
        <TiShoppingCart />
        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
      </NavLink>
      <LanguageSwitcher
        languageDropdownVisible={languageDropdownVisible}
        toggleLanguageDropdown={toggleLanguageDropdown}
        setLanguage={setLanguage}
        language={language}
        t={t}
      />
    </div>
  );
};

export default UserLinks;
