import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-40 w-40 border-t-4 border-blue-500">
            <span className="text-5xl">Alistore</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Layout;
