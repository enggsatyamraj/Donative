"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

const navbarLinks = [
  { name: "Home", url: "/" },
  { name: "Add Fundraiser", url: "/addfundraiser" },
  { name: "My Fundraiser", url: "/myfundraiser" },
  { name: "Login", url: "/login" },
  { name: "Signup", url: "/signup" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!isOpen);
    console.log("isopen ", isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Prevent scrolling events
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("wheel", preventScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      // Remove the scroll prevention event listeners
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
    }

    // Cleanup the effect when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      // Remove the scroll prevention event listeners
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
    };
  }, [isOpen]);

  function preventScroll(e) {
    e.preventDefault();
  }

  return (
    <div className="overflow-x-hidden z-10 ">
      <div className="absolute left-0 right-0  z-10 text-black  backdrop-blur-lg">
        <div
          className={
            "max-w-[1280px] h-[90px] flex justify-between sm:px-12 px-7 items-center bg-transparent mx-auto"
          }
        >
          <div className="text-2xl font-semibold tracking-wider">Logo Here</div>
          <div className="md:flex hidden gap-10 ">
            {navbarLinks.map((item, index) => {
              return (
                <Link
                  className="hover:cursor-pointer "
                  key={index}
                  href={item.url}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="md:hidden flex items-center">
            <RxHamburgerMenu size={25} color="#000" onClick={handleOpen} />
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "translate-y-0" : "translate-y-[-100%]"
        } flex flex-col gap-4 text-xl items-center justify-center absolute z-[100]  text-black right-0 top-0 bottom-0 left-0 transition-all duration-500 backdrop-blur-lg`}
      >
        <div className="absolute right-6 top-8">
          <RxCross2 size={27} color="#000" onClick={handleOpen} />
        </div>
        {navbarLinks.map((item, index) => {
          return (
            <Link
              className={`hover:cursor-pointer ${
                isOpen ? "opacity-1" : "opacity-0"
              } transition-all delay-${index + 1}s duration-300`}
              key={index}
              href={item.url}
              onClick={handleOpen}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
