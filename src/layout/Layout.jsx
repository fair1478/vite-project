import React, { useState, useEffect } from "react";
import { Navbar, Input, Typography, Button } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";

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
    <>
      <div className="relative">
        {/* Navbar */}
        <Navbar
          shadow={false}
          className={`fixed top-0 z-10 max-w-full bg-white transition-all duration-300 ${
            isScrolled ? "shadow-md" : "shadow-none"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between px-24">
            {" "}
            {/* Adjusted for 120px margin */}
            <Typography
              as="a"
              href="/"
              className="text-lg font-medium text-blue-gray-900 lg:text-xl"
            >
              Pinyaphat
            </Typography>
            {/* Sticky Search Bar */}
            <div
              className={`${
                isScrolled ? "block" : "hidden"
              } absolute left-1/2 transform -translate-x-1/2`}
            >
              <Input
                type="text"
                placeholder="Find your right property"
                className="w-96 border border-gray-200 rounded-lg"
              />
            </div>
            <Button
              as="a"
              href="/contact"
              className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              ติดต่อเรา
            </Button>
          </div>
        </Navbar>

        {/* Hero Section */}
        <div
          id="hero-section"
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://scontent.fbkk24-1.fna.fbcdn.net/v/t39.30808-6/405509362_733069441998749_3670469587255339786_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=HK_N_Q7EtnoQ7kNvgGjehmf&_nc_zt=23&_nc_ht=scontent.fbkk24-1.fna&_nc_gid=AbtFzR_7QzdPu6zz_DGti6h&oh=00_AYCpGpCdTQsezWDCNrKIIluLC-DBtc6YW1aI5pxFtudZHQ&oe=675F8B52')", // Replace with your image URL
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="container relative z-10 mx-auto flex flex-col items-center justify-center h-full">
            <Typography className="text-white text-2xl lg:text-title">
              มองหาที่ดินนครนายก มองหาแม่ไก่
            </Typography>
            {/* Search Bar (shared with navbar) */}
            <div
              className={`mt-4 w-full max-w-xl px-4 lg:px-0 ${
                isScrolled ? "hidden" : "block"
              }`}
            >
              <Input
                type="text"
                placeholder="Find your right property"
                className="w-full border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SearchBarWithSticky;
