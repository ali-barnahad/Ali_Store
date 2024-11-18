import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import useTranslation from "@/hooks/useTranslation";

export default function App() {
  const [selected, setSelected] = React.useState("gray");
  const { t } = useTranslation("common");

  return (
    <div className=" block mt-0 mb-16 ">
      <RadioGroup
        label={t("SelectColor")}
        value={selected}
        orientation="horizontal"
        onValueChange={setSelected}
        size="sm"
        className=" w-max text-xl gap-0 "
      >
        <div className=" mt-5">
          <Radio value="blue" color="primary">
            <span className="bg-blue-500 px-3 py-1 mr-1 rounded-tl-2xl	rounded-br-2xl	 	"></span>
          </Radio>
          <Radio className="mx-5 " color="danger" value="red">
            <span className="bg-red-500 px-3  py-1 mr-1 rounded-tl-2xl	rounded-br-2xl	 "></span>
          </Radio>
          <Radio value="green" color="success">
            <span className="bg-green-500 px-3 py-1 mr-1 rounded-tl-2xl	rounded-br-2xl	 	"></span>
          </Radio>
          <Radio className=" mx-5" color="warning" value="yellow">
            <span className="bg-yellow-500 px-3 py-1 mr-1 rounded-tl-2xl	rounded-br-2xl	 	"></span>
          </Radio>
          <Radio value="gray" color="default">
            <span className="bg-gray-500 px-3 py-1 mr-1 rounded-tl-2xl	rounded-br-2xl	 	"></span>
          </Radio>
        </div>
      </RadioGroup>
    </div>
  );
}
