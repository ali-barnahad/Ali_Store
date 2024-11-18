import { useState, useEffect } from "react";
import { FaHandPointUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Show the button when user scrolls down
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Added smooth behavior
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 p-5 rounded-full bg-blue-600 text-[#dbfcff] text-3xl shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 z-50 transition-opacity duration-300"
        >
          <FaHandPointUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
