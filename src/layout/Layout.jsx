import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Footer from "../components/Footer";
import hero from "../assets/hero-image.jpg";

export function Layout() {
  const [isSticky, setIsSticky] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleTop = () => {
      const scrollTop = window.scrollY;
      setIsTop(scrollTop <= 0);
    };

    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, []);
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroSearchBar = document.getElementById("hero-section");
      if (heroSearchBar) {
        const heroSearchBarBottom =
          heroSearchBar.getBoundingClientRect().bottom;
        setIsSticky(heroSearchBarBottom <= 192);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="bg-bg">
      <div
        className={`sticky top-0 w-full z-[999] px-[120px] mb-4 bg-bg ${
          isTop ? "shadow-none" : "shadow-0"
        }`}
      >
        <nav className={`flex justify-between items-center w-full py-4`}>
          <div>
            <a as="a" href="/">
              <img src={logo} alt="logo" className="h-12" />
            </a>
          </div>
          {isSticky && (
            <div className="relative w-7/12">
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Find your right property..."
                className={`pl-6 pr-2 h-[48px] w-full text-paragraph justify-center rounded-[100px] focus:outline-none shadow-search`}
              />
              <div className="absolute inset-y-0 right-2 mt-[8px] flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          )}
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
      </div>
      <div className="mx-[120px]">
        <div
          id="hero-section"
          className="relative flex flex-col space-y-16 items-center justify-end h-[600px] py-[110px] mb-24 bg-cover bg-center rounded-[32px]"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30 rounded-[32px]"></div>
          <h1 className="relative !text-title mb-4 text-bg z-10">
            มองหาที่ดินนครนายก มองหา<span className="text-primary">แม่ไก่</span>
          </h1>
          {!isSticky && (
            <div className="relative w-7/12 z-10">
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Find your right property..."
                className={`pl-6 pr-2 h-[48px] w-full text-paragraph justify-center rounded-[100px] focus:outline-none ${
                  isSticky ? "shadow-md" : "shadow-none"
                }`}
              />
              <div className="absolute inset-y-0 right-2 mt-[8px] flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
