import React, { useState } from "react";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";
import axios from "axios";
import useTranslation from "@/hooks/useTranslation";
import Image from "next/image";
import { MdSearch } from "react-icons/md";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();

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
    if (value.length > 2) {
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
      <InputGroup className={styles.searchInput}>
        <FormControl
          placeholder={`${t("searchPlaceholder")} `}
          value={query}
          onChange={handleInputChange}
          aria-label="Search"
        />
        <InputGroup.Text>
          <MdSearch className={styles.searchIcon} />
        </InputGroup.Text>
      </InputGroup>
      {results.length > 0 && (
        <ListGroup className={styles.suggestionsList}>
          {Object.keys(results).map((type) =>
            results[type].map((product) => (
              <ListGroup.Item
                key={product._id}
                onClick={() => handleSelectProduct(product._id, type)}
                className={styles.suggestionItem}
              >
                <div className={styles.productInfo}>
                  <Image
                    src={product.img}
                    className={styles.productImage}
                    alt={product.title}
                    width={50}
                    height={50}
                  />
                  <span className={styles.productTitle}>{product.title}</span>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default Search;
