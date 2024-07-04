// components/modules/buttonLoadHome/ButtonLoadHome.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import styles from "@/styles/CardHome.module.css";

function useLoading() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return [isLoading, setLoading];
}

export function handleClick(router, isLoading, setLoading, data) {
  return () => {
    if (!isLoading) {
      setLoading(true);
      router.push(`/${data.categoryName}`);
    }
  };
}

function ButtonLoadHome({ myload, nload, data }) {
  const router = useRouter();
  const [isLoading, setLoading] = useLoading();

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={handleClick(router, isLoading, setLoading, data)}
      className={styles.buttonLoad}
    >
      {isLoading ? myload : nload}
    </Button>
  );
}

export default ButtonLoadHome;
