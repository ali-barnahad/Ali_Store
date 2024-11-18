import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import useTranslation from "@/hooks/useTranslation";

function BreadcrumbsComponent({ route }) {
  const { t } = useTranslation("common");

  // Split the route into parts to determine the path
  const routeParts = route.split("/").filter(Boolean); // Removes empty parts (from leading '/')
  const isProductPage = routeParts.length > 1; // Adjusted to better catch all product pages
  const category = routeParts[0]; // The category is always the first part

  return (
    <Breadcrumbs
      size="sm"
      className="w-11/12"
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        item: [
          "px-2 py-1 border-small  border-default-400 rounded-small font-semibold bg-blue-100 text-sky-950 text-xl my-2",
          "data-[current=true]:border-foreground data-[current=true]:font-semibold data-[current=true]:bg-sky-300 data-[current=true]:text-sky-950 transition-colors",
          "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
        ],
        base: "flex items-center mt-24 mb-4 ",
      }}
    >
      {/* Always show the home breadcrumb */}
      <BreadcrumbItem className="mr-3" key="home" href="/">
        {t("home")}
      </BreadcrumbItem>

      {/* Always show the category breadcrumb */}
      <BreadcrumbItem key="category" href={`/${category}`}>
        {t(category)}
      </BreadcrumbItem>

      {/* Conditionally show the product breadcrumb if it's a product page */}
      {isProductPage && (
        <BreadcrumbItem key="product">
          {t(routeParts[1]).length > 20
            ? ` . . . ${t(routeParts[1]).slice(0, 20)}`
            : t(routeParts[1])}
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}

export default BreadcrumbsComponent;
