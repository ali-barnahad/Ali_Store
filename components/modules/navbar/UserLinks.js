import React from "react";
import {
  Link,
  Badge,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"; // NextUI components
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "next/router";
import { CartIcon } from "./CartIcon";
import { useAuth } from "@/context/AuthContext";

const UserLinks = ({
  IsAdmin,
  IsLoggedIn,
  t,
  cartCount,
  toggleLanguageDropdown,
  languageDropdownVisible,
  setLanguage,
  language,
}) => {
  const router = useRouter();
  const { logout, userName } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };
  if (IsAdmin) {
    return (
      <div className="flex items-center ml-3 space-x-4  sm:ml-10 ">
        <Link
          color="primary"
          className="text-lg font-medium cursor-pointer ml-4"
          onClick={() => router.replace("/panelAdmin")}
        >
          {t("adminPanel")}
        </Link>
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

  if (IsLoggedIn) {
    return (
      <div className="flex items-center ml-3 space-x-4  sm:ml-10 ">
        <Dropdown placement="bottom-end ">
          <DropdownTrigger className="cursor-pointer ml-6 mr-3 sm:mr-20">
            <Avatar
              showFallback
              as="button"
              className="transition-transform"
              classNames={{
                base: "bg-gradient-to-br from-[#4990e2] to-[#4990e2]",
                icon: "text-[#083344]",
              }}
            />
          </DropdownTrigger>
          {IsLoggedIn ? (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold tracking-wide text-left inline-block">
                  {t("hello")} {userName} {t("welcome")}
                </p>
              </DropdownItem>
              <DropdownItem key="settings" href="/panelUser/profile">
                {t("accountDetails")}
              </DropdownItem>
              <DropdownItem key="team_settings" href="/panelUser">
                {t("dashboard")}
              </DropdownItem>
              <DropdownItem key="analytics" href="/panelUser/wishList">
                {t("wishlist")}
              </DropdownItem>
              <DropdownItem key="tickets" href="/panelUser/tickets">
                {t("allTickets")}
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                {t("logout")}
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="logout" color="danger" href="/login-register">
                <p>{t("registerOrLogin")}</p>
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
        <Link
          color="primary"
          className="relative cursor-pointer ml-4"
          onClick={() => router.replace("/panelUser/cart")}
        >
          <Badge color="danger" content={cartCount} shape="circle">
            <CartIcon size={30} />
          </Badge>
        </Link>
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
    <div className="flex ml-3 items-center space-x-4 sm:ml-10 ">
      <Dropdown placement="bottom-end ">
        <DropdownTrigger className="cursor-pointer ml-6">
          <Avatar
            showFallback
            as="button"
            className="transition-transform"
            classNames={{
              base: "bg-gradient-to-br from-[#4990e2] to-[#4990e2]",
              icon: "text-[#083344]",
            }}
          />
        </DropdownTrigger>
        {IsLoggedIn ? (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold tracking-wide text-left inline-block">
                {t("hello")} {userName} {t("welcome")}
              </p>
              {/* <p
                    className="font-semibold tracking-wide text-left inline-block"
                   
                  >
                    {userEmail}
                  </p> */}
            </DropdownItem>
            <DropdownItem key="settings" href="/panelUser/profile">
              {t("accountDetails")}
            </DropdownItem>
            <DropdownItem key="team_settings" href="/panelUser">
              {t("dashboard")}
            </DropdownItem>
            <DropdownItem key="analytics" href="/panelUser/wishList">
              {t("wishlist")}
            </DropdownItem>
            <DropdownItem key="tickets" href="/panelUser/tickets">
              {t("allTickets")}
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              {t("logout")}
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger" href="/login-register">
              {t("registerOrLogin")}
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
      <Link
        color="primary"
        className="relative cursor-pointer text-4xl ml-4"
        onClick={() => router.replace("/panelUser/cart")}
      >
        <Badge color="danger" content={cartCount} shape="circle">
          <CartIcon size={30} />
        </Badge>
      </Link>
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
