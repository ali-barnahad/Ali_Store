import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (router.pathname !== "/") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [router.pathname]);

  const handleBack = () => {
    router.back();
  };

  return (
    showButton && (
      <button
        onClick={handleBack}
        className="fixed top-24 left-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 z-50 transition-all duration-300 ease-in-out"
      >
        <IoArrowBackCircleSharp />
      </button>
    )
  );
};

export default BackButton;
