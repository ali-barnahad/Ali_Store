import React, { useState } from "react";
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

function MyNavbar() {
  const router = useRouter();
  const { isLoggedIn, isAdmin, logout, cartCount } = useAuth();
  const { t, setLanguage, language } = useTranslation();
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownVisible(!languageDropdownVisible);
  };

  const handleNavLinkClick = (path) => {
    setShowOffcanvas(false);
    router.replace(path);
  };

  return (
    <div className={styles.navbarContainer}>
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
              <NavLink
                className={styles.OffcanvasNavText}
                onClick={() => handleNavLinkClick("/about")}
              >
                <FaInfoCircle className={styles.icon} />
                <span>{t("aboutUs")}</span>
              </NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
