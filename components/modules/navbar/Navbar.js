import React, { useState, useEffect } from "react";
import { Nav, NavLink, Navbar, Offcanvas } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaSignInAlt,
  FaInfoCircle,
} from "react-icons/fa";
import styles from "@/styles/Navbar.module.css";
import { useAuth } from "@/context/AuthContext";
import useTranslation from "@/hooks/useTranslation";
import UserLinks from "./UserLinks";
import { useRouter } from "next/router";
import Search from "./Search"; // Import the Search component
import { BiSolidCategoryAlt } from "react-icons/bi";

function MyNavbar() {
  const router = useRouter();
  const { isLoggedIn, isAdmin, logout, cartCount } = useAuth();
  const { t, setLanguage, language } = useTranslation();
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showProductCategories, setShowProductCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownVisible(!languageDropdownVisible);
  };

  const handleNavLinkClick = (path) => {
    setShowOffcanvas(false);
    setShowProductCategories(false);
    router.replace(path);
  };

  const toggleProductCategories = () => {
    setShowProductCategories(!showProductCategories);
  };

  const productCategories = [
    { name: t("Stickers"), path: "/stickers" },
    { name: t("Floorings"), path: "/floorings" },
    { name: t("PersonalItems"), path: "/personalItems" },
    { name: t("Mobiles"), path: "/mobiles" },
    { name: t("Watches"), path: "/watches" },
    { name: t("Kitchenwares"), path: "/kitchenwares" },
  ];

  return (
    <div className={styles.navbarContainer}>
      {isMobile ? (
        <div>
          <Navbar className={styles.navbar}>
            <Nav className={styles.MyFontNav}>
              <UserLinks
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
                t={t}
                cartCount={cartCount}
                toggleLanguageDropdown={toggleLanguageDropdown}
                languageDropdownVisible={languageDropdownVisible}
                setLanguage={setLanguage}
                language={language}
              />
            </Nav>
            <div className={styles.searchBoxMobile}>
              <Search />
            </div>
          </Navbar>

          <div className={styles.mobileNavbar}>
            <NavLink
              onClick={() => handleNavLinkClick("/")}
              className={styles.mobileNavLink}
            >
              <FaHome className={styles.iconMobile} />
              {t("home")}
            </NavLink>
            <NavLink
              onClick={toggleProductCategories}
              className={styles.mobileNavLink}
            >
              <BiSolidCategoryAlt className={styles.iconMobile} />
              {t("Categories")}
            </NavLink>
            <NavLink
              onClick={() => handleNavLinkClick("/panelUser/wishList")}
              className={styles.mobileNavLink}
            >
              <FaHeart className={styles.iconMobile} />
              {t("wishList")}
            </NavLink>
            <NavLink
              onClick={() => handleNavLinkClick("/panelUser")}
              className={styles.mobileNavLink}
            >
              <FaUser className={styles.iconMobile} />
              {t("userPanel")}
            </NavLink>
          </div>
          {showProductCategories && (
            <div className={styles.mobileCategories}>
              {productCategories.map((category) => (
                <NavLink
                  key={category.name}
                  onClick={() => handleNavLinkClick(category.path)}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Navbar expand="md" className={styles.navbar}>
          <Nav className={styles.MyFontNav}>
            <UserLinks
              isAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
              t={t}
              cartCount={cartCount}
              toggleLanguageDropdown={toggleLanguageDropdown}
              languageDropdownVisible={languageDropdownVisible}
              setLanguage={setLanguage}
              language={language}
            />
          </Nav>
          <Search />
          <div
            className={styles.productCategories}
            onMouseEnter={() => setShowProductCategories(true)}
            onMouseLeave={() => setShowProductCategories(false)}
          >
            <button
              onClick={toggleProductCategories}
              className={styles.OffcanvasNavText}
            >
              <BiSolidCategoryAlt className={styles.icon} />
              {t("Categories")}
            </button>
            <div
              className={`${styles.productCategoriesContent} ${
                showProductCategories ? styles.show : ""
              }`}
            >
              {productCategories.map((category) => (
                <NavLink
                  key={category.name}
                  className={styles.productCategoryLink}
                  onClick={() => handleNavLinkClick(category.path)}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            onClick={() => setShowOffcanvas(true)}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="end"
            className={styles.offcanvas}
          >
            <Offcanvas.Header closeButton className={styles.offcanvasHeader}>
              <Offcanvas.Title className="fs-1 fw-bold">
                {t("brandName")}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className={styles.OffcanvasNav}>
                <NavLink
                  className={styles.OffcanvasNavText}
                  onClick={() => handleNavLinkClick("/")}
                >
                  <FaHome className={styles.icon} />
                  <span>{t("home")}</span>
                </NavLink>

                {isLoggedIn ? (
                  <>
                    <NavLink
                      className={styles.OffcanvasNavText}
                      onClick={() => handleNavLinkClick("/panelUser")}
                    >
                      <FaUser className={styles.icon} />
                      <span>{t("userPanel")}</span>
                    </NavLink>
                    <NavLink
                      className={styles.OffcanvasNavText}
                      onClick={() => handleNavLinkClick("/panelUser/wishList")}
                    >
                      <FaHeart className={styles.icon} />
                      <span>{t("wishList")}</span>
                    </NavLink>
                    <NavLink
                      className={styles.OffcanvasNavText}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className={styles.icon} />
                      <span>{t("logout")}</span>
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    className={styles.OffcanvasNavText}
                    onClick={() => handleNavLinkClick("/login-register")}
                  >
                    <FaSignInAlt className={styles.icon} />
                    <span>{t("registerOrLogin")}</span>
                  </NavLink>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      )}
    </div>
  );
}

export default MyNavbar;
