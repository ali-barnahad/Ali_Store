import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import useTranslation from "@/hooks/useTranslation";

export default function App() {
  const { t } = useTranslation("common");
  return (
    <Table
      hideHeader
      aria-label="Example static collection table"
      classNames={{
        td: ["w-max", "text-2xl"],
      }}
      style={{ direction: "ltr" }}
    >
      <TableHeader>
        <TableColumn>{t("specifications")}</TableColumn>
        <TableColumn>{t("value")}</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Country of manufacture")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            Sample country
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Year of construction")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            2024
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Sex")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            Unisex
          </TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Available colors")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            Red, Blue, Green
          </TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Size")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            Medium
          </TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Weight")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            1.2 kg
          </TableCell>
        </TableRow>
        <TableRow key="7">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Material")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            Aluminum
          </TableCell>
        </TableRow>
        <TableRow key="8">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Battery life")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            10 hours
          </TableCell>
        </TableRow>
        <TableRow key="9">
          <TableCell className="text-lg font-semibold text-gray-700">
            {t("Warranty")}
          </TableCell>
          <TableCell className="text-xl font-bold text-blue-600">
            2 years
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
