import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { BsBriefcaseFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <div>
        <>
          <div id="contact" className="w-full min-h-1/2 pb-20 bg-amber-600">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 justify-center items-center md:gap-6 pt-20 md:pt-16">
              {/* left-side */}
              <div>
                <div className="flex flex-col justify-center items-center gap-2 md:mb-12 md:border-r-2 pr-0 sm:pr-10 md:pr-10 h-40 sm:border-white md:border-white">
                  <p className="text-white font-bold text-xl md:text-2xl tracking-widest text-center">
                    Customer Support
                  </p>
                  <p className="text-white text-sm md:text-md tracking-wide">
                    ☏ +1800-000-000-111
                  </p>
                  <p className="text-white text-sm md:text-md tracking-wide">
                    Terms & Conditions
                  </p>
                  <p className="text-white text-sm md:text-md tracking-wide">
                    FAQs
                  </p>
                </div>
              </div>
              {/* middle-side */}
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-white font-bold text-xl md:text-2xl tracking-wider">
                  Quick Links
                </p>
                <ul className="pt-4 flex flex-col justify-items-center gap-2">
                  <li>
                    <Link
                      to={"/"}
                      className="text-sm md:text-md font-semilight text-white hover:cursor-pointer hover:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/add"}
                      className="text-sm md:text-md font-semilight text-white hover:cursor-pointer hover:underline"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/cart"}
                      className="text-sm md:text-md font-semilight text-white hover:cursor-pointer hover:underline"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link className="text-sm md:text-mdfont-semilight text-white hover:cursor-pointer hover:underline">
                      Help
                    </Link>
                  </li>
                </ul>
              </div>
              {/* right side */}
              <div className="h-40 md:mb-14 flex flex-col justify-center items-center md:items-start gap-4 md:border-l-2 pl-0 sm:pl-30 md:pl-30  sm:border-white md:border-white">
                <div>
                  <p className="text-white font-bold pr-0 sm:pr-50 text-xl md:text-2xl text-center tracking-wider">
                    Contact
                  </p>
                  <p className="text-sm md:text-md font-semilight text-white">
                    lavanimujaheedalikhan@gmail.com
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/mujaheedalikhan/"
                    target="_blank"
                    rel="noopener noreferer"
                    className="text-2xl p-2 bg-white rounded-full transition duration-200 text-amber-600 hover:bg-amber-500 border hover:border-white hover:text-white"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/MujaheedAliKhan"
                    target="_blank"
                    className="text-2xl p-2 bg-white rounded-full transition duration-200 text-amber-600 hover:bg-amber-500 border hover:border-white hover:text-white"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="mailto:lavanimujaheedalikhan@gmail.com"
                    target="_blank"
                    className="text-2xl p-2 bg-white rounded-full transition duration-200 text-amber-600 hover:bg-amber-500 border hover:border-white hover:text-white"
                  >
                    <SiGmail />
                  </a>
                  <a
                    href="http://naukri.com/mnjuser/profile"
                    target="_blank"
                    className="text-2xl p-2 bg-white rounded-full transition duration-200 text-amber-600 hover:bg-amber-500 border hover:border-white hover:text-white"
                  >
                    <BsBriefcaseFill />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-16 flex flex-col justify-center items-center">
            <h1 className="text-center text-gray-400 tracking-widest">
              © 2026 Mujaheed Ali Khan. All rights reserved
            </h1>
          </div>
        </>
      </div>
    </div>
  );
};

export default Footer;
