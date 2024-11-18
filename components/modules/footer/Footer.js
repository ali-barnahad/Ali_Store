// components/Footer.js
import { Button, Link } from "@nextui-org/react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaMedium,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="space-y-16 bg-[#141d2a] text-[#dbfcff] pt-20 pb-5">
      <div className="flex  flex-row items-center justify-between bg-[#8186d5] py-8 px-10 shadow-xl -mt-20 relative">
        <div>
          <p className="mb-2 text-lg">Ready for a next project?</p>
          <p className="text-dark text-lg">Let's get started!</p>
        </div>
        <Button className="bg-[#141d2ab6] text-[#dbfcff] rounded-none py-3 px-5">
          Contact us
        </Button>
      </div>

      <div className="grid grid-cols-1 grid-flow-row-dense	 md:grid-cols-4 gap-10">
        <div className="ml-4">
          <p>Customers</p>
          <ul className="list-none space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] mt-5 ml-2"
              >
                Buyer
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] ml-2"
              >
                Supplier
              </Link>
            </li>
          </ul>
        </div>

        <div className="ml-4">
          <p>Company</p>
          <ul className="list-none space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] mt-5 ml-2"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] ml-2 "
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] ml-2"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div className="ml-4">
          <p>Further</p>
          <ul className="list-none space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] mt-5 ml-2"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#dbfcff] ml-2"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="ml-4">
          <p>Follow us</p>
          <ul className="flex flex-row-reverse space-x-4 mt-5 ml-2 ">
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-[#8186d5] text-[#dbfcff] rounded-full "
              >
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-[#8186d5] text-[#dbfcff] rounded-full"
              >
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-[#8186d5] text-[#dbfcff] rounded-full"
              >
                <FaLinkedinIn />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-[#8186d5] text-[#dbfcff] rounded-full"
              >
                <FaMedium />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-[#8186d5] text-[#dbfcff] rounded-full"
              >
                <FaPaperPlane />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col  justify-self-center	w-max m-auto">
        <Link
          href="#"
          className="text-[#dbfcff] uppercase self-center text-lg tracking-wide"
        >
          Ali Store
        </Link>
        <p className="text-gray-400 text-sm self-center mt-2 ml-2">
          © 2021 - 2024 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
