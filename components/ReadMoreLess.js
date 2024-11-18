import useTranslation from "@/hooks/useTranslation";
import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";

export default function ReadMoreLess({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation("common");

  // Function to toggle between expanded and collapsed states
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the text to display based on the current state
  const displayedText = isExpanded ? text : text.substring(0, 250) + "...";

  return (
    <div className="flex flex-col align-baseline	 justify-end">
      <h3 className="my-5 self-end underline underline-offset-4 decoration-rose-600">
        {t("introduction")}
      </h3>
      <p className="inline text-xl leading-8	antialiased ">{displayedText}</p>
      <button
        onClick={toggleReadMore}
        className="flex justify-end align-baseline	mt-4 items-center"
      >
        <SlArrowRight className="inline text-xs	font-bold	 text-blue-600 ml-2 " />
        {isExpanded ? (
          <p className="inline text-blue-500 text-xl">{t("readLess")}</p>
        ) : (
          <p className="inline text-blue-500 text-xl">{t("readMore")}</p>
        )}
      </button>
    </div>
  );
}
