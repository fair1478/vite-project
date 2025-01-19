import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Footer from "../components/Footer";

export function SearchBarWithSticky() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero-section").offsetHeight;
      setIsScrolled(window.scrollY > heroHeight / 1.5); // Check if scroll position exceeds hero section
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-bg">
      <div className="sticky z-[999] mx-[120px] mb-24">
        <nav
          className={`flex justify-between items-center top-5 w-full transition-all duration-300 rounded-xl py-4 bg-bg ${
            isScrolled ? "shadow-md" : "shadow-none"
          }`}
        >
          <div>
            <a as="a" href="/">
              <img src={logo} alt="logo" className="h-12" />
            </a>
          </div>
          <a as="a" href="/contract">
            <Button
              variant="filled"
              color="orange"
              className="rounded-2xl px-6 py-3 text-bg !text-button1"
            >
              ติดต่อเรา
            </Button>
          </a>
        </nav>
        <div
          id="hero-section"
          className="flex flex-col space-y-16 items-center justify-end h-[600px] py-[110px] bg-[#FFA500] rounded-[32px]"
        >
          <h1 className="!text-title mb-4">
            มองหาที่ดินนครนายก มองหา<span className="text-primary">แม่ไก่</span>
          </h1>
          <div className="relative w-7/12">
            <input
              type="text"
              placeholder="Find your right property..."
              className="pl-6 pr-2 py-2 w-full text-paragraph rounded-[100px]"
            />
            <div className="absolute inset-y-0 right-4 flex items-center rounded-full bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default SearchBarWithSticky;
