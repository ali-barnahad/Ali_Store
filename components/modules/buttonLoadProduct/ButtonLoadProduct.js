import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import useTranslation from "@/hooks/useTranslation";

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

export function handleClick(router, isLoading, setLoading, t, data) {
  return async () => {
    if (isLoading) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${data._id}/increment-view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameCategory: data.nameCategory }),
      });
      if (!response.ok) throw new Error(t("failedToIncrementViewCount"));
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
    router.push(`/${data.nameCategory}/${data._id}`);
  };
}

function ButtonLoadProduct({ myload, nload, data }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isLoading, setLoading] = useLoading();

  return (
    <Button
      color="primary"
      auto
      disabled={isLoading}
      onClick={handleClick(router, isLoading, setLoading, t, data)}
      className="mb-4" // Example Tailwind CSS class, you can adjust based on your needs
    >
      {isLoading ? myload : nload}
    </Button>
  );
}

export default ButtonLoadProduct;
