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
      <div className="sticky z-[999] mx-[120px]">
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
            <Button className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
              ติดต่อเรา
            </Button>
          </a>
        </nav>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default SearchBarWithSticky;
