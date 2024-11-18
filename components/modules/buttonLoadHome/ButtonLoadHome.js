import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

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
      auto
      disabled={isLoading}
      onClick={handleClick(router, isLoading, setLoading, data)}
      radius="full"
      variant="ghost"
      className="mt-4 text-lg	px-4 py-2   font-bold border-2 text-[#082f49] rounded-full  transition-transform duration-300 ease-in-out hover:bg-[#ffe0ae] hover:text-[#0c2549] hover:scale-110 animate-bounce"
    >
      {isLoading ? myload : nload}
    </Button>
  );
}

export default ButtonLoadHome;
