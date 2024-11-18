import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Listbox,
  ListboxItem,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { SearchIcon } from "./SearchIcon.js";
import useTranslation from "@/hooks/useTranslation.js";
import { AliLogo } from "./AliLogo.js";
import axios from "axios";
import Category from "./Category.js";
import { useAuth } from "@/context/AuthContext.js";
import UserLinks from "./UserLinks.js";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
export default function App() {
  const router = useRouter();
  const [results, setResults] = React.useState([]);
  const [value, setValue] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoggedIn, isAdmin, cartCount } = useAuth();
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const { t, setLanguage, language } = useTranslation();
  // Function to determine if the current route matches the link
  const isActive = (pathname) => router.pathname === pathname;

  // Function to fetch search results
  const fetchResults = async (searchQuery) => {
    try {
      const response = await axios.get(`/api/search?query=${searchQuery}`);
      setResults(response.data);
    } catch (error) {
      console.error(t("errorFetchingResults"), error.message);
    }
  };
  const toggleLanguageDropdown = () => {
    setLanguageDropdownVisible(!languageDropdownVisible);
  };
  // Function to handle input change and trigger search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length > 1) {
      fetchResults(value);
    } else {
      setResults([]);
    }
  };

  // Function to handle selection of a search result
  const handleSelectProduct = (id, type) => {
    setValue("");
    setResults([]);
    router.replace(`/${type}/${id}`);
  };
  const ClearValue = () => {
    setValue("");
    setResults([]);
  };

  return (
    <Navbar
      className="bg-[#e0f2fe] w-screen fixed"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "px-2",
          "text-8xl",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],

        wrapper: "max-w-screen-2xl mt-2 mb-2 w-auto ",
      }}
    >
      <NavbarContent className=" gap-0 w-screen h-auto">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <AliLogo />
          </Link>
        </NavbarBrand>
        {/* Button to toggle dropdown in mobile and tablet */}
        <Dropdown placement="bottom-end" className="lg:hidden">
          <DropdownTrigger>
            <Button color="white" size="lg" className="flex lg:hidden">
              <Category />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* <DropdownItem isActive={isActive("/")}>
              <Link
                className="text-2xl font-sans  font-semibold tracking-wide  text-[#075985]"
                href="/"
              >
                {t("home")}
              </Link>
            </DropdownItem> */}
            <DropdownItem
              isActive={isActive("/stickers")}
              className="font-bold"
            >
              <Link
                className="text-2xl font-sans font-semibold text-[#075985] tracking-wide"
                href="/stickers"
                aria-current="page"
              >
                {t("stickers")}
                <FaCaretRight />
              </Link>
            </DropdownItem>
            <DropdownItem isActive={isActive("/floorings")}>
              <Link
                className="text-2xl font-sans font-semibold text-[#075985] tracking-wide"
                href="/floorings"
              >
                {t("floorings")}
                <FaCaretRight />
              </Link>
            </DropdownItem>
            <DropdownItem isActive={isActive("/mobiles")}>
              <Link
                className="text-2xl font-sans font-semibold text-[#075985] tracking-wide"
                href="/mobiles"
              >
                {t("mobiles")}
                <FaCaretRight />
              </Link>
            </DropdownItem>
            <DropdownItem isActive={isActive("/watches")}>
              <Link
                className="text-2xl font-sans font-semibold text-[#075985] tracking-wide"
                href="/watches"
              >
                {t("watches")}
                <FaCaretRight />
              </Link>
            </DropdownItem>
            <DropdownItem isActive={isActive("/personalItems")}>
              <Link
                className="text-2xl font-sans font-semibold text-[#075985] tracking-wide"
                href="/personalItems"
              >
                {t("personalItems")}
                <FaCaretRight />
              </Link>
            </DropdownItem>
            <DropdownItem isActive={isActive("/kitchenwares")}>
              <Link
                className="text-2xl font-sans font-semibold text-[#075985] tracking-wide"
                href="/kitchenwares"
              >
                {t("kitchenwares")}
                <FaCaretRight />
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Regular navbar content for large screens */}
        <NavbarContent className="hidden lg:flex gap-3 ">
          {/* <NavbarItem isActive={isActive("/")}>
            <Link
              className="text-2xl font-sans font-semibold text-[#075985] tracking-wide "
              href="/"
            >
              {t("home")}
            </Link>
          </NavbarItem> */}
          <NavbarItem isActive={isActive("/stickers")}>
            <Link
              className="text-2xl font-sans mb-[2px] font-semibold text-[#075985] tracking-wide"
              href="/stickers"
              aria-current="page"
            >
              {t("stickers")}
              <FaCaretDown className="mt-1" />
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/floorings")}>
            <Link
              className="text-2xl font-sans mb-[2px] align-baseline font-semibold text-[#075985] tracking-wide"
              href="/floorings"
            >
              {t("floorings")}
              <FaCaretDown className="mt-1" />
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/mobiles")}>
            <Link
              className="text-2xl font-sans mb-[2px] font-semibold text-[#075985] tracking-wide"
              href="/mobiles"
            >
              {t("mobiles")} <FaCaretDown className="mt-1" />
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/watches")}>
            <Link
              className="text-2xl font-sans mb-[2px] font-semibold text-[#075985] tracking-wide"
              href="/watches"
            >
              {t("watches")} <FaCaretDown className="mt-1" />
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/personalItems")}>
            <Link
              className="text-2xl font-sans mb-[2px] font-semibold text-[#075985] tracking-wide"
              href="/personalItems"
            >
              {t("personalItems")} <FaCaretDown className="mt-1" />
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/kitchenwares")}>
            <Link
              className="text-2xl font-sans mb-[2px] font-semibold text-[#075985] tracking-wide"
              href="/kitchenwares"
            >
              {t("kitchenwares")} <FaCaretDown className="mt-1" />
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          <Button
            onClick={onOpen}
            className=" w-auto bg-[#083344] sm:w-30 md:w-40 lg:w-50 text-[#dbfcff] rounded-xl py-3 ml-2"
            bordered
          >
            <SearchIcon className="text-2xl text-default-400 pointer-events-none "></SearchIcon>
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="opaque"
            size="3xl"
            hideCloseButton="true"
            placement="top-center"
            classNames={{
              backdrop: [
                "bg-gradient-to-t",
                "from-zinc-900",
                "to-zinc-900/10",
                "backdrop-opacity-20",
                "cursor-pointer",
              ],
              base: ["w-10/12", " h-[500px]", "relative"],
              wrapper: ["items-center", "m-auto"],
            }}
          >
            <ModalContent onOpenChange>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col text-left	 gap-1">
                    {t("search")}
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      endContent={
                        <SearchIcon className="text-2xl  text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      variant="bordered"
                      value={value}
                      radius="sm"
                      type="search"
                      key="outside"
                      labelPlacement="outside"
                      onChange={handleInputChange}
                      classNames={{
                        inputWrapper: [
                          "shadow-xl",
                          "bg-default-200/50",
                          "dark:bg-default/60",
                          "backdrop-blur-xl",
                          "backdrop-saturate-200",
                          "hover:bg-default-200/70",
                          "dark:hover:bg-default/70",
                          "group-data-[focus=true]:bg-default-200/50",
                          "dark:group-data-[focus=true]:bg-default/60",
                          "!cursor-text",
                          "py-7",
                        ],
                        input: [
                          "w-full",
                          "text-3xl",
                          "text-default-700",
                          "dark:text-default-300",
                          "pl-3",
                        ],
                      }}
                    />
                    {results && Object.keys(results).length > 0 && (
                      <Listbox
                        className="absolute z-40  mt-16 bg-white border border-gray-300 rounded shadow-lg "
                        classNames={{
                          base: ["w-4/5", "m-auto"],
                          list: ["max-h-[300px]", "overflow-scroll"],
                        }}
                        style={{ direction: "ltr" }}
                      >
                        {Object.keys(results).map((type) =>
                          results[type].map((product) => (
                            <ListboxItem
                              onClick={() =>
                                handleSelectProduct(product._id, type)
                              }
                              key={product._id}
                              id={product._id}
                              type={type}
                              textValue={product.title}
                              onPress={onClose}
                            >
                              <div className="flex flex-row-reverse items-center justify-between mt-2">
                                <img
                                  src={product.img}
                                  alt={product.title}
                                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-md	 ml-2"
                                />
                                <span className="text-xl font-medium text-blue-950">
                                  {product.title}
                                </span>
                              </div>
                            </ListboxItem>
                          ))
                        )}
                      </Listbox>
                    )}
                  </ModalBody>
                  <ModalFooter className="absolute  top-0 right-10 mb-10  text-center">
                    <Button
                      color="danger"
                      onPress={onClose}
                      onClick={ClearValue}
                      className="ml-10"
                    >
                      Close
                    </Button>
                    <Button color="primary" onClick={ClearValue}>
                      Clear
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarContent>
        <NavbarContent className="mr-0" style={{ justifyContent: "left" }}>
          <UserLinks
            IsAdmin={isAdmin}
            IsLoggedIn={isLoggedIn}
            t={t}
            cartCount={cartCount}
            toggleLanguageDropdown={toggleLanguageDropdown}
            languageDropdownVisible={languageDropdownVisible}
            setLanguage={setLanguage}
            language={language}
          />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
