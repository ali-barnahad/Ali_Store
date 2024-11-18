import React, { useState } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css"; // Keep this if you have custom styles
import axios from "axios";
import useTranslation from "@/hooks/useTranslation";
import Image from "next/image";
import { SearchIcon } from "./SearchIcon";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { t } = useTranslation("common");

  const fetchResults = async (searchQuery) => {
    try {
      const response = await axios.get(`/api/search?query=${searchQuery}`);
      setResults(response.data);
    } catch (error) {
      console.error(t("errorFetchingResults"), error.message);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      fetchResults(value);
    } else {
      setResults([]);
    }
  };

  const handleSelectProduct = (id, type) => {
    setQuery("");
    setResults([]);
    router.push(`/${type}/${id}`);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        clearable
        bordered
        fullWidth
        color="primary"
        placeholder={t("searchPlaceholder")}
        contentRight={<SearchIcon />}
        value={query}
        onChange={handleInputChange}
        aria-label="Search"
      />
      {results.length > 0 && (
        <Dropdown>
          <DropdownTrigger>
            <div className="hidden" /> {/* Invisible trigger */}
          </DropdownTrigger>
          <DropdownMenu aria-label="Search results">
            {Object.keys(results).map((type) =>
              results[type].map((product) => (
                <DropdownItem
                  key={product._id}
                  onClick={() => handleSelectProduct(product._id, type)}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{product.title}</span>
                  </div>
                </DropdownItem>
              ))
            )}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default Search;
