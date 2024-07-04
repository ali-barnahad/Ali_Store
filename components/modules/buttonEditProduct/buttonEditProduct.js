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

function ButtonLoadHome({ myload, nload, data }) {
  const router = useRouter();
  const [isLoading, setLoading] = useLoading();

  const handleClick = () => {
    if (!isLoading) {
      setLoading(true);
      router.push(`/${data.categoryName}`);
    }
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      className={styles.buttonLoad}
    >
      {isLoading ? myload : nload}
    </Button>
  );
}

export default ButtonLoadHome;
